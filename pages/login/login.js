import '../../index.css';

"use strict";

const loginId = document.getElementById('loginId');
const loginPw = document.getElementById('loginPw');
const loginBtn = document.getElementById('loginBtn');

// fetch('/users/login', {
//     method : "POST",
//     headers : {
//         'Content-Type' : 'application/json',
//         'Accept' : 'application/json',
//     },
//     body : JSON.stringify({
//         username : id,
//         password : pwd,
//     })
// })
// .then(res => res.json())
// .then(res => {
//     if(res.token){
//         localStorage.setItem("test-token", res.token)
//     }else{
//         window.alert(res.msg)
//     }}
// )

const dummyUsers = [
	{
		
		"email": "sem@aol.couk",
		"Password": "8685145"
	},
	{
		
		"email": "a.feugiat@aol.com",
		"Password": "84843204"
	},
	{
		
		"email": "tincidunt.nibh.phasellus@outlook.ca",
		"Password": "88237299"
	},
	{
		
		"email": "sed.molestie@icloud.ca",
		"Password": "11267327"
	},
	{
		
		"email": "dis.parturient@google.edu",
		"Password": "88038973"
	}
];

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     // const username = document.getElementById('username').value;
//     // const password = document.getElementById('password').value;

//     // 더미 데이터와 비교
//     const user = dummyUsers.find((user) => (user.email === loginId) && user.password === loginPw);

//     if (user) {
//         // 로그인 성공 시
//         window.location.href = 'index.html';
//     } else {
//         document.getElementById('error-message').textContent = '잘못된 사용자명 또는 패스워드입니다.';
//     }
// });




// function color() {
//     if((loginId.value.length>5 && loginId.value.indexOf("@")!==-1) 
//         && loginPw.value.length>=8){
//         loginBtn.style.backgroundColor = "#F13737";
//         loginBtn.disabled = false;
//     }else{
        
//         loginBtn.style.backgroundColor = "#F8C9C9";
//         loginBtn.disabled = true;
//     }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email1 = loginId.value; // 사용자가 입력한 이메일
    const password1 = loginPw.value; // 사용자가 입력한 비밀번호

    // 더미 데이터와 비교
    const user = dummyUsers.find((user) => (user.email === email1) && user.Password === password1);

    if (user) {
        // 로그인 성공 시
        alert("로그인에 성공하였습니다.")
        window.location.href = '../index.html';
    } else {
        alert('잘못된 이메일 또는 패스워드입니다.');
    }
});

function color() {
    if ((loginId.value.length>5 && loginId.value.indexOf("@")!==-1) 
             && loginPw.value.length>=8) {
        loginBtn.style.backgroundColor = "#F13737";
        loginBtn.disabled = false;
    } else {
        loginBtn.style.backgroundColor = "#F8C9C9";
        loginBtn.disabled = true;
    }
}
    //fetch 부분 백엔드랑 소통하면서 다시 고치기
//     fetch('/users/login', {
//         method : "POST",
//         headers : {
//             'Content-Type' : 'application/json',
//             'Accept' : 'application/json',
//         },
//         body : JSON.stringify({
//             username : id,
//             password : pwd,
//         })
//     })
//     .then(res => res.json())
//     .then(res => {
//         if(res.token){
//             localStorage.setItem("test-token", res.token)
//         }else{
//             window.alert(res.msg)
//         }}
//     )
    
// }

// function moveToMain(){
//     location.replace("../index.html");
// }

loginId.addEventListener('keyup', color);
loginPw.addEventListener('keyup', color);
// loginBtn.addEventListener('click',moveToMain);