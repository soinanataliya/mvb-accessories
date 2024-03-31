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
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(http://localhost:3001/uploads/${src})`,
        }}
      ></div>
      <div className={styles.description}>
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};
export default memo(Accessory);
