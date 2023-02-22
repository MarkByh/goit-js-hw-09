import Notiflix from 'notiflix';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const StartBtn  = document.querySelector('[data-start]')
const valueElements = document.querySelectorAll('.value')
let timerId = null;

let chosenTime = 0;
let remainTime = {}
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    

    return { days, hours, minutes, seconds };
    
  }
 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        StartBtn.disabled = true;
      }
      if (selectedDates[0] > new Date()) {
        StartBtn.disabled = false;
        chosenTime = selectedDates[0].getTime();
        console.log(chosenTime);
      }
    },
  };
  StartBtn.addEventListener('click', countTimeUntill)
flatpickr('input#datetime-picker', options);

function countTimeUntill() {
    StartBtn.disabled = true;
    timerId = setInterval(() => {
         const date = new Date();
         let ms = chosenTime - date.getTime()  
         remainTime = convertMs(ms);
         console.log(remainTime);
         updateTimer(convertMs(ms));
      }, 1000);
}


function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }
  
  
  function updateTimer({ days, hours, minutes, seconds }) {
    valueElements[0].textContent = addLeadingZero(days);
    valueElements[1].textContent = addLeadingZero(hours);
    valueElements[2].textContent = addLeadingZero(minutes);
    valueElements[3].textContent = addLeadingZero(seconds);
}