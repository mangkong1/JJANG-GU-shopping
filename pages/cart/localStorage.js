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
  console.log("whatis", typeof itemId);
  if (typeof itemId !== "string") {
    console.log("item Id need to be type string");
    return;
  }
  let item = items.find((item) => {
    console.log("istrue", item.id === itemId);
    return item.id === itemId;
  });
  if (item == null) {
    console.log("id not found");
    return;
  }

  console.log(item);
  if (cart.length === 0) {
    cart.push(item);
  } else {
    let foundItem = cart.find((item) => item.id === itemId);
    if (foundItem === undefined) {
      cart.push(item);
    } else {
      foundItem.quantity += 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(itemId) {
  if (typeof itemId != "string") {
    console.log("id is not in string form");
  }
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

function updateChecked(itemId, isChecked) {
  for (let item of cart) {
    if (item.id === itemId) {
      item.checked = isChecked;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getisCheckedTotal(property) {
  console.log("property", property);
  console.log("cart", cart.length);
  if (cart.length) {
    console.log("conditional");
    let temp = cart
      .filter((item) => {
        return item.checked === true;
      })
      .map((item) => {
        return parseInt(item[property]);
      });
    let sum = temp.reduce((acc, current) => {
      return acc + current;
    }, 0);
    return sum;
  }
  return 0;
}

export { addItem, removeItem, removeAllItems, getisCheckedTotal, updateAmount, updateChecked };
