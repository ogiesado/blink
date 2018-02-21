import { upsertElastic } from '../utils/elastic';

export async function upsertEntity(entity) {
  try {
    await upsertElastic('entities', 'entity', entity, entity.lei);
    return entity;
  } catch (error) {
    throw error;
  }
}

export function transformEntityFromGleifFormat(gleifEntity) {
  const ge = gleifEntity['lei:Entity'];

  return {
    lei: gleifEntity['lei:LEI'],
    name: ge['lei:LegalName']['$text'],
    addressLineOne: ge['lei:LegalAddress']['lei:FirstAddressLine'],
    addressLineTwo: ge['lei:LegalAddress']['lei:AdditionalAddressLine'],
    city: ge['lei:LegalAddress']['lei:City'],
    region: ge['lei:LegalAddress']['lei:Region'],
    country: ge['lei:LegalAddress']['lei:Country'],
    postCode: ge['lei:LegalAddress']['lei:PostalCode'],
  };
}
