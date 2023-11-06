import "../../index.css";

// 아이콘 변경 버튼 클릭
const userThumbChangeBtn = document.querySelector(".userThumbBtn");
const userThumbOtherList = document.querySelector(".userThumbOther");

userThumbChangeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  userThumbOtherList.classList.toggle("hidden");
});

// 캐릭터 이미지 클릭시 변경
const userThumb = document.querySelector(".userThumb>img");
const otherThumbs = document.querySelectorAll(".userThumbOther div");
const otherThumbList = Array.from(otherThumbs);

otherThumbList.map((list) => {
  list.addEventListener("click", (img) => {
    const otherImgSrc = img.srcElement.src;

    userThumb.src = otherImgSrc;
  });
});

// 수정하기 버튼 클릭
const modifyBtn = document.querySelector(".modifyBtn");
const modifyCheckPopup = document.querySelector("#modifyCheckPopup");
const popupBg = document.querySelector(".popupBg");

modifyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  modifyCheckPopup.classList.remove("hidden");
  popupBg.classList.remove("hidden");
  window.scroll({ top: 0, behavior: "smooth" });
});

// 뒤로가기, 수정하기(팝업창) 버튼 클릭
const popupBtnBack = document.querySelector(".popupBtns button:first-child");
const popupBtnChange = document.querySelector(".popupBtns button:last-child");

function hiddenPopup() {
  modifyCheckPopup.classList.add("hidden");
  popupBg.classList.add("hidden");
  userThumbOtherList.classList.add("hidden");
}

popupBtnBack.addEventListener("click", () => {
  hiddenPopup();
  userThumb.src = "../../imgs/맹구.jpg";
});
popupBtnChange.addEventListener("click", () => {
  hiddenPopup();
  alert("수정이 완료되었습니다!");
});
