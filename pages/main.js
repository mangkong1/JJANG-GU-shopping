

document.querySelector('#headerWrap').innerHTML = `
<div id="header" class="flex justify-between items-center m-auto m1270 w-4/6 h-24">
      <h1 class="h-10"><a href="/">
        <img class="h-full" src="./imgs/logo.svg" alt="떡잎마을 상점 로고" />
      </a></h1>
      <ul class="login">
        <li class="inline-block"><a href="#">로그인</a></li>
        <li class="inline-block pl-10"><a href="#">회원가입</a></li>
        <li class="inline-block pl-10 relative">
          <a href="#">
            <i class="fa-solid fa-cart-shopping text-lg"></i>
            <span class="block w-4 h-4 bg-red rounded-full absolute top-0 right-[-10px]" ></span>
          </a>
        </li>
      </ul>
    </div>
    `

document.querySelector('#footerWrap').innerHTML=`
<div id="footer" class="w-full flex-col flex justify-center items-center border-t border-gray400 h-72 relative">

      <div class="Scroll_top absolute top-10 right-10 w-12 h-12 rounded-full border border-gray500 flex justify-center items-center cursor-pointer">
        <i class="fa-solid fa-arrow-up text-xl test-gray500"></i>
      </div>

      <ul class="link_list pb-10">
        <h3 class="hidden">떡잎마을 상점 정책 및 약관</h3>
        <li class="link_item inline-block px-3 border-r-2 border-gray400"><a href="#" class="text-gray500">이용약관</a></li>
        <li class="link_item inline-block px-3 border-r-2 border-gray400"><a href="#" class="text-gray500">전자금융거래 이용약관</a></li>
        <li class="link_item inline-block px-3 border-r-2 border-gray400"><a href="#" class="text-gray500">개인정보처리방침</a></li>
        <li class="link_item inline-block px-3 border-r-2 border-gray400"><a href="#" class="text-gray500">안전거래 가이드</a></li>
        <li class="link_item inline-block px-3"><a href="#" class="text-gray500">고객센터</a></li>
      </ul>
      <div class="link_address">
        <h3 class="hidden">떡잎마을 상점</h3>
        <a href="#" class="inline-block text-gray400 text-sm"><img class="inline-block pr-3 h-6" src="./imgs/f-logo.svg" alt="">Copyright © 2023. 떡잎마을 상점 All Rights Reserved.</a>
      </div>
    </div>`




// 버튼 클릭시 최상단으로 스크롤
const scrollTopBtn = document.querySelector('.Scroll_top');

scrollTopBtn.addEventListener('click', () => {
    window.scroll({ top: 0, behavior: "smooth" });  
})
