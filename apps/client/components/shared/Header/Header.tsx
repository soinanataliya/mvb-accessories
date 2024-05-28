import { memo } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle";
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
      <ThemeToggle />
      <LanguageToggle />
    </div>
  );
};
export default memo(Header);
