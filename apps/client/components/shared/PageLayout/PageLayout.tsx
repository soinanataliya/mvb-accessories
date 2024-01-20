import { PropsWithChildren, memo } from "react";
import { Toaster } from "react-hot-toast";

const PageLayout = ({ children }: PropsWithChildren) => {
    return <>
        {children}
        <Toaster />
    </>;
};
export default memo(PageLayout);
