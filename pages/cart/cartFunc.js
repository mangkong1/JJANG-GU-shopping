import { addItem, removeItem, removeAllItems, updateChecked, updateAmount, getisCheckedTotal } from "./localStorage.js";

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

let items = JSON.parse(localStorage.getItem("items"));
let cart = JSON.parse(localStorage.getItem("cart"));

const showItem = cart
  .map((item) => {
    console.log(item.id);
    return ` <div id="cartItem-${item.id}" class="cartItems grid grid-cols-3 grid-cols-[4fr_1fr_2fr]  justify-items-center items-center"> 
          <div class="flex items-center">
            <input checked id="check-${item.id}" type="checkbox" class="checkboxes w-[10%] h-[10%] text-gray200 border-gray200">
                <div class="h-[40%] w-[40%] m-2 mt-4">
                <img class="itemImg 2xl object-fit rounded-2xl" src="${item.image}" alt="cartImg">
                </div>
            <label for="check-${item.id}" class="mx-2">${item.name}</label>
          </div>
          <div class="flex justify-center items-center">
            <input id="itemNum-${item.id}" type="number" value="${item.quantity}" min="1" max="99" class="w-[2.5rem] h-[1.3rem] border border-solid border-gray200 rounded-sm"/>
          </div>
          <p id="itemPrice-${item.id}" class="itemPrices flex justify-center items-center font-bold ml-2">${item.price}</p>
        </div>`;
  })
  .join("");

cartItemWrap.innerHTML = showItem;

const checkBoxElems = document.querySelectorAll('input[type="checkbox"]');
const numberBoxElems = document.querySelectorAll('input[type="Number"]');

function getItemId(itemId) {
  if (typeof itemId == "string") {
    if (itemId.includes("-")) {
      const splitId = itemId.split("-");
      return splitId[1];
    } else {
      console.log("this item id doesn't include'-'");
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
  console.log("checkedItems", checkedItems);
  return checkedItems;
}

function deleteChosenIteminCart() {
  Array.from(getCheckedElements()).forEach((element) => {
    element.remove();
    const itemId = getItemId(element.id);
    removeItem(itemId);
  });
  console.log("deleted Selected Item");
  console.log("cart Now", JSON.parse(localStorage.getItem("cart")));
}

function deleteAllIteminCart() {
  removeAllItems();
  Array.from(cartItemElems).forEach((element) => element.remove());
  console.log("deleted All Item");
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
  const price = getisCheckedTotal("price");
  totalItemPriceElem.innerHTML = `${price}원`;
  console.log(price);
}
function showtotalAmount() {
  const amount = getisCheckedTotal("quantity");
  totalAmountElem.innerHTML = `${amount}개`;
  console.log(amount);
}

function showtotalPrice() {
  const checkedBoxElems = document.querySelectorAll('input[type="checkbox"]:checked');
  const price = getisCheckedTotal("price");
  if (checkedBoxElems.length === 0) {
    shipPriceElem.innerHTML = "무료";
    totalPriceElem.innerHTML = `${price}원`;
  } else {
    const price = getisCheckedTotal("price");
    shipPriceElem.innerHTML = "3000원";
    totalPriceElem.innerHTML = `${price + 3000}원`;
  }
}

function updateCartAmount(e) {
  updateAmount(getItemId(e.target.id), e.target.value);
  console.log("Amount", e.target.value);
  showtotalItemPrice();
  showtotalAmount();
  showtotalPrice();
}

function updateCartChecked(e) {
  updateChecked(getItemId(e.target.id), e.target.checked);
  console.log("checked", e.target.checked);
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

showtotalItemPrice();
showtotalAmount();
showtotalPrice();
