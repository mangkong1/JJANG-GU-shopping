import "../../index.css";

// 추가, 수정, 삭제 버튼 클릭 시
const categoryUpdateBtn = document.querySelector(".categoryUpdateBtn");
const categoryDelBtn = document.querySelector(".categoryDelBtn");
const categoryAddBtn = document.querySelector(".categoryAddBtn");

categoryAddBtn.addEventListener("click", () => {
  const categoryNum = document.querySelector(".categoryNum");
  const categoryName = document.querySelector(".categoryName");

  if (categoryNum.value === "") {
    alert("번호를 입력해주세요.");
  }

  if (categoryName.value === "") {
    alert("카테고리명을 입력해주세요.");
  }

  if (categoryNum.value !== "" && categoryName.value !== "") {
    alert("카테고리가 추가되었습니다.");

    categoryNum.value = "";
    categoryName.value = "";
  }
});

categoryDelBtn.addEventListener("click", () => {
  confirm("카테고리를 삭제하시겠습니까?");
});

categoryUpdateBtn.addEventListener("click", () => {
  confirm("카테고리를 수정하시겠습니까?");
});

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
            >상품 관리</a
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
