import { memo, useState, SyntheticEvent, ChangeEvent } from "react";
import { postNewItem } from "../../../api/requests";
import styles from "./AddAccessory.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddAccessory = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: postNewItem,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accessories']});
    }
  });

  const handleChangeName = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setName(target.value);
  };

  const handleChangePrice = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPrice(target.value);
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
    if (!!file) {
      const f = new Blob([file]);
      formData.append("file", f);
      formData.append("fileType", file.type);
    }

   void create(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      encType="multipart/form-data"
    >
      <h3>+ Add new accessory</h3>
      <div className={styles.formBlock}>
        <label>Name:</label>
        <input value={name} onChange={handleChangeName}></input>
      </div>
      <div className={styles.formBlock}>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={handleChangePrice}
        />
      </div>
      <div className={styles.formBlock}>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/png, image/jpeg"
          onChange={handleChangeFile}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
export default memo(AddAccessory);
