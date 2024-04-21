import { memo } from "react";
import styles from "./Header.module.css";


const Header = () => {
  return <div className={styles.header}>
    MVB ACCESSORIES
    <img
    height="360px"
    src="/logo.png"
    className={styles.headerImg}
    alt="украшения ободки handmade"
/>
  </div>;
};
export default memo(Header);
