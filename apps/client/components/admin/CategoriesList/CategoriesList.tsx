import { memo } from "react";
import { Typography, Card, CardContent } from "@mui/material";

interface IProps {
  categories?: { id: string, name: string}[];
  isLoading: boolean;
  isSuccess: boolean;
}

const CategoriesList = ({ categories, isLoading, isSuccess}: IProps) => {

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card variant="outlined" style={{ margin: "24px 0" }}>
      <CardContent>
        <Typography variant="h5" marginBottom="12px">
          All categories
        </Typography>
        {isSuccess &&
          categories?.map((category) => {
            return <p>{category.name}</p>;
          })}
      </CardContent>
    </Card>
  );
};
export default memo(CategoriesList);
