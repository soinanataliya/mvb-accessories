import { ChangeEventHandler, SyntheticEvent, useState } from "react";
import { Button } from "ui";
import { testFetch } from "./helpers";

export default function Web() {
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
    testFetch(name, price);
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
    </div>
  );
}
