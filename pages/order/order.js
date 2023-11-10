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

const id = sessionStorage.getItem("idTemp");
shipPriceElem.innerHTML = "3000원";

if (sessionStorage.getItem("btn") !== null) {
  fetch(`http://kdt-sw-7-team03.elicecoding.com/api/products/${id}`)
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
      itemWrapper.innerHTML += `<p id="items" class="justify-self-end p-3 overflow-hidden">${data.name} / 1개</p>`;
      totalItemPriceElem.innerHTML = `${data.price}원`;
      totalPriceElem.innerHTML = `${parseInt(data.price) + 3000}원`;
    });
} else {
  cart.forEach((item) => {
    if (item.checked) {
      itemWrapper.innerHTML += `<p id="items" class="justify-self-end p-3"> ${item.name} / ${item.quantity}개</p>`;
    }
  });
  totalItemPriceElem.innerHTML = `${checkedPrice}원`;
  totalPriceElem.innerHTML = `${checkedPrice + 3000}원`;
}

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
    requestInput.focus();
  } else {
    console.log(requestSelectVal);
    requestInput.classList.add("hidden");
  }
}

// async function doOrder() {
//   const nameVal = nameInput.value;
//   const phoneNumVal = phoneNumInput.value;
//   const postCodeVal = postCodeInput.value;
//   const addrVal = addrInput.value;
//   const detailAddrVal = detailAddrInput.value;
//   const requestSelectVal = requestSelect.value;

//   validateInput();

//   const data = {
//     name: nameVal,
//     phone: phoneNumVal,
//     address: [postCodeVal, addrVal, detailAddrVal],
//     paymentMethod: "현금",
//     email: "elice@elice.com",
//     qty: getisCheckedAmount(),
//     password: "userpassword",
//     productIds: getisCheckedItemId(),
//   };

//   const dataJson = JSON.stringify(data);
//   const apiUrl = `http://kdt-sw-7-team03.elicecoding.com/api/orders`;

//   const res = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: dataJson,
//   });

//   if (res.status === 201) {
//     alert("카테고리 생성 완료!");
//   } else if (res.status === 400) {
//     alert("인증 실패");
//   } else if (res.status === 500) {
//     alert("서버 오류");
//   } else {
//     alert("카테고리 생성에 실패했습니다.");
//   }
// }

addrFindBtn.addEventListener("click", searchAddr);
// orderBtn.addEventListener("click", doOrder);
orderBtn.addEventListener("click", validateInput);
requestSelect.addEventListener("change", selectSelfInput);
