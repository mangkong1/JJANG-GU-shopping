import "../../index.css";

const categoryUpdateBtn = document.querySelector(".categoryUpdateBtn");
const categoryDelBtn = document.querySelector(".categoryDelBtn");
const categoryAddBtn = document.querySelector(".categoryAddBtn");

categoryAddBtn.addEventListener("click", () => {
  alert("카테고리가 추가되었습니다.");
});

categoryDelBtn.addEventListener("click", () => {
  confirm("카테고리를 삭제하시겠습니까?");
});

categoryUpdateBtn.addEventListener("click", () => {
  confirm("카테고리를 수정하시겠습니까?");
});
