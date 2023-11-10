import '../../index.css';

"use strict";


function checkValidation() {
    const loginId = document.getElementById("loginId").value;
    const loginPw = document.getElementById("loginPw").value;
    const loginBtn= document.getElementById("loginBtn").value;

    fetch("http://kdt-sw-7-team03.elicecoding.com/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            account: loginId,
            password: loginPw,
        }),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('서버 응답에 문제가 있습니다.');
        }
    })
    .then((data) => {
        if (data.access_token) {
            sessionStorage.setItem("access_token", data.access_token);
            alert("환영합니다");
            window.location.href = "./index.html";
        } else {
            alert("유효한 응답이 없습니다.");
        }
    })
    .catch((error) => {
        console.error('오류 발생:', error);
    });
}

document.getElementById("loginBtn").addEventListener("click", checkValidation);


// checkValidation = () => {
//     const { loginId, loginPw } = this.state;
//     fetch("http://kdt-sw-7-team03.elicecoding.com/users/login", {
//       method: "POST",
//       	body: JSON.stringify({
//         account: loginId,
//         password: loginPw,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (res.access_token) {
//             sessionStorage.setItem("access_token", res.access_token);
//             alert("환영합니다");
//             this.props.history.push("./index.html");
//           }
//       });
//   };

//   loginBtn.addEventListener(checkValidation);