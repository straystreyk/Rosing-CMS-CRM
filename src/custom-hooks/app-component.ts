import { useEffect, useState } from 'react';
import { dataProvider as dataProviderFactory } from '../components/Providers';

export const useApp = () => {
  const [dataProvider, setDataProvider] = useState<any>(null);

  useEffect(() => {
    const fetchDataProvider = async () => {
      let block = true;
      try {
        const dataProviderInstance = await dataProviderFactory();
        block = false;
        if (!block && dataProviderInstance) {
          setDataProvider(
            // GOTCHA: dataProviderInstance can be a function
            () => dataProviderInstance,
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };

    fetchDataProvider();
  }, []);

  return { dataProvider };
};