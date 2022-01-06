console.log(document.cookie);
count = 0;

deleteCookie('username');
deleteCookie('userscore');

fitAboutUsers();

function fitAboutUsers(){
  document.getElementById('aboutUsers').innerText=document.cookie;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

function SignIn(){
  const nickname = document.getElementById('nicknameInput').value;
  const password = document.getElementById('passwordInput').value;
  if (nickname.length*password.length!==0){
    document.cookie = encodeURIComponent(nickname)+'='+encodeURIComponent(password);
    document.location.reload();
  }
}

function CheckNickname(){
  if (getCookie(document.getElementById('nicknameInput').value)!==undefined){
    document.getElementById('signinInput').disabled=true;
  }
  else {
    document.getElementById('signinInput').disabled=false;
  }
}

function LogIn(){
  const nickname = document.getElementById('nicknameInput').value;
  const password = document.getElementById('passwordInput').value;
  if (password===getCookie(nickname)){
    document.getElementById('continueInput').disabled=false;
    setCookie('username', nickname);
    setCookie('userscore', 0);
  }
  else {
    document.getElementById('continueInput').disabled=true;
  }
}
