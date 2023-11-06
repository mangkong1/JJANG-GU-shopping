import "../../index.css";

// 관리자페이지 모듈
document.querySelector("#adminList").innerHTML = `<div id="adminPageLeft">
<h2 class="text-4xl font-semibold pb-6">관리자 페이지</h2>
<div
  class="userInfoList w-[236px] h-[528px] border border-gray200 rounded-2xl px-[25px] py-[36px] box-border"
>
  <ul>
    <li class="font-semibold text-2xl mb-[87px]">
      상품
      <ul class="mt-[10px]">
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >상품 목록</a
          >
        </li>
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >상품 추가</a
          >
        </li>
      </ul>
    </li>
    <li class="font-semibold text-2xl mb-[87px]">
      배송
      <ul class="mt-[10px]">
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >배송 관리</a
          >
        </li>
      </ul>
    </li>
    <li class="font-semibold text-2xl">
      카테고리
      <ul class="mt-[10px]">
        <li>
          <a class="text-xl font-normal text-gray400" href=""
            >카테고리 관리</a
          >
        </li>
      </ul>
    </li>
  </ul>
</div>
</div>`;

// 추가, 수정, 삭제 버튼 클릭 시
const categoryUpdateBtn = document.querySelector(".categoryUpdateBtn");
const categoryDelBtn = document.querySelector(".categoryDelBtn");
const categoryAddBtn = document.querySelector(".categoryAddBtn");

categoryAddBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const categoryName = document.querySelector(".categoryName");

  if (categoryName.value === "") {
    alert("카테고리명을 입력해주세요.");
  } else {
    alert("카테고리가 추가되었습니다.");

    categoryName.value = "";
  }
});

categoryDelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (confirm("카테고리를 삭제하시겠습니까?")) {
    const category = e.target.parentElement;
    category.classList.add("hidden");
  }
});

categoryUpdateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  confirm("카테고리를 수정하시겠습니까?");
});
