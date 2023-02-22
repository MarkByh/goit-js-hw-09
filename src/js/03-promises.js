import { Notify } from 'notiflix/build/notiflix-notify-aio';
const subForm = document.querySelector('form');
const firstDelay = document.querySelector('input[name=delay]');
const delayStep = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]')

subForm.addEventListener('submit', onSubmit)


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 return  new Promise((resolve, reject) => {
    setTimeout(() => {
       if (shouldResolve) {
  resolve ({position, delay});
  } else {
   reject({position, delay});
  }
    }, delay);
  }); 
}


function onSubmit(e) {
  e.preventDefault();
  for (let i = 0; i < amount.value; i++) {
    let position = i+1;
    let delay =  Number(firstDelay.value)+ Number(delayStep.value)*i;
    console.log(delay);
    createPromise(position , delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}



