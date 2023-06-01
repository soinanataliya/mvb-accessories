import { memo, FC } from "react";
import { IAccessory } from "../../../types/types";
import { Accessory } from "../Accessory";

interface IProps {
  items: Array<IAccessory>;
}

const AccessoriesList: FC<IProps> = ({ items }) => {
  return (
    <>
      <h3>All items</h3>
      {items?.map((item) => {
        return <Accessory key={item.id} item={item} />;
      })}
    </>
  );
};
export default memo(AccessoriesList);
