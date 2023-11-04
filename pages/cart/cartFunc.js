import { addItem, removeItem, removeAllItem, getTotalPrice, updateQuantity, getTotalAmount } from "./localStorage.js";

const deleteAllBtn = document.getElementById("deleteAllBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
const totalAmount = document.getElementById("totalAmount");
const totalItemPrice = document.getElementById("totalItemPrice");
const shipPrice = document.getElementById("shipPrice");
const totalPrice = document.getElementById("totalPrice");
const cartItem = document.getElementById("cartItem");

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

function showIteminCart() {
  cartItem.innerHTML = cart
    .map((item, i) => {
      ` <div id="cartItem-${item.id}" class="grid grid-cols-3 grid-cols-[4fr_1fr_2fr]  justify-items-center items-center"> 
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
}

function showPayInfo() {
  totalAmount.innerHTML = getTotalAmount();
  totalItemPrice.inner;
}

function getitemId(itemId) {
  const splitId = itemId.split("-");
  return splitId[1];
}

function removeChosenItem() {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkedBoxes.forEach((checkedBox) => {
    const itemId = getitemId(checkedBox.id);
    const cartItem = document.getElementById(`cartItem-${idNumber}`);
    cartItem.remove();
    removeItem(itemId);
  });
}
