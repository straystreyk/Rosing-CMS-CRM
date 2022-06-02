import { useEffect, useState } from "react";
import { Providers } from "../components/Providers";

const { dataProvider: dataProviderFactory } = Providers;

export const useApp = () => {
  const [dataProvider, setDataProvider] = useState<any>(null);

  useEffect(() => {
    const fetchDataProvider = async () => {
      let block = true;
      try {
        const dataProviderInstance = await dataProviderFactory();
        block = false;
        if (!block && dataProviderInstance) {
          setDataProvider(() => dataProviderInstance);
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
