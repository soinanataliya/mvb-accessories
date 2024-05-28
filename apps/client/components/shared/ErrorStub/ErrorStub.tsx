import { memo } from "react";
import { useTranslations } from "next-intl";
import styles from "./ErrorStub.module.css";

export async function getStaticProps(props: { locale: string }) {
  return {
    props: {
      messages: (await import(`../../../messages/${props.locale}.json`))
        .default,
    },
  };
}

const ErrorStub = () => {
  const t = useTranslations("ErrorStub");

  return <div className={styles.message}>{t("message")}</div>;
};
export default memo(ErrorStub);
