import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  return (
    <>
      <Filter title="Rating" tags={["1+", "2+", "3+", "4+", "5+"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Test Filter 2" tags={["1", "2", "3", "4"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Test Filter Days" tags={["2 days", "3 days", "4 days", "5 days", "6 days"]} />
      <Divider dashed />
      <Filter
        title="Test Filter- Types"
        tags={["Type 1", "Type 2", "Type 3", "Type 4"]}
      />
      <Divider dashed />
      <Filter title="Departing Time" tags={["time 1", "time 2", "time 3"]} />
    </>
  );
};
