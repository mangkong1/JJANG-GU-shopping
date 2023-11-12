import "../../index.css";

function validateForm(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("username").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("올바른 이메일 주소 형식이 아닙니다.");
    return false;
  }

  if (password.length < 5) {
    alert("비밀번호는 최소 5자 이상이어야 합니다.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("비밀번호와 비밀번호 확인란이 일치하지 않습니다.");
    return false;
  }

  // 유효성 검사 통과 시, 서버로 유저 정보 전송
  sendUserDataToServer({
    name,
    email,
    password,
    phone: "010-1234-5678", // input 추가
  });
}

function sendUserDataToServer(params) {
  // 유저 정보를 서버로 전송
  fetch("http://kdt-sw-7-team03.elicecoding.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...params,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json(); // JSON 데이터로 변환
      } else {
        throw new Error("서버 응답에 문제가 있습니다.");
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
      console.error("오류 발생:", error);
    });
}

document.getElementById("signIn").addEventListener("submit", validateForm);
