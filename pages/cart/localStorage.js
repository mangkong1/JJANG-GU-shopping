fetch("./items.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    localStorage.setItem("items", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  });

let items = JSON.parse(localStorage.getItem("items"));
let cart = JSON.parse(localStorage.getItem("cart"));

function addItem(itemId) {
  let item = items.find((item) => {
    return item.id === itemId;
  });
  if (cart.length === 0) {
    cart.push(item);
  } else {
    let cartItem = cart.find((item) => item.id === itemId);
    if (cartItem === undefined) {
      cart.push(item);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(itemId) {
  let temp = cart.filter((item) => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(temp));
}

function removeAllItems() {
  localStorage.setItem("cart", "[]");
}

function updateAmount(itemId, quantity) {
  for (let item of cart) {
    if (item.id === itemId) {
      item.quantity = quantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getTotal(property) {
  let temp = cart.map((item) => {
    return parseInt(item[property]);
  });

  let sum = temp.reduce((acc, current) => {
    return acc + current;
  }, 0);

  return sum;
}

export { addItem, removeItem, removeAllItems, updateAmount };
