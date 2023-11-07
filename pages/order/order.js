import "../../index.css";
import { getisCheckedPrice } from "../cart/localStorage.js";
const nameInput = document.getElementById("nameInput");
const phoneNumInput = document.getElementById("phoneNumInput");
const postCodeInput = document.getElementById("postCodeInput");
const addrInput = document.getElementById("addrInput");
const detailAddrInput = document.getElementById("detailAddrInput");
const requestSelect = document.getElementById("requestSelect");
const addrFindBtn = document.getElementById("addrFindBtn");
const orderBtn = document.getElementById("orderBtn");

const itemWrapper = document.getElementById("itemWrapper");

const shipPriceElem = document.getElementById("shipPrice");
const totalPriceElem = document.getElementById("totalPrice");
const totalItemPriceElem = document.getElementById("totalItemPrice");

let cart = JSON.parse(localStorage.getItem("cart"));
const checkedPrice = getisCheckedPrice();
cart.forEach((item) => {
  if (item.checked) {
    itemWrapper.innerHTML += `<p id="items" class="justify-self-end p-3">${item.name} / ${item.quantity}개</p>`;
  }
});

shipPriceElem.innerHTML = "3000원";

totalItemPriceElem.innerHTML = `${checkedPrice}`;
totalPriceElem.innerHTML = `${checkedPrice + 3000}원`;

function searchAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = "";
      var extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      postCodeInput.value = data.zonecode;
      addrInput.value = `${addr} ${extraAddr}`;
      detailAddrInput.placeholder = "상세 주소를 입력해 주세요.";
      detailAddrInput.focus();
    },
  }).open();
}

function isWrittenAll() {
  const nameVal = nameInput.value;
  const phoneNumVal = phoneNumInput.value;
  const postCodeVal = postCodeInput.value;
  const addrVal = addrInput.value;

  if (!nameVal || !phoneNumVal || !postCodeVal || !addrVal) {
    console.log(nameVal);
    console.log(phoneNumVal);
    console.log(postCodeVal);
    console.log(addrVal);
    alert("필수 배송지 정보를 모두 입력해 주세요.");
    return false;
  }
  return true;
}

function validatePhoneNumber() {
  let phoneNumVal = phoneNumInput.value;
  const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const phoneRegexnodash = /^\d{9,11}$/;
  if (phoneRegexnodash.test(phoneNumVal)) {
    console.log("beforeformat", phoneNumVal);
    phoneNumVal = phoneNumVal.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
    console.log("reformatted", phoneNumVal);
  }
  if (!phoneRegex.test(phoneNumVal)) {
    alert("올바른 형식이 아닙니다. 한국 번호를 입력해주세요.");
    return false;
  }
  return true;
}

function validateInput() {
  if (isWrittenAll()) {
    if (validatePhoneNumber()) {
      return;
    }
  }
  return;
}

function selectSelfInput() {
  const requestSelectVal = requestSelect.value;
  const requestInput = document.getElementById("requestInput");

  if (requestSelectVal === "직접 입력") {
    console.log(requestSelectVal);
    requestInput.classList.remove("hidden");
  } else {
    console.log(requestSelectVal);
    requestInput.classList.add("hidden");
  }
}

addrFindBtn.addEventListener("click", searchAddr);
orderBtn.addEventListener("click", validateInput);
requestSelect.addEventListener("change", selectSelfInput);
