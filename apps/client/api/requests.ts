export const getItems = () => {
  fetch("http://localhost:3001/accessories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      debugger
      return response.json();
    } else {
      alert("Ошибка: " + response.status);
    }
  });
};

export const postNewItem = (name: string, price: string) => {
  fetch("http://localhost:3001/accessories", {
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
