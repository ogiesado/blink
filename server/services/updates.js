import moment from 'moment';
import request from 'request';
import contentDisposition from 'content-disposition';
import unzipper from 'unzipper';
import XmlStream from 'xml-stream';
import { Transform } from 'stream';
import {
  getRedisClient,
  REDIS_UPDATE_DETAILS_KEY,
  REDIS_UPDATE_STATUS_KEY,
} from '../utils/redis';
import env from '../utils/env';
import { upsertEntity, transformEntityFromGleifFormat } from './entities';

export function getUpdateDetails() {
  return getRedisClient()
    .get(REDIS_UPDATE_DETAILS_KEY)
    .then(JSON.parse);
}

export function setUpdateDetails({
  lastUpdate = '-',
  totalRecords = 0,
  lastUpdateBy = '-',
  gleifFilename = '',
} = {}) {
  return getRedisClient().set(
    REDIS_UPDATE_DETAILS_KEY,
    JSON.stringify({ lastUpdate, totalRecords, lastUpdateBy, gleifFilename })
  );
}

export function getUpdateStatus() {
  return getRedisClient()
    .get(REDIS_UPDATE_STATUS_KEY)
    .then(JSON.parse);
}

export function setUpdateStatus({
  isUpdating = false,
  hasError = false,
  message = '',
  startedBy = '',
  meta = {
    xml: '',
    zip: '',
    date: '',
    description: '',
    records: 0,
    saved: 0,
  },
} = {}) {
  return getRedisClient().set(
    REDIS_UPDATE_STATUS_KEY,
    JSON.stringify({
      isUpdating,
      hasError,
      message,
      startedBy,
      meta,
    })
  );
}

export async function startUpdate({ workspace }) {
  try {
    const lastUpdateDetails = await getUpdateDetails();
    let updateStatus = await getUpdateStatus();
    if (updateStatus.isUpdating) {
      return updateStatus;
    }

    await setUpdateStatus(); //reset
    updateStatus = await getUpdateStatus();

    updateStatus.isUpdating = true;
    updateStatus.startedBy = workspace;
    await setUpdateStatus(updateStatus);

    const updateDay = moment().format('YYYYMMDD');
    const downloadUrl = env('GLEIF_DOWNLOAD_URL').replace('<day>', updateDay);
    let zipFilename = '';
    let xmlFilename = '';

    updateStatus.message = 'Starting GLEIF file stream.';
    await setUpdateStatus(updateStatus);

    const downloadingStream = request.get(downloadUrl);

    downloadingStream.on('error', error => {
      if (updateStatus.isUpdating) {
        updateStatus.isUpdating = false;
        updateStatus.hasError = true;
        updateStatus.message = error.message;

        setUpdateStatus(updateStatus);
      }
    });

    downloadingStream.on('response', response => {
      if (response.statusCode !== 200 && updateStatus.isUpdating) {
        updateStatus.isUpdating = false;
        updateStatus.hasError = true;
        updateStatus.message = `Could not stream GLEIF file [${
          response.statusCode
        }]`;

        setUpdateStatus(updateStatus);

        return;
      }

      zipFilename = contentDisposition.parse(
        response.headers['content-disposition']
      ).parameters.filename;

      xmlFilename = zipFilename.substring(
        0,
        zipFilename.lastIndexOf('.xml') + 4
      );

      if (
        zipFilename === lastUpdateDetails.gleifFilename &&
        updateStatus.isUpdating
      ) {
        updateStatus.isUpdating = false;
        updateStatus.hasError = true;
        updateStatus.message = `Already up to date with current GLEIF file ${zipFilename}`;

        setUpdateStatus(updateStatus);

        downloadingStream.destroy();

        return;
      }
    });

    const unzippingStream = downloadingStream.pipe(unzipper.Parse());

    const xmlStream = unzippingStream.pipe(
      new Transform({
        objectMode: true,
        transform(entry, encoding, done) {
          if (entry.path === xmlFilename && updateStatus.isUpdating) {
            updateStatus.message = 'Unzipping GLEIF file stream.';
            setUpdateStatus(updateStatus);

            entry
              .pipe(
                new Transform({
                  transform(chunk, encoding, done) {
                    xmlStream.push(chunk.toString());
                    done();
                  },
                })
              )
              .on('finish', done);
          } else {
            entry.autodrain();
            done();
          }
        },
      })
    );

    const xmlHeader = new XmlStream(xmlStream);

    xmlHeader.on('endElement: lei:LEIHeader', function(item) {
      if (!updateStatus.isUpdating) {
        return;
      }

      updateStatus.message = 'Reading GLEIF file headers';
      updateStatus.meta.xml = xmlFilename;
      updateStatus.meta.zip = zipFilename;
      updateStatus.meta.date = item['lei:ContentDate'];
      updateStatus.meta.description = item['lei:FileContent'];
      updateStatus.meta.records = Number(item['lei:RecordCount']);

      setUpdateStatus(updateStatus);
    });

    const xmlRecords = new XmlStream(xmlStream);

    xmlRecords.on('endElement: lei:LEIRecord', function(item) {
      if (!updateStatus.isUpdating) {
        return;
      }

      if (updateStatus.meta.saved === 0) {
        updateStatus.message = 'Updating GLEIF records';
        setUpdateStatus(updateStatus);
      }

      upsertEntity(transformEntityFromGleifFormat(item))
        .then(() => {
          if (updateStatus.isUpdating) {
            updateStatus.meta.saved++;

            if (updateStatus.meta.saved === updateStatus.meta.records) {
              updateStatus.message = `${
                updateStatus.meta.saved
              } records updated successfully.`;
              updateStatus.isUpdating = false;
              setUpdateDetails({
                lastUpdate: updateStatus.meta.date,
                totalRecords: updateStatus.meta.records,
                lastUpdateBy: updateStatus.startedBy,
                gleifFilename: updateStatus.meta.zip,
              });
            } else {
              updateStatus.message = `${updateStatus.meta.saved}/${
                updateStatus.meta.records
              } records updated successfully`;
            }

            setUpdateStatus(updateStatus);
          }
        })
        .catch(error => {
          updateStatus.isUpdating = false;
          updateStatus.hasError = true;
          updateStatus.message = error.message;
          throw error;
        });
    });

    return updateStatus;
  } catch (error) {
    setUpdateStatus();

    throw error;
  }
}
