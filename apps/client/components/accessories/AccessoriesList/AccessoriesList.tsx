import { memo } from "react";
import { Accessory } from "../Accessory";
import { useQuery } from "@tanstack/react-query";
import { getAccessories } from "../../../api/requests";
import { useTranslations } from "next-intl";

import styles from "./AccessoriesList.module.css";

export async function getStaticProps(props: { locale: string }) {
  return {
    props: {
      messages: (await import(`../../../messages/${props.locale}.json`))
        .default,
    },
  };
}

const AccessoriesList = () => {
  const t = useTranslations("AccessoriesList");

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getAccessories,
    queryKey: ["accessories"],
  });

  return (
    <>
      <h3 className={styles.header}>{t("title")}</h3>
      <div className={styles.accessories}>
        {isLoading && <div>{t("loading")}</div>}
        {isSuccess &&
          data?.map((item) => {
            return <Accessory key={item.id} item={item} />;
          })}
      </div>
    </>
  );
};
export default memo(AccessoriesList);
