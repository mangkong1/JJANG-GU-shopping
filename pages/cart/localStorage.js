fetch("../product.json")
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
  if (typeof itemId !== "string") {
    console.log("item Id need to be type string");
    return;
  }
  let item = items.find((item) => {
    console.log("istrue", item._id === itemId);
    return item._id === itemId;
  });
  if (item == null) {
    console.log("id not found");
    return;
  }
  item.checked = true;
  item.quantity = 1;

  if (cart.length === 0) {
    cart.push(item);
    const updatedData = JSON.stringify(cart);
    localStorage.setItem("cart", updatedData);
  } else {
    let foundItem = cart.find((item) => item._id === itemId);
    if (foundItem === undefined) {
      cart.push(item);
    } else {
      let quantityLimit = item.stock;
      if (item.stock > 99) {
        quantityLimit = 99;
      }
      if (foundItem.quantity < quantityLimit) {
        foundItem.quantity += 1;
      } else {
        foundItem.quantity = quantityLimit;
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(itemId) {
  if (typeof itemId != "string") {
    console.log("id is not in string form");
  }
  let temp = cart.filter((item) => item._id !== itemId);
  localStorage.setItem("cart", JSON.stringify(temp));
}

function removeAllItems() {
  localStorage.setItem("cart", "[]");
}

function findThumbImg(itemId) {
  for (let item of items) {
    if (item._id === itemId) {
      console.log("itemImg", item.images[0]);
      return item.images[0];
    }
  }
  return;
}
function findProperty(itemId, property) {
  if (typeof property != "string") {
    console.log("property is not in string form");
    return;
  }
  for (let item of items) {
    if (item._id === itemId) {
      console.log("itemProperty", item[property]);
      return item[property];
    }
  }
}

function updateAmount(itemId, quantity) {
  for (let item of cart) {
    if (item._id === itemId) {
      item.quantity = quantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateChecked(itemId, isChecked) {
  for (let item of cart) {
    if (item._id === itemId) {
      item.checked = isChecked;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getisCheckedAmount() {
  let temp = cart
    .filter((item) => {
      return item.checked === true;
    })
    .map((item) => {
      return parseInt(item.quantity);
    });
  let sum = temp.reduce((acc, current) => {
    return acc + current;
  }, 0);
  return sum;
}

function getisCheckedPrice() {
  let temp = cart
    .filter((item) => {
      return item.checked === true;
    })
    .map((item) => {
      return parseInt(item.price) * parseInt(item.quantity);
    });
  let sum = temp.reduce((acc, current) => {
    return acc + current;
  }, 0);
  return sum;
}

export { addItem, removeItem, removeAllItems, updateAmount, updateChecked, getisCheckedPrice, getisCheckedAmount, findThumbImg, findProperty };
