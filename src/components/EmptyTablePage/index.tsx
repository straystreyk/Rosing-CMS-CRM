import React from "react";

import styles from "./index.module.css";

export const EmptyTablePage: React.FC = () => {
  return (
    <div className={styles.EmptyPageWrapper}>
      <h3>No results</h3>
      <p>You may need to change the filtering parameters</p>
    </div>
  );
};
