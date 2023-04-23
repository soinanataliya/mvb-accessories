import { IAccessory } from "../types/types";

const ACCESSORIES = "api/accessories";
const LOGIN = "api/login";

export const getItems = (): Promise<Array<IAccessory>> => {
  return fetch(ACCESSORIES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Ошибка: " + response.status);
    }
  });
};

export const postNewItem = (name: string, price: string) => {
  fetch(ACCESSORIES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
    }),
  }).then((response) => {
    console.log(response);
  });
};

export const deleteItem = (id: string) => {
  fetch(ACCESSORIES, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((response) => {
    console.log(response);
  });
};

export const loginRequest = ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  fetch(LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    console.log(response);
  });
};
