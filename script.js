// ===== CORAZONES FLOTANTES DE FONDO =====
const corazonesContenedor = document.getElementById('corazones');
const emojisCorazon = ['💖', '💕', '💗', '❤️', '🌸', '✨', '💝'];

function crearCorazon() {
  const corazon = document.createElement('div');
  corazon.className = 'corazon-flotante';
  corazon.textContent = emojisCorazon[Math.floor(Math.random() * emojisCorazon.length)];
  corazon.style.left = Math.random() * 100 + '%';
  corazon.style.animationDuration = (Math.random() * 8 + 8) + 's';
  corazon.style.fontSize = (Math.random() * 20 + 18) + 'px';
  corazonesContenedor.appendChild(corazon);
  setTimeout(() => corazon.remove(), 16000);
}
setInterval(crearCorazon, 500);

// ===== ESTRELLAS =====
const estrellasContenedor = document.getElementById('estrellas');
for (let i = 0; i < 40; i++) {
  const estrella = document.createElement('div');
  estrella.className = 'estrella';
  estrella.style.left = Math.random() * 100 + '%';
  estrella.style.top = Math.random() * 100 + '%';
  estrella.style.animationDelay = Math.random() * 3 + 's';
  estrellasContenedor.appendChild(estrella);
}

// ===== ABRIR CARTA =====
function abrirCarta() {
  const inicio = document.getElementById('inicio');
  const contenedor = document.getElementById('contenedor');
  inicio.classList.add('oculto');
  setTimeout(() => {
    contenedor.classList.add('visible');
    for (let i = 0; i < 15; i++) {
      setTimeout(() => lluviaCorazones(), i * 100);
    }
  }, 700);
}

// ===== EXPLOSIÓN DE CORAZONES =====
// Acepta una posición opcional (x, y). Si no, llueve desde arriba.
function lluviaCorazones(x, y) {
  const desdeElBoton = (typeof x === 'number' && typeof y === 'number');

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const corazon = document.createElement('div');
      corazon.className = 'corazon-lluvia';
      corazon.textContent = emojisCorazon[Math.floor(Math.random() * emojisCorazon.length)];

      if (desdeElBoton) {
        // Explosión radial desde el punto pulsado
        corazon.style.left = x + 'px';
        corazon.style.top = y + 'px';
        corazon.style.position = 'fixed';
        corazon.style.fontSize = (Math.random() * 30 + 25) + 'px';

        // Ángulo y distancia aleatoria
        const angulo = Math.random() * Math.PI * 2;
        const distancia = Math.random() * 400 + 150;
        const dx = Math.cos(angulo) * distancia;
        const dy = Math.sin(angulo) * distancia;

        corazon.animate([
          { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.3) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], {
          duration: 2000 + Math.random() * 1000,
          easing: 'cubic-bezier(0.15, 0.8, 0.3, 1)',
          fill: 'forwards'
        });

        document.body.appendChild(corazon);
        setTimeout(() => corazon.remove(), 3200);
      } else {
        // Lluvia normal desde arriba (para abrir la carta)
        corazon.style.left = Math.random() * 100 + '%';
        corazon.style.top = '-60px';
        corazon.style.position = 'fixed';
        corazon.style.fontSize = (Math.random() * 30 + 25) + 'px';
        corazon.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(corazon);
        setTimeout(() => corazon.remove(), 5000);
      }
    }, i * 40);
  }
}

// ===== TARJETAS INTERACTIVAS =====
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', (e) => {
    lluviaCorazones(e.clientX, e.clientY);
  });
});

// ===== EFECTO PARALAJE SUAVE =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const hero = document.querySelector('.hero');
  if (hero) hero.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== CONECTAR EL BOTÓN "PULSA SI NECESITAS AMOR" =====
// Se conecta por JS (más seguro que inline), pasando la posición del clic
const botonAmor = document.querySelector('.boton-amor');
if (botonAmor) {
  botonAmor.addEventListener('click', (e) => {
    // Explosión desde el botón
    const rect = botonAmor.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    lluviaCorazones(cx, cy);

    // Y también un poco de lluvia desde arriba para más drama 💕
    setTimeout(() => lluviaCorazones(), 300);

    // Efecto de "latido" del botón al pulsar
    botonAmor.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.25)' },
      { transform: 'scale(1)' }
    ], { duration: 500, easing: 'ease-out' });

    // Cambiar el texto por mensajes bonitos rotando
    const mensajes = [
      'Te quiero mucho 💖',
      'Eres increíble ✨',
      'Todo va a estar bien 🌈',
      'No estás sola 💕',
      'Eres mi persona favorita 🥰'
    ];
    const textoOriginal = botonAmor.dataset.original || botonAmor.textContent;
    botonAmor.dataset.original = textoOriginal;
    botonAmor.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
    setTimeout(() => { botonAmor.textContent = textoOriginal; }, 2000);
  });
}