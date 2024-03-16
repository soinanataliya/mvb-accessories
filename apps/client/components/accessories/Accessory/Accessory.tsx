import { memo, FC } from "react";
import { IAccessory } from "../../../types/types";
import styles from "./Accessory.module.css";

interface IProps {
  item: IAccessory;
}

const Accessory: FC<IProps> = ({ item }) => {
  const { name, price, src } = item;

  return (
    <div className={styles.item}>
      <div>
        <img
          src={`http://localhost:3001/uploads/${src}`}
          alt={`${name}Accessory image`}
          width={100}
          height={100}
          className={styles.img}
        />
      </div>
      <div>{name}</div>
      <div>{price}</div>
    </div>
  );
};
export default memo(Accessory);
