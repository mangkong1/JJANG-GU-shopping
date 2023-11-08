import "../../index.css";
import { addItem, findThumbImg, findProperty } from "../cart/localStorage.js";

//임시방편
const itemId = localStorage.getItem("idTemp");
const putCartBtn = document.getElementById("putCartBtn");

let item = JSON.parse(localStorage.getItem("item"));
console.log(item);
// // 현재 페이지의 URL을 가져옴
// const currentPageUrl = window.location.href;
// console.log(currentPageUrl);

// // pages 폴더의 index.html 파일의 URL을 만듦
// const pagesFolderUrl = currentPageUrl.replace("/detail/", "/pages/");
// console.log(pagesFolderUrl);
// // pages 폴더의 index.html 파일의 이미지 경로를 가져옴
// fetch(pagesFolderUrl)
//   .then((response) => response.text())
//   .then((data) => {
//     // 가져온 페이지의 HTML 코드에서 img 태그의 src를 추출
//     // const parser = new DOMParser();
//     // const htmlDoc = parser.parseFromString(data, "text/html");
//     console.log(htmlDoc); //위 두 코드 포함하면 정적인 페이지

//     const imgSrc = document.querySelector("img").getAttribute("src");
//     console.log("imgSrc", imgSrc);

//     console.log(`iconData${iconData}`);

//     // detail 폴더의 index.html의 img 태그의 src를 변경
//     document.getElementById("detailImage").src = imgSrc;
//   })
//   .catch((error) => console.error("Error:", error));

putCartBtn.addEventListener("click", (e) => {
  addItem(itemId);
  let isconfirm = confirm("아이템이 장바구니에 담겼습니다. 확인해보시겠습니까?");
  if (isconfirm) {
    window.location.href = "/cart/";
  }
});

fetch("../product.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    localStorage.setItem("items", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  })
  .then((res) => {
    const itemPrice = document.getElementById("itemPrice");
    console.log("itemPrice", itemPrice);
    itemPrice.innerHTML = findProperty(itemId, "price");
    console.log(findProperty(itemId, "price"));
    const itemName = document.getElementById("itemPrice");
    itemName.innerHTML = findProperty(itemId, "name");

    document.getElementById("detailImage").src = findThumbImg(itemId);
    console.log(findThumbImg(itemId));

    window.addEventListener("beforeunload", function (event) {});

    //href값 받아오면 됨
  });

document.addEventListener("DOMContentLoaded", function () {});
