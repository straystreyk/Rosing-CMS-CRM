//CastMembers problem (React admin create a field like [source].id,
// but it didn't make sense (maybe) )
export const customParseResponse = (fetchType: string) => {
  return function f(response: any) {
    const data = response.data;

    if (
      fetchType === "GET_LIST" ||
      fetchType === "GET_MANY" ||
      fetchType === "GET_MANY_REFERENCE"
    ) {
      return {
        data: response.data.items.map(sanitizeResource),
        total: response.data.total.count,
      };
    }

    return { data: sanitizeResource(data.data) };
  };
};

const sanitizeResource = (data: any) => {
  const result: any = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith("_")) {
      return acc;
    }

    const dataForKey = data[key];

    if (dataForKey === null || dataForKey === undefined) {
      return acc;
    }

    if (Array.isArray(dataForKey)) {
      if (typeof dataForKey[0] === "object" && dataForKey[0] !== null) {
        return {
          ...acc,
          [key]: dataForKey.map(sanitizeResource),
        };
      } else {
        return { ...acc, [key]: dataForKey };
      }
    }

    if (typeof dataForKey === "object" && dataForKey !== null) {
      return {
        ...acc,
        ...(dataForKey && dataForKey.id && {}),
        // We should only sanitize gql types, not objects
        [key]: dataForKey.__typename ? sanitizeResource(dataForKey) : dataForKey,
      };
    }

    return { ...acc, [key]: dataForKey };
  }, {});

  return result;
};
