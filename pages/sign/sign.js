import "../../index.css"

// 이전 ver
// function validateForm() {
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;
//   var confirmPassword = document.getElementById("confirmPassword").value;
//   var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailRegex.test(email)) {
//     alert("올바른 이메일 주소 형식이 아닙니다.");
//     return false;
//   }

//   if (password.length < 8) {
//     alert("비밀번호는 최소 8자 이상이어야 합니다.");
//     return false;
//   }

//   if (password !== confirmPassword) {
//     alert("비밀번호와 비밀번호 확인란이 일치하지 않습니다.");
//     return false;
//   }

//   alert("회원가입을 축하합니다!");
//   return true;
  
// };
// document.getElementById("signIn").addEventListener("click", validateForm);


function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("올바른 이메일 주소 형식이 아닙니다.");
        return false;
    }

    if (password.length < 8) {
        alert("비밀번호는 최소 8자 이상이어야 합니다.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("비밀번호와 비밀번호 확인란이 일치하지 않습니다.");
        return false;
    }

    // 유효성 검사 통과 시, 서버로 유저 정보 전송
    sendUserDataToServer(email, password);

    return true;
}

function sendUserDataToServer(email, password) {
    // 유저 정보를 서버로 전송
    fetch("http://kdt-sw-7-team03.elicecoding.com/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // JSON 데이터로 변환
        } else {
            throw new Error('서버 응답에 문제가 있습니다.');
        }
    })
    .then((data) => {
        if (data) {
            // 서버 응답 처리 (예: 회원가입 완료 메시지 표시)
            alert("회원가입을 축하합니다!!");
        } else {
            alert("서버 응답에 데이터가 없습니다.");
        }
    })
    .catch((error) => {
        console.error('오류 발생:', error);
    });
}

document.getElementById("signIn").addEventListener("click", validateForm);



// const data = {
//     fullName: "튜터",
//     email: "tutor-sw2@elice.com",
//     password: "abc123"
// }
// const dataJson = JSON.stringify(data)

// const res = await fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: dataJson,
// });

// console.log("api 통신이 문제 없이 잘 이루어졌는지: ", res.ok)  // true 혹은 false
// console.log("응답 코드: ", res.status)

// fetch(`http://kdt-sw-7-team03.elicecoding.com/api/users`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(data)
// })
// .then((res) => {
//   if (res.status === 201) {
//     // 회원가입 성공
//     return res.json(); // 응답 데이터를 JSON으로 파싱
//   } else if (res.status === 400) {
//     // 클라이언트 오류 (예: 입력 데이터 유효성 검사 실패)
//     alert("입력 데이터가 유효하지 않습니다.");
//   } else {
//     // 다른 상태 코드에 대한 오류 처리
//     alert("서버 응답에 문제가 있습니다.");
//   }
// })
// .then((data) => {
//   if (data) {
//     alert("회원가입을 축하합니다!!");
//   }
// })
// .catch((err) => {
//   console.error('오류 발생:', err);
// });
