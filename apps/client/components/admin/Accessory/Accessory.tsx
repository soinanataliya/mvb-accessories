import { memo, FC } from "react";
import { deleteItem } from "../../../api/requests";
import { IAccessory } from "../../../types/types";
import styles from "./Accessory.module.css";

interface IProps {
  item: IAccessory;
}

const Accessory: FC<IProps> = ({ item }) => {
  const { id, name, price, src } = item;
  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <div className={styles.accessoryWrapper}>
      <div>id: {id}</div>
      <div>Name: {name}</div>
      <div>Price: {price}</div>
      <div>Src: {src}</div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`http://localhost:3001/uploads/${src}`}
          alt="Accessory image"
          width={100}
          height={100}
        />
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default memo(Accessory);
