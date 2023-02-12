export const testFetch = (name: string, price: string) => {
  fetch("http://localhost:3001/accessories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
    }),
  })
    .then((response) => {
      console.log(response);
    });
};
