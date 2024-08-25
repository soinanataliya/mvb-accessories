import { IAccessory } from "../types/types";
import { showError, showSuccess } from "./helpers";

const ACCESSORIES = "api/accessories";
const CATEGORIES = "api/categories";
const LOGIN = "api/login";
const LOGOUT = "api/logout";
const USER = "api/user";

export const getAccessories = async (): Promise<Array<IAccessory>> => {
  try {
    const response = await fetch(ACCESSORIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      showError("Cannot get items");
      return Promise.reject(response);
    }
  } catch (error) {
    showError();
    throw error;
  }
};

export const postNewAccessory = async (formData: FormData) => {
  try {
    const response = await fetch(ACCESSORIES, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      showSuccess();
    } else {
      showError("Cannot add new item");
    }
  } catch {
    showError();
  }
};

export const deleteAccesory = async (id: string) => {
  try {
    await fetch(ACCESSORIES, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    showSuccess("Successfully deleted");
  } catch (error) {
    showError();
  }
};

export const getCategories = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  try {
    const response = await fetch(CATEGORIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      showError("Cannot get items");
      return Promise.reject(response);
    }
  } catch (error) {
    showError();
    throw error;
  }
};

export const postNewCategory = async (name: { name: string }) => {
  try {
    const response = await fetch(CATEGORIES, {
      method: "POST",
      body: JSON.stringify(name),
    });
    if (response.ok) {
      showSuccess();
    } else {
      showError("Cannot add new item");
    }
  } catch {
    showError();
  }
};

export const loginRequest = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<unknown> => {
  try {
    const response = await fetch(LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    if (response?.status === 200) {
      return await response.json();
    } else {
      showError("Cannot log in");
      return response.json();
    }
  } catch (error) {
    showError("Something went wrong");
    throw error;
  }
};

export const logoutRequest = async (): Promise<Response> => {
  try {
    const response = await fetch(LOGOUT, {
      method: "POST",
    });
    return response;
  } catch {
    showError("Cannot log out");
    return Promise.reject();
  }
};

export const getUser = async (): Promise<{ user: string }> => {
  try {
    const response = await fetch(USER, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      showError("Not logged in");
      return Promise.reject();
    }
  } catch (error) {
    showError();
    throw error;
  }
};
