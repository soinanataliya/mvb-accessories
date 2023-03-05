import { memo, FC } from "react";
import { deleteItem } from "../../../api/requests";
import { IAccessory } from "../../../types/types";

interface IProps {
  item: IAccessory;
}

const Accessory: FC<IProps> = ({ item }) => {
  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ color: "grey" }}>{item.id}</div>
      <div>Name: {item.name}</div>
      <div style={{ color: "blue" }}>{item.price}</div>
      <div style={{ color: "red" }}>{item.src}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default memo(Accessory);
