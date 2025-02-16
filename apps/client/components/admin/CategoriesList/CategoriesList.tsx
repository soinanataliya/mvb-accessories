import { memo } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../api/requests";

interface IProps {
  categories?: { id: string; name: string }[];
  isLoading: boolean;
  isSuccess: boolean;
}

const CategoriesList = ({ categories, isLoading, isSuccess }: IProps) => {
  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = (id: string) => {
    void create(id);
  };

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
            return (
              <div>
                <p>{category.name}</p>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};
export default memo(CategoriesList);
