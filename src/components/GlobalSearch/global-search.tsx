import { ChangeEvent, FC, useState } from "react";
import styles from "./global-search.module.css";

export const GlobalSearch: FC = () => {
  const [value, setValue] = useState("");

  const sendRequest = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  return (
    <>
      <input
        className={styles.inputSearch}
        type="text"
        value={value}
        onChange={sendRequest}
        placeholder={"Id, name, slug"}
      />
    </>
  );
};
