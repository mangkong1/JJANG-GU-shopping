import '../../index.css';

// 아이콘 변경 버튼 클릭
const userThumbChangeBtn = document.querySelector('.user_thumb_btn');
const userThumbOtherList = document.querySelector('.user_thumb_other');

userThumbChangeBtn.addEventListener('click', () => {
    userThumbOtherList.classList.remove('hidden');
})


// 수정하기 버튼 클릭
const modifyBtn = document.querySelector('.modify_btn');
const modifyCheckPopup = document.querySelector('#modifyCheck_popup');

modifyBtn.addEventListener('click', () => {
    modifyCheckPopup.classList.remove('hidden');
    window.scroll({ top: 0, behavior: 'smooth' });
})