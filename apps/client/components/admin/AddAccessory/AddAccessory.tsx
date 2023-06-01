import { memo, useState, SyntheticEvent } from "react";
import { postNewItem } from "../../../api/requests";
import styles from "./AddAccessory.module.css";

const AddAccessory = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleChangeName = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setName(target.value);
  };

  const handleChangePrice = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPrice(target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    postNewItem(name, price);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      <button type="submit">Add</button>
    </form>
  );
};
export default memo(AddAccessory);
