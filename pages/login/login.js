import "../../index.css";

("use strict");

const loginId = document.getElementById("loginId");
const loginPw = document.getElementById("loginPw");
const loginBtn = document.getElementById("loginBtn");
// var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// var email = document.getElementById("LOGIN_ID").value;

// !emailRegex.test(email){
//     alert("올바른 이메일 주소 형식이 아닙니다.");
//     return false;
//   }

function color() {
  if (
    loginId.value.length > 5 &&
    loginId.value.indexOf("@") !== -1 &&
    loginPw.value.length >= 8
  ) {
    loginBtn.style.backgroundColor = "#F13737";
    loginBtn.disabled = false;
  } else {
    loginBtn.style.backgroundColor = "#F8C9C9";
    loginBtn.disabled = true;
  }
}

function moveToMain() {
  location.replace("../index.html");
}

loginId.addEventListener("keyup", color);
loginPw.addEventListener("keyup", color);
loginBtn.addEventListener("click", moveToMain);
