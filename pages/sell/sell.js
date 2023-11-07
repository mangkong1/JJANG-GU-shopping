const modifyBtn = document.querySelector(".modifyBtn");
const modifyCheckPopup = document.querySelector("#modifyCheckPopup");
const popupBg = document.querySelector(".popupBg");

modifyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  modifyCheckPopup.classList.remove("hidden");
  popupBg.classList.remove("hidden");
  window.scroll({ top: 0, behavior: "smooth" });
});

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
