import TopRight from "./Layout/Right/TopRight";
import TopCenter from "./Layout/Center/TopCenter";
import TopLeft from "./Layout/Left/TopLeft";

import styles from "./Topbar.module.css";

function Topbar() {
  return (
    <header className={styles.topbar}>
      <div>
        <TopLeft>Top left section, mainly app logo</TopLeft>
      </div>
      <div style={{ justifySelf: "center" }}>
        <TopCenter>Center items, most likely search field</TopCenter>
      </div>
      <div>
        <TopRight>Top Right contents, mostly links and icon</TopRight>
      </div>
    </header>
  );
}

export default Topbar;
