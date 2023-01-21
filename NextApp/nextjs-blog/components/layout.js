import React from "react";
import styles from "../styles/layout.module.css";

export default function layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
