import { memo, FC } from "react";
import { deleteItem } from "../../../api/requests";
import { IAccessory } from "../../../types/types";
import styles from "./Accessory.module.css";

interface IProps {
  item: IAccessory;
}

const Accessory: FC<IProps> = ({ item }) => {
  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <div className={styles.accessoryWrapper}>
      <div>id: {item.id}</div>
      <div>Name: {item.name}</div>
      <div>Price: {item.price}</div>
      <div>Src: {item.src}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default memo(Accessory);
