import { memo, useState, SyntheticEvent } from "react";
import { postNewCategory } from "../../../api/requests";
import styles from "./AddCategory.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AddCategory = () => {
  const [name, setName] = useState("");

  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: postNewCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleChangeName = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setName(target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    void create({ name });
  };

  return (
    <Card variant="outlined" style={{ margin: "24px 0" }}>
      <CardContent>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h5" marginBottom="12px">
            Add new category
          </Typography>
          <div className={styles.formBlock}>
            <TextField label="Name" value={name} onChange={handleChangeName} />
          </div>
          <div className={styles.formBlock}>
            <Button color="primary" variant="contained" type="submit">
              Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default memo(AddCategory);
