import "../../index.css";

const inputItem = document.getElementById("inputItem");
const showItem = document.getElementById("showItem");

inputItem.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    showItem.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

const inputInfo = document.getElementById("inputInfo");
const showInfo = document.getElementById("showInfo");

inputInfo.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    showInfo.src = e.target.result;
  };

  reader.readAsDataURL(file);
});
