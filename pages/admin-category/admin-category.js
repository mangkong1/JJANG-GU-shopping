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
