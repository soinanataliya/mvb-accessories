import { PropsWithChildren, memo } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "../Header";
import styles from "./PageLayout.module.css";

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Toaster />
    </div>
  );
};
export default memo(PageLayout);
