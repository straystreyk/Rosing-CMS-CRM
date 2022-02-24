export const detailInfoFormatter = (resource: any) => (
  Object.keys(resource)
    .map((key) => {
      let value = resource[key];
      switch (key) {
        case 'id':
          return { value, key: 'id' };
        case 'productionYear':
          return { value, key: 'Production year' };
        case 'series':
          return { value: value.name, key: 'Series' };
        case 'name':
          return { value, key: 'Name' };
        case 'number':
          return { value, key: 'Number' };
        case 'markers':
          return { value, key: 'Markers' };
        case 'slug':
          return { value, key: 'Slug' };
        case 'originalName':
          return { value, key: 'Original name' };
        case 'slogan':
          return { value, key: 'Slogan' };
        case 'certificationRatingTag':
          return { value, key: 'Certification rating tag' };
        case 'certificationRatingSystem':
          return { value, key: 'certification rating system' };
        case 'rightHolder':
          return { value, key: 'Right holder' };
        case 'releaseDate':
          return { value, key: 'Release date' };
        default:
          return undefined;
      }
    })
    .filter(Boolean)
);