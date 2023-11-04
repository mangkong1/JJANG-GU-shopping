import { addItem, removeItem, removeAllItem, getTotalPrice, updateQuantity, getTotalAmount } from "./localStorage.js";

const deleteAllBtn = document.getElementById("deleteAllBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
const totalItemNum = document.getElementById("totalItemNumber");
const totalItemPrice = document.getElementById("totalItemPrice");
const shipPrice = document.getElementById("shipPrice");
const totalPrice = document.getElementById("totalPrice");
const cartItem = document.getElementById("cartItems");

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

function addItemtoCart() {
  cartItem.innerHTML = cart
    .map((item, i) => {
      ` <div class="flex items-center">
        <input checked id="${item.id}" type="checkbox" class="w-[10%] h-[10%] text-gray200 border-gray200">
            <div class="h-[40%] w-[40%] m-2 mt-4">
            <img class="itemImg 2xl object-fit rounded-2xl" src="${item.image}" alt="cartImg">
            </div>
        <label for="${item.id}" class="mx-2">${item.name}</label>
    </div>
    <div class="flex justify-center items-center">
        <input type="number" value="${item.quantity}" min="1" class="itemNumber w-[2.5rem] h-[1.3rem] border border-solid border-gray200 rounded-sm"/>
    </div>
        <p class="flex justify-center items-center font-bold ml-2">${item.price}</p>`;
    })
    .join("");
}

const parentElement = document.querySelector(".a");
removeElements(parentElement);

function removeChosenItem() {
  const checkbox = document.querySelectorAll('input[type="checkbox"]');
  checkbox.forEach((item) => {
    if (item.checked) {
      checkbox.parentElementremove("");
    }
  });
}

addItemtoCart();
