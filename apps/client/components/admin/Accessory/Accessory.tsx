import { memo, FC } from "react";
import { deleteItem } from "../../../api/requests";
import { IAccessory } from "../../../types/types";
import styles from "./Accessory.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";

interface IProps {
  item: IAccessory;
}

const Accessory: FC<IProps> = ({ item }) => {
  const { id, name, price, src } = item;

  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["accessories"] });
    },
  });

  const handleDelete = () => {
    void create(item.id);
  };

  return (
    <div className={styles.accessoryWrapper}>
      <div>id: {id}</div>
      <div>Name: {name}</div>
      <div>Price: {price}</div>
      <div>Src: {src}</div>
      <div>
        <img
          src={`http://localhost:3001/uploads/${src}`}
          alt="Accessory image"
          width={100}
          height={100}
        />
      </div>
      <Button color="primary" variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
export default memo(Accessory);
