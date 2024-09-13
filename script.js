console.clear();
let arr = [
  "Перший президент України",
  "Яке місто відоме своїми фонтанами",
  "Художник-авангардист, засновник супрематизму, один з фундаторів кубофутуризму, що народився в Києві",
  "Перший космонавт в історії незалежної України",
  "Яка область в Україні найбільша за площею", "В якому обласному центрі проживає 243 тисячі осіб?", "Гербом якої області є срібний хрест на червоному щиті?", "Хто написав музику до гімну України?","Хто написав вірш 'Любіть Україну'?"
];
let arr2 = ["кравчук", "вінниця", "малевич", "каденюк", "одеська", "рівне", "волинська","вербицький", "сосюра"];

const q = document.querySelector(".q");
const a = document.querySelector(".box1");
let level = document.querySelector(".level");
let error = document.querySelector(".error");
const maxErrors = 3;
let wordLength = 0;
let random = 0;
let openLetters = undefined;
const letters = document.querySelectorAll(".a");

let currentLevel = 1;
let errorCount = 0;

function updateLevel() {
  currentLevel++;
  level.textContent = "рівень: " + currentLevel;
}

function updateErrorCount() {
  errorCount++;
  error.textContent = "помилки: " + errorCount;

  if (errorCount >= maxErrors) {
    alert("Максимальна кількість помилок досягнута. Спробуйте ще раз.");
    // Очищення попереднього раунду
    removeItem(arr, random);
    removeItem(arr2, random);
    errorCount = 0;
    error.textContent = "помилки: 0";
    startRound(arr, arr2); // Починаємо новий раунд
  }
}

letters.forEach((letter) => {
  letter.addEventListener("click", function () {
    const clickedLetter = this.textContent;
    let letterFound = false;

    for (let i = 0; i < arr2[random].length; i++) {
      if (arr2[random][i] === clickedLetter) {
        openLetters[i].textContent = clickedLetter;
        letterFound = true;
      }
    }

    if (letterFound) {
      if (Array.from(openLetters).every((item) => item.textContent != "")) {
        setTimeout(() => {
          alert("Слово відгадано! Переходьте до наступного рівня.");
          removeItem(arr, random);
          removeItem(arr2, random);

          updateLevel();
          errorCount = 0;
          error.textContent = "помилки: 0";
          startRound(arr, arr2); // Починаємо новий раунд
        }, 100);
      }
    } else {
      updateErrorCount();
    }
  });
});

function getRandomWord(arr) {
  return Math.trunc(Math.random() * arr.length);
}

// запуск 1 раунду
startRound(arr, arr2);

function startRound(questions, answers) {
  random = getRandomWord(arr2);
  q.textContent = arr[random];
  for (let i = 0; i < wordLength; i++) {
    a.removeChild(a.firstChild);
  }
  wordLength = arr2[random].length;
  for (let i = 0; i < arr2[random].length; i++) {
    let el = document.createElement("p");
    a.appendChild(el);
  }
  openLetters = document.querySelectorAll("p");
  errorCount = 0;
  error.textContent = "помилки: 0";
}

function removeItem(arr, index) {
  return arr.splice(index, 1);
}
