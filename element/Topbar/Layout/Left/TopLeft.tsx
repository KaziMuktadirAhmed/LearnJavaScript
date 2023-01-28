import styles from "./TopLeft.module.css";

function TopLeft({ children }: any) {
  return <div className={styles.content}>{children}</div>;
}

export default TopLeft;
