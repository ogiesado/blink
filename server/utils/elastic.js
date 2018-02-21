import elasticsearch from 'elasticsearch';
import env from './env';

/**
 * The connected elasticsearch client
 * @type {ElasticSearchClient}
 */
let elasticClient = null;

export async function connectToElastic({
  host = env('ELASTIC_SEARCH_HOST'),
  port = env('ELASTIC_SEARCH_PORT'),
  apiVersion = '6.1',
  ...rest
} = {}) {
  const client = new elasticsearch.Client({
    host: `${host}:${port}`,
    log: 'trace',
    apiVersion,
    ...rest,
  });

  try {
    await client.ping({ requestTimeout: 30000 });
    elasticClient = client;
    return elasticClient;
  } catch (error) {
    throw error;
  }
}

/**
 * Returns the elastic search client
 * @return {ElasticSearchCient} The elastic search client
 * @throws {Error} If the elastic search client is not connected
 */
export function getElasticClient() {
  if (elasticClient === null) {
    throw new Error('Elastic search is not connected!');
  }

  return elasticClient;
}

export function elasticIndexExists(index) {
  return getElasticClient().indices.exists({ index });
}

export async function prepareElastic() {
  try {
    const index = 'entities';
    if (await elasticIndexExists(index)) {
      return true;
    } else {
      await createElasticIndex(index, {
        entity: {
          properties: {
            lei: {
              type: 'text',
            },
            name: {
              type: 'text',
            },
            addressLineOne: {
              type: 'text',
            },
            addressLineTwo: {
              type: 'text',
            },
            city: {
              type: 'text',
            },
            region: {
              type: 'text',
            },
            country: {
              type: 'text',
            },
            postCode: {
              type: 'text',
            },
          },
        },
      });

      return true;
    }
  } catch (error) {
    throw error;
  }
}

export function upsertElastic(index, type, document, id) {
  return getElasticClient().bulk({
    body: [{ index: { _index: index, _type: type, _id: id } }, document],
  });
}

export function updateElastic(index, type, document, id) {
  return getElasticClient().bulk({
    body: [
      { update: { _index: index, _type: type, _id: id } },
      { doc: document },
    ],
  });
}

export function deleteElastic(index, id) {
  return getElasticClient().bulk({
    body: [{ delete: { _index: index, _id: id } }],
  });
}

export function deleteElasticIndex(index) {
  return getElasticClient().indices.delete({ index });
}

export function createElasticIndex(index, mappings) {
  return getElasticClient().indices.create({ index, body: { mappings } });
}

export function searchElastic(index, q) {
  return getElasticClient().get({ index, q });
}

export function findFromElastic(index, type, id) {
  return getElasticClient().get({ index, type, id });
}
