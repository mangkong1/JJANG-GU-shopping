import { addItem, removeItem, removeAllItems, updateAmount } from "./localStorage.js";

const deleteAllBtn = document.getElementById("deleteAllBtn");
const deleteChosenBtn = document.getElementById("deleteChosenBtn");
const totalAmount = document.getElementById("totalAmount");
const totalItemPrice = document.getElementById("totalItemPrice");
const cartItem = document.getElementById("cartItem");
const shipPrice = document.getElementById("shipPrice");
const totalPrice = document.getElementById("totalPrice");
const cartItems = document.getElementsByClassName("cartItems");

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
console.log(cart);
console.log(items);
const showItem = cart
  .map((item) => {
    console.log(item.id);
    return ` <div id="cartItem-${item.id}" class="cartItems grid grid-cols-3 grid-cols-[4fr_1fr_2fr]  justify-items-center items-center"> 
          <div class="flex items-center">
            <input checked id="check-${item.id}" type="checkbox" class="w-[10%] h-[10%] text-gray200 border-gray200">
                <div class="h-[40%] w-[40%] m-2 mt-4">
                <img class="itemImg 2xl object-fit rounded-2xl" src="${item.image}" alt="cartImg">
                </div>
            <label for="check-${item.id}" class="mx-2">${item.name}</label>
          </div>
          <div class="flex justify-center items-center">
            <input type="number" value="${item.quantity}" min="1" max="99" class="itemNumber w-[2.5rem] h-[1.3rem] border border-solid border-gray200 rounded-sm"/>
          </div>
          <p class="flex justify-center items-center font-bold ml-2">${item.price}</p>
        </div>`;
  })
  .join("");
// console.log(showItem);
cartItem.innerHTML = showItem;

const checkBox = document.querySelectorAll('input[type="checkbox"]');
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

console.log(checkBox);
console.log(checkedBoxes);

function getItemId(itemId) {
  const splitId = itemId.split("-");
  return splitId[1];
}

function getCheckedElements() {
  const checkedItems = Array.from(checkedBoxes).forEach((checkedBox) => {
    const itemId = getItemId(checkedBox.id);
    const cartItem = document.getElementById(`cartItem-${itemId}`);
    return cartItem;
  });
  return checkedItems;
}

function deleteChosenIteminCart() {
  Array.from(getCheckedElements()).forEach((element) => {
    element.remove();
    removeItem(getItemId(element.id));
  });
  console.log("getChecked", getCheckedElements());
  console.log("deleted Selected Item");
}

function deleteAllIteminCart() {
  removeAllItems();
  Array.from(cartItems).forEach((element) => element.remove());
  console.log("deleted All Item");
}

function showTotalItemPrice() {}

function showTotalAmount() {}

function getShipPrice() {
  if (checkedBoxes === null) {
    return shipPrice;
  }
}

//(지금은 없는데 추후에 넣을 수도 있음)
function chooseAllItem() {
  const isAllChecked = Array.from(checkBox).every((item) => item.checked);
  if (isAllChecked) {
    Array.from(checkBox).forEach((item) => {
      item.checked = false;
    });
  } else {
    Array.from(checkBox).forEach((item) => {
      item.checked = true;
    });
  }
}

function showtotalItemPrice() {}

function showtotalPrice() {}

function showQuantity() {}

deleteAllBtn.addEventListener("click", deleteAllIteminCart);
deleteChosenBtn.addEventListener("click", deleteChosenIteminCart);

addItem(1);
addItem(1);
