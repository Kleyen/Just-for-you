// --- Lock keypad logic ---
const correctCode = "030725";
let inputCode = "";
const codeDots = document.getElementById("codeDots");
const keypad = document.getElementById("keypad");

// Render dots for code
function renderDots() {
  codeDots.innerHTML = "";
  for (let i=0;i<6;i++) {
    let dot = document.createElement('div');
    dot.className = 'dot' + (i < inputCode.length ? ' active':'');
    codeDots.appendChild(dot);
  }
}
renderDots();

// Create keypad
const btnVals = [
  "1","2","3",
  "4","5","6",
  "7","8","9",
  "","0","⌫"
];
btnVals.forEach((val,i)=>{
  let btn = document.createElement("button");
  btn.className = "keypad-btn";
  if (val === "⌫") { btn.className += " back"; }
  btn.innerHTML = val;
  btn.onclick = ()=>{
    if (val === "⌫") {
      inputCode = inputCode.slice(0,-1);
    } else if (val !== "" && inputCode.length < 6) {
      inputCode += val;
    }
    renderDots();
    if (inputCode.length === 6) {
      if (inputCode === correctCode) {
        document.getElementById('lock').style.opacity='0';
        setTimeout(()=>{
          document.getElementById('lock').style.display='none';
          document.getElementById('content').style.display='block';
        },600);
      } else {
        // wrong code: shake animation + clear
        codeDots.style.animation = 'shake 0.3s';
        setTimeout(()=>{codeDots.style.animation = '';inputCode="";renderDots();},400);
      }
    }
  };
  keypad.appendChild(btn);
});
// Add shake CSS
const style = document.createElement('style');
style.innerHTML="@keyframes shake{0%{transform:translateX(0);}20%{transform:translateX(-8px);}40%{transform:translateX(8px);}60%{transform:translateX(-5px);}80%{transform:translateX(5px);}100%{transform:translateX(0);}}";
document.head.appendChild(style);

// --- Main message logic ---
function showMessage(){
  alert('Happy Monthsary my love! 💗 I’m so grateful for every moment we share, and I can’t wait for all the memories ahead. You mean the world to me! 💞');
}

// --- Monthsary calculation logic ---
function updateMonthsary(){
  const startDate = new Date(2025,2,7); // March 7, 2025
  const now = new Date();

  // Months passed, account for date
  let currentMonthsary = 0;
  let monthsaryDate = new Date(startDate);

  while (monthsaryDate <= now) {
    currentMonthsary++;
    monthsaryDate = new Date(startDate.getFullYear(), startDate.getMonth() + currentMonthsary, startDate.getDate());
  }
  // For count, subtract one unless exact date
  const displayMonths = currentMonthsary > 1 ? currentMonthsary - 1 : 0;
  document.getElementById('monthsCount').textContent = displayMonths + " Month" + (displayMonths !== 1 ? "s":"");

  // Next/current monthsary date formatted MM/DD/YYYY
  const nextMonthsary = new Date(startDate.getFullYear(), startDate.getMonth() + displayMonths, startDate.getDate());
  const formattedMonthsary = `${nextMonthsary.toLocaleString('default', { month: 'long' })} ${String(nextMonthsary.getDate()).padStart(2, '0')}, ${nextMonthsary.getFullYear()}`;
  document.getElementById('monthsaryDate').textContent = "Monthsary Date: " + formattedMonthsary;
}
updateMonthsary();

// --- Slideshow logic ---
const slides=document.querySelectorAll('.slide');
let index=0;
setInterval(()=>{
  slides[index].classList.remove('active');
  index=(index+1)%slides.length;
  slides[index].classList.add('active');
},4000);
