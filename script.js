const inputSlider = document.querySelector(".slider");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbol = '`~!@#$%^^&*()-_+=}{][|"";.,';
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0 0 12px 2px ${color}`;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 10);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbol.length);
  return symbol.charAt(randNum);
}
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numberCheck.checked) hasNum = true;
  if (symbolCheck.checked) hasSym = true;
  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 3000);
}
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});
function shufflePassword(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
  }
  let str="";
  array.forEach((el)=>(str+=el));
  return str;
}
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});
function handleCheckBoxSlider() {
  checkCount = 0;
  allCheckBox.forEach((checkBox) => {
    if (checkBox.checked) checkCount++;
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
  }
}
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) return;

if (passwordLength < checkCount) {
  passwordLength = checkCount;
  handleSlider();
}
password = "";
// if (uppercaseCheck.checked) {
//   password += generateUpperCase();
// }
// if (lowercaseCheck.checked) {
//   password += generateLowerCase();
// }
// if (symbolCheck.checked) {
//   password += generateSymbol();
// }
// if (numberCheck.checked) {
//   password += generateRandomNumber();
// }


let functArr=[];
if(uppercaseCheck.checked)
  functArr.push(generateUpperCase);
if(lowercaseCheck.checked)
  functArr.push(generateLowerCase);
if(numberCheck.checked)
  functArr.push(generateRandomNumber)
if(symbolCheck.checked)
  functArr.push(generateSymbol)

for(let i=0;i<functArr.length;i++){
  password+=functArr[i]();
}
for(let i=0;i<passwordLength-functArr.length;i++){
  let randIndex=getRndInteger(0,functArr.length);
  password+=functArr[randIndex]();
}
password=shufflePassword(Array.from(password));
passwordDisplay.value=password;
calcStrength();
});