import "../../index.css";
import { removeItem, removeAllItems, updateChecked, updateAmount, getisCheckedPrice, getisCheckedAmount } from "./localStorage.js";

const deleteAllBtn = document.getElementById("deleteAllBtn");
const deleteChosenBtn = document.getElementById("deleteChosenBtn");

const totalAmountElem = document.getElementById("totalAmount");
const totalItemPriceElem = document.getElementById("totalItemPrice");
const cartItemWrap = document.getElementById("cartItemWrap");

const shipPriceElem = document.getElementById("shipPrice");
const totalPriceElem = document.getElementById("totalPrice");
const cartItemElems = document.getElementsByClassName("cartItems");

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", "[]");
}
let cart = JSON.parse(localStorage.getItem("cart"));

if (cart.length === 0) {
  const goodsContainer = document.querySelector(".goodsContainer");
  cartItemWrap.innerHTML = `<div class=" h-[225.64px] flex justify-center items-center text-gray400">장바구니가 비었습니다. 상품을 추가해 보세요!</div>`;
} else {
  cart.forEach((item) => {
    console.log("image", item.images);
    cartItemWrap.innerHTML += ` <div id="cartItem-${item._id}" class="cartItems grid grid-cols-3 grid-cols-[4fr_1fr_2fr]  justify-items-center items-center"> 
              <div class="flex items-center">
                <input id="check-${item._id}" type="checkbox" class="checkboxes w-[10%] h-[10%] text-gray200 border-gray200">
                    <div class="h-[40%] w-[40%] m-2 mt-4">
                    <img class="itemImg 2xl object-fit rounded-2xl" src="${item.images[0]}" alt="cartImg">
                    </div>
                <label for="check-${item._id}" class="mx-2">${item.name}</label>
              </div>
              <div class="flex justify-center items-center">
                <input id="itemNum-${item._id}" type="number" value="${item.quantity}" min="1" max="99" class="w-[2.5rem] h-[1.3rem] border border-solid border-gray200 rounded-sm"/>
              </div>
              <p id="itemPrice-${item._id}" class="itemPrices flex justify-center items-center font-bold ml-2">${item.price}</p>
            </div>`;
  });
}

const checkBoxElems = document.querySelectorAll('input[type="checkbox"]');
const numberBoxElems = document.querySelectorAll('input[type="Number"]');

function showCheckBox() {
  cart.forEach((item) => {
    const checkbox = document.getElementById(`check-${item._id}`);
    checkbox.checked = item.checked;
  });
}

function getItemId(itemId) {
  if (typeof itemId == "string") {
    if (itemId.includes("-")) {
      const splitId = itemId.split("-");
      return splitId[1];
    } else {
    }
  }
}

function getCheckedElements() {
  const checkedBoxElems = document.querySelectorAll('input[type="checkbox"]:checked');
  const checkedItems = Array.from(checkedBoxElems).map((checkedBox) => {
    const itemId = getItemId(checkedBox.id);
    const cartItem = document.getElementById(`cartItem-${itemId}`);
    return cartItem;
  });
  return checkedItems;
}

function deleteChosenIteminCart() {
  Array.from(getCheckedElements()).forEach((element) => {
    element.remove();
    const itemId = getItemId(element.id);
    removeItem(itemId);
  });
  showtotalItemPrice();
  showtotalAmount();
  showtotalPrice();
  location.reload();
}

function deleteAllIteminCart() {
  removeAllItems();
  Array.from(cartItemElems).forEach((element) => element.remove());
  showtotalItemPrice();
  showtotalAmount();
  showtotalPrice();
  location.reload();
}

//(지금은 없는데 추후에 넣을 수도 있음)
function chooseAllItem() {
  const isAllChecked = Array.from(checkBoxElems).every((item) => item.checked);
  if (isAllChecked) {
    Array.from(checkBoxElems).forEach((item) => {
      item.checked = false;
    });
  } else {
    Array.from(checkBoxElems).forEach((item) => {
      item.checked = true;
    });
  }
}

function showtotalItemPrice() {
  const price = getisCheckedPrice();
  totalItemPriceElem.innerHTML = `${price}원`;
}
function showtotalAmount() {
  const amount = getisCheckedAmount();
  totalAmountElem.innerHTML = `${amount}개`;
}

function showtotalPrice() {
  const price = getisCheckedPrice();
  if (price === 0) {
    shipPriceElem.innerHTML = "무료";
    totalPriceElem.innerHTML = `${price}원`;
  } else {
    const price = getisCheckedPrice();
    shipPriceElem.innerHTML = "3000원";
    totalPriceElem.innerHTML = `${price + 3000}원`;
  }
}

function updateCartAmount(e) {
  updateAmount(getItemId(e.target.id), parseInt(e.target.value));

  showtotalItemPrice();
  showtotalAmount();
  showtotalPrice();
}

function updateCartChecked(e) {
  updateChecked(getItemId(e.target.id), e.target.checked);
  showtotalItemPrice();
  showtotalAmount();
  showtotalPrice();
}

deleteAllBtn.addEventListener("click", deleteAllIteminCart);
deleteChosenBtn.addEventListener("click", deleteChosenIteminCart);

//value Update
for (let item of numberBoxElems) {
  item.addEventListener("input", updateCartAmount);
}
//checkbox update
for (let item of checkBoxElems) {
  item.addEventListener("change", updateCartChecked);
}

document.addEventListener("DOMContentLoaded", function () {
  showtotalItemPrice();
  showtotalAmount();
  showtotalPrice();
  showCheckBox();
  let orderButton = document.getElementById("orderBtn");

  orderButton.addEventListener("click", function () {
    if (sessionStorage.getItem("btn") !== null) {
      sessionStorage.removeItem("btn");
    }
    if (getisCheckedPrice() === 0) {
      alert("구매할 제품을 선택해주세요.");
    } else {
      window.location.href = "../order/";
    }
  });
});
