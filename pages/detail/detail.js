import "../../index.css";
import { addItem } from "../cart/localStorage.js";

//임시방편
const putCartBtn = document.getElementById("putCartBtn");
const payInstantBtn = document.getElementById("payInstantBtn");

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
