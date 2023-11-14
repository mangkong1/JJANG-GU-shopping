import "../../index.css";
import { addItem } from "../cart/localStorage.js";

const putCartBtn = document.getElementById("putCartBtn");
const payInstantBtn = document.getElementById("payInstantBtn");

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", "[]");
}
if (!localStorage.getItemd("idTemp")) {
  localStorage.setItem("idTemp", "654d03e1a9da399b694ceefe");
}
const id = sessionStorage.getItem("idTemp");
console.log(id);
fetch(`http://kdt-sw-7-team03.elicecoding.com/api/products/${id}`)
  .then((res) => {
    if (res.status == 200) {
      console.log("상품 조회 완료");
    } else if (res.status == 400) {
      alert("인증실패, 잘못된 요청");
    } else if (res.status == 500) {
      alert("서버 오류");
    } else {
      alert("상품 조회 실패");
    }
    return res.json();
  })
  .then((res) => {
    const itemPrice = document.getElementById("itemPrice");
    itemPrice.innerHTML = `${res.price}원`;
    const itemName = document.getElementById("itemName");
    itemName.innerHTML = res.name;
    document.getElementById("detailImage").src = res.images[0];

    putCartBtn.addEventListener("click", (e) => {
      if (sessionStorage.getItem("btn") !== null) {
        sessionStorage.removeItem("btn");
      }
      addItem(res._id);
      let isconfirm = confirm("아이템이 장바구니에 담겼습니다. 확인해보시겠습니까?");
      if (isconfirm) {
        window.location.href = "/cart/";
      }
    });

    payInstantBtn.addEventListener("click", (e) => {
      sessionStorage.setItem("btn", "2");
    });
  });
