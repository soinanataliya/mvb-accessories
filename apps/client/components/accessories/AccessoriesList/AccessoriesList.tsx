import { memo } from "react";
import { Accessory } from "../Accessory";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../../../api/requests";
import styles from "./AccessoriesList.module.css";

const AccessoriesList = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getItems,
    queryKey: ["accessories"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3 className={styles.header}>Аксессуары</h3>
      <div className={styles.accessories}>
        {isLoading && <div>Loading...</div>}
        {isSuccess &&
          data?.map((item) => {
            return <Accessory key={item.id} item={item} />;
          })}
      </div>
    </>
  );
};
export default memo(AccessoriesList);
