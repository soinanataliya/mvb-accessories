import { PropsWithChildren, memo } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./PageLayout.module.css";

const PageLayout = ({ children }: PropsWithChildren) => {
    return <div className={styles.page}>
        {children}
        <Toaster />
    </div>;
};
export default memo(PageLayout);
