import styles from "./TopRight.module.css";

function TopRight({ children }: any) {
  return <div className={styles.content}>{children}</div>;
}

export default TopRight;
