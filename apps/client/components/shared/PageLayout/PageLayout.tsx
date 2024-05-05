import { PropsWithChildren, memo } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "../Header";
import styles from "./PageLayout.module.css";
import { useTheme } from "../../../themes/ThemeProvider/ThemeProvider";

const PageLayout = ({ children }: PropsWithChildren) => {

    const { theme } = useTheme();
    
    return <div className={`${styles.page} ${styles[theme]}`}>
        <Header />
        {children}
        <Toaster />
    </div>;
};
export default memo(PageLayout);
