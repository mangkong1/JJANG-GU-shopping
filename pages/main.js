import "../style.css";
import "../index.css";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", "[]");
}

let cart = JSON.parse(localStorage.getItem("cart"));
let cartNum = cart.length;

document.querySelector("#headerWrap").innerHTML = `
<div id="header" class="w-[1274px] h-[100px] flex mx-auto justify-between items-center">
      <h1 class="h-10"><a href="/">
        <img class="h-full" src="../imgs/logo.svg" alt="떡잎마을 상점 로고" />
      </a></h1>
      <ul class="login">
        <li class="inline-block px-4"><a href="/login/">로그인</a></li>
        <li class="inline-block px-4"><a href="/sign/">회원가입</a></li>
        <li class="inline-block px-4 hidden"><a href="#">로그아웃</a></li>
        <li class="inline-block px-4 hidden"><a href="#">관리자</a></li>
        <li class="inline-block px-4 relative hidden">
          <a href="/userInfo/">
            <i class="fa-solid fa-user text-lg"></i>
          </a>
        </li>
        <li class="inline-block px-4 relative">
          <a href="/cart/">
            <i id="cartIcon" class="fa-solid fa-cart-shopping text-lg"></i>
            <span class="cartOn block w-4 h-4 bg-red rounded-full absolute top-[-2px] right-[5px] flex justify-center items-center text-xs text-white" >${cartNum}</span>
          </a>
        </li>
      </ul>
    </div>
    `;

document.querySelector("#footerWrap").innerHTML = `
<div id="footer" class="w-full h-[300px] border-t flex-col flex justify-center items-center relative">

      <div class="Scroll_top cursor-pointer border w-12 h-12 flex justify-center items-center rounded-full absolute top-[40px] right-[40px]">
        <i class="fa-solid fa-arrow-up"></i>
      </div>

      <ul class="link_list pb-10">
        <h3 class="hidden">떡잎마을 상점 정책 및 약관</h3>
        <li class="link_item inline-block"><a href="#" class="text-gray500 px-4">이용약관</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500 px-4">전자금융거래 이용약관</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500 px-4">개인정보처리방침</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500 px-4">안전거래 가이드</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500 px-4">고객센터</a></li>
      </ul>
      <div class="link_address">
        <h3 class="hidden">떡잎마을 상점</h3>
        <a href="#" class="inline-block text-gray400 text-sm"><img class="inline-block h-6 mr-[15px]" src="../imgs/f-logo.svg" alt="떡잎마을 상점 로고">Copyright © 2023. 떡잎마을 상점 All Rights Reserved.</a>
      </div>
    </div>`;

// 버튼 클릭시 최상단으로 스크롤
const scrollTopBtn = document.querySelector(".Scroll_top");

scrollTopBtn.addEventListener("click", () => {
  window.scroll({ top: 0, behavior: "smooth" });
});
