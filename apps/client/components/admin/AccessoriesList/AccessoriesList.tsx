import { memo } from "react";
import { Accessory } from "../Accessory";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../../../api/requests";
import { Typography, Card, CardContent } from "@mui/material";

const AccessoriesList = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getItems,
    queryKey: ["accessories"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card variant="outlined" style={{ margin: "24px 0" }}>
      <CardContent>
        <Typography variant="h5" marginBottom="12px">
          All items
        </Typography>
        {isSuccess &&
          data?.map((item) => {
            return <Accessory key={item.id} item={item} />;
          })}
      </CardContent>
    </Card>
  );
};
export default memo(AccessoriesList);
