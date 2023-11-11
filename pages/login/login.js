import '../../index.css';

const loginId = document.getElementById('loginId');
const loginPw = document.getElementById('loginPw');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
  const email = loginId.value;
  const password = loginPw.value;

  try {
    const response = await fetch('http://kdt-sw-7-team03.elicecoding.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공, 여기서 토큰을 저장하거나 다른 동작을 수행할 수 있습니다.
      console.log('로그인 성공:', data);
      alert("로그인에 성공하셨습니다!")
      window.location.href = '../index.html';
sessionStorage.setItem("data", JSON.stringify(data));
      
    } else {
      // 로그인 실패
      console.error('로그인 실패:', data.error);
      alert("아이디와 비밀번호를 확인해주세요")
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
});

