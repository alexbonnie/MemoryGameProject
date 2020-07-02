// введите своё имя
let userName = document.createElement('div');
userName.setAttribute('id', 'userName');

let p = "<p>P.S. Don't forget to enter your name!<br/>&dArr;</p>";
let input = '<input type="text" placeholder="Enter your name" size="25">'
let submitBtn = '<button id="btn" disabled>Save!</button>';

userName.innerHTML = p;
userName.innerHTML += input;
userName.innerHTML += submitBtn;

let main = document.getElementById('main');
main.after(userName);

let userInfo = document.querySelector('input');
//
let submit = document.getElementById('btn');



userInfo.addEventListener('input', function() {
    (userInfo.value) ? submit.removeAttribute('disabled') : submit.setAttribute('disabled', true);
});

submit.addEventListener('click', function(){
    let userScore = {
        "userName": userInfo.value,
        "score": null,
    }
    window.localStorage.setItem('userScore', JSON.stringify(userScore));
    userName.style.cssText = 'display: none';
let mainBtn = document.getElementById('mainBtn');
mainBtn.removeAttribute('disabled');

});



