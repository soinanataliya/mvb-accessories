import { memo, useMemo, useState } from "react";
import { Accessory } from "../Accessory";
import { useQuery } from "@tanstack/react-query";
import { getAccessories, getCategories } from "../../../api/requests";
import { useTranslations } from "next-intl";
import { Select, MenuItem } from "@mui/material";

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

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
  } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  const [filter, setFilter] = useState<string | null>(null);

  const loadingData = isLoading || isLoadingCategories;
  const showData = isSuccess && isSuccessCategories;

  const filteredData = useMemo(() => {
    if (!!filter) {
      return data?.filter((item) => item.category === filter);
    }
    return data;
  }, [data, filter]);

  return (
    <>
      <h3 className={styles.header}>
        {t("title")}
        {showData && (
          <>
            <Select
              type="text"
              id="category"
              name="category"
              label="Category"
              value={filter}
              style={{ width: 195, backgroundColor: "white" }} // TODO
              onChange={(event) => setFilter(event.target.value)}
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
            {!!filter && (
              <button onClick={() => setFilter(null)}>Remove filter</button>
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
      </div>
    </>
  );
};
export default memo(AccessoriesList);
