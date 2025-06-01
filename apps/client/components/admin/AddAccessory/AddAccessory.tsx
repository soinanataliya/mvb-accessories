import { memo, useState, SyntheticEvent, ChangeEvent, ReactNode } from "react";
import { postNewAccessory } from "../../../api/requests";
import styles from "./AddAccessory.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface IProps {
  categories?: { id: string; name: string }[];
}

const AddAccessory = ({ categories = [] }: IProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemCategories, setItemCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: postNewAccessory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["accessories"] });
    },
  });

  const handleChangeName = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setName(target.value);
  };

  const handleChangePrice = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPrice(target.value);
  };

  const handleChangeCategory = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setItemCategories(value as string[]); // TODO
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.length ? target.files[0] : null;
    setFile(file as any);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    console.log("itemCategories", itemCategories);
    formData.append("category", itemCategories.join(","));
    if (!!file) {
      formData.append("fileType", file.type);
      const f = new Blob([file]);
      formData.append("file", f);
    }

    void create(formData);
  };

  return (
    <Card variant="outlined" style={{ margin: "24px 0" }}>
      <CardContent>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h5" marginBottom="12px">
            Add new accessory
          </Typography>
          <div className={styles.formBlock}>
            <TextField label="Name" value={name} onChange={handleChangeName} />
          </div>
          <div className={styles.formBlock}>
            <TextField
              type="text"
              name="price"
              label="Price"
              value={price}
              onChange={handleChangePrice}
            />
          </div>
          <div className={styles.formBlock}>
            <TextField
              type="file"
              id="photo"
              name="photo"
              inputProps={{ accept: "image/png, image/jpeg" }}
              onChange={handleChangeFile}
            />
          </div>
          <div className={styles.formBlock}>
            <Select
              // multiple
              type="text"
              id="category"
              name="category"
              label="Category"
              value={itemCategories}
              style={{ width: 195 }}
              onChange={(event) => handleChangeCategory(event)}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
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
export default memo(AddAccessory);
