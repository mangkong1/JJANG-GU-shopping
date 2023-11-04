import "../../index.css";

document.querySelector("#mypage_menu").innerHTML = `<div class="userInfo_left">
<h2 class="text-4xl font-semibold pb-6">마이페이지</h2>
<div
  class="userInfo_list w-[236px] h-[532px] border border-gray200 rounded-2xl px-[25px] py-[36px] box-border"
>
  <ul>
    <li class="font-semibold text-2xl mb-[87px]">
      쇼핑 정보
      <ul class="mt-[10px]">
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >상품 등록</a
          >
        </li>
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >구매 내역</a
          >
        </li>
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >판매 내역</a
          >
        </li>
      </ul>
    </li>
    <li class="font-semibold text-2xl">
      내 정보
      <ul class="mt-[10px]">
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >프로필 정보</a
          >
        </li>
      </ul>
    </li>
  </ul>
</div>
</div>`;
