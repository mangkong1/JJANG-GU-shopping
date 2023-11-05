import "../style.css";
import "../index.css";

document.querySelector("#headerWrap").innerHTML = `
<div id="header" class="w-[1274px] h-[100px] flex mx-auto justify-between items-center">
      <h1 class="h-10"><a href="/">
        <img class="h-full" src="../imgs/logo.svg" alt="떡잎마을 상점 로고" />
      </a></h1>
      <ul class="login">
        <li class="inline-block"><a href="/login/">로그인</a></li>
        <li class="inline-block"><a href="#">회원가입</a></li>
        <li class="inline-block relative hidden">
          <a href="/userInfo/">
            <i class="fa-solid fa-user text-lg"></i>
          </a>
        </li>
        <li class="inline-block relative">
          <a href="/cart/">
            <i class="fa-solid fa-cart-shopping text-lg"></i>
            <span class="cartOn hidden block w-4 h-4 bg-red rounded-full absolute top-0 right-[-10px]" ></span>
          </a>
        </li>
      </ul>
    </div>
    `;

document.querySelector("#footerWrap").innerHTML = `
<div id="footer" class="w-full h-[300px] border-t flex-col flex justify-center items-center relative">

      <div class="Scroll_top cursor-pointer">
        <i class="fa-solid fa-arrow-up"></i>
      </div>

      <ul class="link_list pb-10">
        <h3 class="hidden">떡잎마을 상점 정책 및 약관</h3>
        <li class="link_item inline-block"><a href="#" class="text-gray500">이용약관</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500">전자금융거래 이용약관</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500">개인정보처리방침</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500">안전거래 가이드</a>|</li>
        <li class="link_item inline-block"><a href="#" class="text-gray500">고객센터</a></li>
      </ul>
      <div class="link_address">
        <h3 class="hidden">떡잎마을 상점</h3>
        <a href="#" class="inline-block text-gray400 text-sm"><img class="inline-block" src="../imgs/f-logo.svg" alt="떡잎마을 상점 로고">Copyright © 2023. 떡잎마을 상점 All Rights Reserved.</a>
      </div>
    </div>`;

// 버튼 클릭시 최상단으로 스크롤
const scrollTopBtn = document.querySelector(".Scroll_top");

scrollTopBtn.addEventListener("click", () => {
  window.scroll({ top: 0, behavior: "smooth" });
});
