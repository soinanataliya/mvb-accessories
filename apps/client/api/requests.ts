import { IAccessory } from "../types/types";
import { showError, showSuccess } from "./helpers";

const ACCESSORIES = "api/accessories";
const LOGIN = "api/login";
const LOGOUT = "api/logout";
const USER = "api/user";

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
      showError('Cannot get items');
    }
  });
};

export const postNewItem = (formData: FormData) => {
  fetch(ACCESSORIES, {
    method: "POST",
    body: formData,
  }).then(() => {
    showSuccess();
  }).catch(() => {
    showError();
  })
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
  }).then(() => {
    showSuccess();
  });
};

export const loginRequest = ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<Response> => {
  return fetch(LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });
};

export const logoutRequest = (): Promise<Response> => {
  return fetch(LOGOUT, {
    method: "POST",
  })
};

export const getUser = (): Promise<{ user: string }> => {
  return fetch(USER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      showError('Not logged in');
    }
  });
};
