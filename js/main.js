function StartGame() {
  document.getElementById('initScreen').hidden = true;
  let playableBlock = new Block();
  playableBlock.Refresh();
  let score = 0;
  let timerInterval = setInterval(TimerFunc, 1000)
  let clickInt = setInterval(Click, 500)
  document.getElementById('score').innerText = score;


  function ClearLevel() {
    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < 24; j++) {
        document.getElementById('' + j + ',' + i).style.backgroundColor = 'rgb(179, 212, 252)';
      }
    }
  }

  function TimerFunc() {
    let timing = document.getElementById('ti');
    if (parseInt(timing.innerText) > 0) {
      timing.innerText--;
    } else {
      clearInterval(timerInterval);
      clearInterval(clickInt);
      removeEventListener("keydown", Controls);
      document.getElementById('endgameWindow').open = true;
      document.getElementById('endgameWindow').hidden = false;
    }
  }

  function Click() {
    playableBlock.Clean();
    playableBlock.GetDown();
    playableBlock.Refresh();
    if (playableBlock.CheckDown()) {
      console.log('Lenght of landed block:' + playableBlock.lenght)

      if (playableBlock.lenght === 1) {
        console.log('Checking of pyramid is started');
        playableBlock = new Block();
        let nickname = document.getElementById('nicknameInput').value;

        if (CheckPiramyd()) {
          console.log('Pyramid is determined');
          score = score + GetCountOfBlocks();
        } else {
          console.log('Pyramid is NOT determined');
          score = score - GetCountOfBlocks();
        }
        document.getElementById('score').innerText = score;
        if (Users[ITERATOR].score < score) {
          Users[ITERATOR].score = score;
          setCookie('users', JSON.stringify(Users));
        }
        ClearLevel();
      }
      playableBlock = new Block();
    }
  }

  function Controls(e) {
    playableBlock.Clean();
    switch (e.key) {
      case "ArrowLeft":  // если нажата клавиша влево
        playableBlock.GoLeft();
        break;
      case "ArrowRight":   // если нажата клавиша вправо
        if (!playableBlock.GoRight()) {
          playableBlock = new Block();
        }
        break;
      case "ArrowDown": // если нажата клавиша вниз
        Click();
    }
    playableBlock.Refresh();
  }

  addEventListener("keydown", Controls);

  function CheckPiramyd() {
    return CheckPiramydFromLeft(DetectFundationFromLeft())[0] === CheckPiramydFromRight(DetectFundationFromRight())[0]
      && CheckPiramydFromLeft(DetectFundationFromLeft())[1] === CheckPiramydFromRight(DetectFundationFromRight())[1];
  }

  function CheckPiramydFromLeft(x) {
    let xpointer = x;
    let ypointer = 23;

    console.log('' + ypointer + ',' + xpointer)

    while (document.getElementById('' + ypointer + ',' + xpointer).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + ypointer + ',' + (xpointer + 1)).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + (ypointer - 1) + ',' + (xpointer)).style.backgroundColor === 'rgb(179, 212, 252)') {
      xpointer++;
      ypointer--;
    }
    return [xpointer, ypointer];
  }

  function CheckPiramydFromRight(x) {
    let xpointer = x;
    let ypointer = 23;
    while (document.getElementById('' + ypointer + ',' + xpointer).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + ypointer + ',' + (xpointer - 1)).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + (ypointer - 1) + ',' + (xpointer)).style.backgroundColor === 'rgb(179, 212, 252)') {
      xpointer--;
      ypointer--;
    }
    return [xpointer, ypointer];
  }

  function DetectFundationFromLeft() {
    for (let i = 0; i < 24; i++) {
      if (document.getElementById('' + 23 + ',' + i).style.backgroundColor !== 'rgb(179, 212, 252)') {
        return i;
      }
    }
    return 0;
  }

  function DetectFundationFromRight() {
    for (let i = 23; i > 0; i--) {
      if (document.getElementById('' + 23 + ',' + i).style.backgroundColor !== 'rgb(179, 212, 252)') {
        return i;
      }
    }
    return 23;
  }

}

function GetCountOfBlocks() {
  const parent = document.getElementById('gameField');
  let count = -24;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].style.backgroundColor !== 'rgb(179, 212, 252)') {
      count++;
    }
  }
  return count;
}

function StartAnonymGame(){
  let nickname = 'Anonym';
  let password = 'Anonym';
  if (GetUser(JSON.parse(getCookie('users')), nickname)===undefined){
    let newUser = new User(nickname, password);
    Users.push(newUser);
    setCookie('users', JSON.stringify(Users));
    fitAboutUsers();
    console.log(JSON.parse(getCookie('users')));
  }

  StartGame();
}
