const container = document.querySelector('.container');
const registerBnt = document.querySelector('.register-bnt');
const loginBnt = document.querySelector('.login-bnt');

registerBnt.addEventListener('click', () => {
    container.classList.add('active');
});

loginBnt.addEventListener('click', () => {
    container.classList.remove('active');
});