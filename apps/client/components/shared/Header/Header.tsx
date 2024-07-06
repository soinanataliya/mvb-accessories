import { memo } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { LanguageToggle } from "../LanguageToggle";

const Header = () => {
  return (
    <div className={styles.header}>
      MVB ACCESSORIES
      <Image
        height={360}
        width={330}
        src="/logo.png"
        className={styles.headerImg}
        alt="украшения ободки handmade"
      />
      <div className={styles.language}>
        <LanguageToggle />
      </div>
    </div>
  );
};
export default memo(Header);
