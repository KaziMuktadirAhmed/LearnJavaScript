import styles from "./TopCenter.module.css";

function TopCenter({ children }: any) {
  return <div className={styles.content}>{children}</div>;
}

export default TopCenter;
