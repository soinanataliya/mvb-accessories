import { memo, useState, SyntheticEvent, ChangeEvent } from "react";
import { postNewItem } from "../../../api/requests";
import styles from "./AddAccessory.module.css";

const AddAccessory = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

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

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();

    await formData.append("name", name);
    await formData.append("price", price);
    if (!!file) {
      const f = new Blob([file]);
      await formData.append("file", f);
    }

    await postNewItem(formData);
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
