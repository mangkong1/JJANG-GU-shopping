import "../../index.css";

// 아이콘 변경 버튼 클릭
const userThumbChangeBtn = document.querySelector(".user_thumb_btn");
const userThumbOtherList = document.querySelector(".user_thumb_other");

userThumbChangeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  userThumbOtherList.classList.toggle("hidden");
});

// 캐릭터 이미지 클릭시 변경
const userThumb = document.querySelector(".user_thumb>img");
const otherThumbs = document.querySelectorAll(".user_thumb_other div");
const otherThumbList = Array.from(otherThumbs);

otherThumbList.map((list) => {
  list.addEventListener("click", (img) => {
    const otherImgSrc = img.srcElement.src;

    userThumb.src = otherImgSrc;
  });
});

// 수정하기 버튼 클릭
const modifyBtn = document.querySelector(".modify_btn");
const modifyCheckPopup = document.querySelector("#modifyCheck_popup");
const popupBg = document.querySelector(".popup_bg");

modifyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  modifyCheckPopup.classList.remove("hidden");
  popupBg.classList.remove("hidden");
  window.scroll({ top: 0, behavior: "smooth" });
});

// 뒤로가기, 수정하기(팝업창) 버튼 클릭
const popupBtnBack = document.querySelector(".popup_btns button:first-child");
const popupBtnChange = document.querySelector(".popup_btns button:last-child");

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
