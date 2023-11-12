if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", "[]");
}

let cart = JSON.parse(localStorage.getItem("cart"));

function addItem(itemId) {
  if (typeof itemId !== "string") {
    return;
  }
  console.log(itemId);
  fetch(`http://kdt-sw-7-team03.elicecoding.com/api/products/${itemId}`)
    .then((res) => {
      if (res.status == 200) {
        console.log("상품 조회 완료");
        return res.json();
      } else if (res.status == 400) {
        alert("인증실패, 잘못된 요청");
      } else if (res.status == 500) {
        alert("서버 오류");
      } else {
        alert("상품 조회 실패");
      }
      return;
    })
    .then((data) => {
      data.checked = true;
      data.quantity = 1;
      if (cart.length === 0) {
        cart.push(data);
        const updatedData = JSON.stringify(cart);
        localStorage.setItem("cart", updatedData);
      } else {
        let foundItem = cart.find((item) => item._id === itemId);
        if (foundItem === undefined) {
          cart.push(data);
        } else {
          let quantityLimit = data.stock;
          if (quantityLimit >= 99) {
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
    });
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

export { addItem, removeItem, removeAllItems, updateAmount, updateChecked, getisCheckedPrice, getisCheckedAmount };
