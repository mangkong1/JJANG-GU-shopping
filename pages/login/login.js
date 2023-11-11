// function color() {
//     if ((loginId.value.length>4 && loginId.value.indexOf("@")!==-1)
//              && loginPw.value.length>=8) {
//         loginBtn.style.backgroundColor = "#F13737";
//         loginBtn.disabled = false;
//     } else {
//         loginBtn.style.backgroundColor = "#F8C9C9";
//         loginBtn.disabled = true;
//     }
// }

// fetch('http://kdt-sw-7-team03.elicecoding.com/api/users/login', {
//     method : "POST",
//     headers : {
//         'Content-Type' : 'application/json',
//         'Accept' : 'application/json',
//     },
//     body: JSON.stringify({
//         email: loginId.value,  // 이 부분을 수정
//         password: loginPw.value
//     })
// })
// .then(res => res.json())
// .then(res => {
//     if(res.token){
//         sessionStorage.setItem("test-token", res.token)
//         alert("로그인에 성공했습니다!");
//         console.log(res)
//     }else{
//        alert("아이디나 비밀번호가 틀렸습니다.")
//     }})
//     .catch((error) => {
//         console.error('오류 발생:', error);
//         if (error.response) {
//             console.error('서버 응답:', error.response.data);
//         }
//     });
// loginId.addEventListener('keyup', color);
// loginPw.addEventListener('keyup', color);
// document.getElementById("loginForm").addEventListener("submit");

// 3차

//   fetch('http://kdt-sw-7-team03.elicecoding.com/api/users/login',{

//     method : "POST",
//     headers : {
//         'Content-Type' : 'application/json',
//         'Accept' : 'application/json',
//     },
//     body: JSON.stringify({
//         email,   // 이 부분을 수정
//         password
//     })
// })
// const { email, password } = req.body;
// try {
// const user = await User.findOne({ email, password });

//       // 사용자가 존재하고 비밀번호가 일치할 경우 토큰을 생성하여 응답
//       if (user) {
//         // 토큰 생성 및 응답
//         // (이 부분은 사용하는 인증 방식에 따라 다를 수 있습니다.)
//         res.json({ token: generateToken(user) });
//       } else {
//         // 사용자가 존재하지 않거나 비밀번호가 일치하지 않을 경우 에러 응답
//         res.status(400).json({ error: 'Invalid credentials' });
//       }
//     }catch (error) {
//       console.error('오류 발생:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }

import "../../index.css";

const loginId = document.getElementById("loginId");
const loginPw = document.getElementById("loginPw");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = loginId.value;
  const password = loginPw.value;

  try {
    const response = await fetch(
      "http://kdt-sw-7-team03.elicecoding.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공, 여기서 토큰을 저장하거나 다른 동작을 수행할 수 있습니다.
      console.log("로그인 성공:", data);
      alert("로그인에 성공하셨습니다!");

      //   window.location.href = '../index.html';
    } else {
      // 로그인 실패
      console.error("로그인 실패:", data.error);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
});
