import "../../index.css";

// 관리자페이지
document.querySelector("#adminList").innerHTML = `<div id="adminPageLeft">
<a href="/admin-info/" class="block text-4xl font-semibold pb-6">관리자 페이지</a>
<div
  class="userInfoList w-[236px] h-[528px] border border-gray200 rounded-2xl px-[25px] py-[36px] box-border"
>
  <ul>
    <li class="font-semibold text-2xl mb-[87px]">
      상품
      <ul class="mt-[10px]">
        <li>
          <a class="productListBtn text-xl font-normal text-gray400" href="/sell/"
            >상품 목록</a
          >
        </li>
        <li>
          <a class="addProductBtn text-xl font-normal text-gray400" href="/register/"
            >상품 추가</a
          >
        </li>
      </ul>
    </li>
    <li class="font-semibold text-2xl mb-[87px]">
      배송
      <ul class="mt-[10px]">
        <li>
          <a class="shipBtn text-xl font-normal text-gray400" href="/admin-ship/"
            >배송 관리</a
          >
        </li>
      </ul>
    </li>
    <li class="font-semibold text-2xl">
      카테고리
      <ul class="mt-[10px]">
        <li>
          <a class="categoryBtn text-xl font-normal text-gray400" href="/admin-category/"
            >카테고리 관리</a
          >
        </li>
      </ul>
    </li>
  </ul>
</div>
</div>`;

// location.href로 현재 페이지에 따라 해당 글자 색상, 굵기 변경
const productListBtn = document.querySelector(".productListBtn");
const addProductBtn = document.querySelector(".addProductBtn");
const shipBtn = document.querySelector(".shipBtn");
const categoryBtn = document.querySelector(".categoryBtn");

if (location.href.indexOf("http://localhost:8080/sell/") > -1) {
  productListBtn.classList.add("text-black");
  productListBtn.classList.add("font-semibold");
  productListBtn.classList.remove("text-gray400");
  productListBtn.classList.remove("font-normal");
}

if (location.href.indexOf("http://localhost:8080/register/") > -1) {
  addProductBtn.classList.add("text-black");
  addProductBtn.classList.add("font-semibold");
  addProductBtn.classList.remove("text-gray400");
  addProductBtn.classList.remove("font-normal");
}

if (location.href.indexOf("http://localhost:8080/admin-ship/") > -1) {
  shipBtn.classList.add("text-black");
  shipBtn.classList.add("font-semibold");
  shipBtn.classList.remove("text-gray400");
  shipBtn.classList.remove("font-normal");
}

if (location.href.indexOf("http://localhost:8080/admin-category/") > -1) {
  categoryBtn.classList.add("text-black");
  categoryBtn.classList.add("font-semibold");
  categoryBtn.classList.remove("text-gray400");
  categoryBtn.classList.remove("font-normal");
}
