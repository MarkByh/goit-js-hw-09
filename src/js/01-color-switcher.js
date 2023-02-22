const startBtn = document.querySelector('button[data-start]')
const stoptBtn = document.querySelector('button[data-stop]')
const body = document.body;
let timerId = null;
stoptBtn.disabled = true;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

const onStartClick = () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        startBtn.disabled = true;
        stoptBtn.disabled = false;
    }, 1000);

  };
  
function onStopClick () {
    startBtn.disabled = false;
    clearInterval(timerId);
    stoptBtn.disabled = true;
};

stoptBtn.addEventListener("click",onStopClick )
startBtn.addEventListener('click', onStartClick);
