import { SyntheticEvent, useEffect, useState } from "react";
import { getItems, postNewItem } from "../api/requests";
import { AccessoriesList } from "../components/admin/AccessoriesList";
import { IAccessory } from "../types/types";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<Array<IAccessory>>([]);

  const getAccessories = async () => {
    const res = await getItems();
    setItems(res);
  };

  useEffect(() => {
    getAccessories();
  }, []);

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
    <div>
      <h1>Client!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={handleChangeName}></input>
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleChangePrice}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <AccessoriesList items={items} />
    </div>
  );
};

export default Admin;
