// script.js

const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ["transmitir a alma através das lentes.", " decifrar as nuances emocionais através da arte audiovisual.", "expressar a profundidade da experiência humana."]; 
const typingDelay = 100; // Delay entre cada caractere digitado
const erasingDelay = 50; // Delay entre cada caractere apagado
const newTextDelay = 2000; // Delay antes de iniciar a digitação de uma nova frase
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});



// Função para atualizar a barra de progresso e o texto de progresso
function updateProgressBar(progress) {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  progressBar.style.width = progress + '%';
  progressText.textContent = 'Loading... ' + progress + '%';
}

// Função para animar a barra de progresso somente quando ela estiver visível na tela
function animateProgressBar() {
  let progressValue = 0;
  const progressInterval = setInterval(() => {
    progressValue += 5;
    updateProgressBar(progressValue);
    if (progressValue >= 80) {
      clearInterval(progressInterval);
      progressValue = 80;
      updateProgressBar(progressValue);
    }
  }, 1000);
}

// Utilizando Intersection Observer para detectar quando a barra de progresso está visível
const progressBar = document.getElementById('progress-bar');
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Defina um valor entre 0 e 1 para controlar quando a animação deve iniciar
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBar();
      observer.unobserve(progressBar); // Uma vez que a barra de progresso está visível, podemos parar de observá-la
    }
  });
}, options);

observer.observe(progressBar);














