import { memo, useMemo, useState } from "react";
import { Accessory } from "../Accessory";
import { useQuery } from "@tanstack/react-query";
import { getAccessories, getCategories } from "../../../api/requests";
import { useTranslations } from "next-intl";

import styles from "./AccessoriesList.module.css";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";

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

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
  } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  const [filter, setFilter] = useState<string[]>([]);

  const loadingData = isLoading || isLoadingCategories;
  const showData = isSuccess && isSuccessCategories;

  const filteredData = useMemo(() => {
    if (!!filter?.length) {
      return data?.filter((item) =>
        filter.find((filter) => filter === item.category)
      );
    }
    return data;
  }, [data, filter]);

  return (
    <>
      <h3 className={styles.header}>
        {t("title")}
        {showData && (
          <>
            <CustomSelect
              name="category"
              value={filter}
              options={categories}
              onChange={(event) => setFilter(event.target.value as string[])}
            />
            {!!filter && (
              <button onClick={() => setFilter([])}>Remove filter</button>
            )}
          </>
        )}
      </h3>
      <div className={styles.accessories}>
        {loadingData && <div>{t("loading")}</div>}
        {showData &&
          filteredData?.map((item) => {
            return <Accessory key={item.id} item={item} />;
          })}
        {showData && !filteredData?.length && (
          <p className={styles.noData}>{t("noData")}</p>
        )}
      </div>
    </>
  );
};
export default memo(AccessoriesList);
