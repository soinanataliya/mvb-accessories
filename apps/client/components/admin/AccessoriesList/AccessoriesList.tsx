import { memo } from "react";
import { Accessory } from "../Accessory";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../../../api/requests";

const AccessoriesList = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getItems,
    queryKey: ['accessories'],
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h3>All items</h3>
      {isSuccess && data?.map((item) => {
        return <Accessory key={item.id} item={item} />;
      })}
    </>
  );
};
export default memo(AccessoriesList);
