import { SyntheticEvent, useEffect, useState } from "react";
import { getItems, postNewItem } from "../api/requests";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const result = getItems();
    console.log(result);
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
      <h3>All items</h3>
    </div>
  );
};

export default Admin;
