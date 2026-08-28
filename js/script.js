const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Entrada suave dos elementos.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Contadores da seção de estatísticas.
const counters = document.querySelectorAll("[data-counter]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.counter);
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else element.textContent = target;
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.7 });

counters.forEach(counter => counterObserver.observe(counter));

// Slider das telas reais que já estavam no projeto.
const screens = [
  {
    image: "img/print1.jpeg",
    title: "Dashboard financeiro",
    description: "Visualize receitas, despesas, saldo e metas em uma única tela."
  },
  {
    image: "img/print2.jpeg",
    title: "Controle de gastos",
    description: "Registre movimentações e acompanhe para onde o seu dinheiro está indo."
  },
  {
    image: "img/print3.jpeg",
    title: "Metas financeiras",
    description: "Crie objetivos e acompanhe seu progresso ao longo do tempo."
  },
  {
    image: "img/print4.jpeg",
    title: "Malomi School",
    description: "Aprendizado financeiro gamificado para alunos e escolas."
  },
  {
    image: "img/print5.jpeg",
    title: "Conquistas",
    description: "Ganhe pontos e recompensas conforme evolui financeiramente."
  }
];

let currentScreen = 0;
const screenImage = document.getElementById("screenImage");
const screenTitle = document.getElementById("screenTitle");
const screenDescription = document.getElementById("screenDescription");
const screenNumber = document.getElementById("screenNumber");
const screenDots = document.getElementById("screenDots");

function renderDots() {
  screenDots.innerHTML = screens.map((_, index) =>
    `<button class="screen-dot ${index === currentScreen ? "active" : ""}" aria-label="Ir para tela ${index + 1}" data-index="${index}"></button>`
  ).join("");

  screenDots.querySelectorAll(".screen-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      currentScreen = Number(dot.dataset.index);
      renderScreen();
    });
  });
}

function renderScreen() {
  const screen = screens[currentScreen];
  screenImage.style.opacity = "0";
  screenImage.style.transform = "translateY(8px)";

  setTimeout(() => {
    screenImage.src = screen.image;
    screenImage.alt = screen.title;
    screenTitle.textContent = screen.title;
    screenDescription.textContent = screen.description;
    screenNumber.textContent = `${String(currentScreen + 1).padStart(2, "0")} / ${String(screens.length).padStart(2, "0")}`;
    screenImage.style.opacity = "1";
    screenImage.style.transform = "translateY(0)";
  }, 130);

  renderDots();
}

document.getElementById("prevScreen")?.addEventListener("click", () => {
  currentScreen = (currentScreen - 1 + screens.length) % screens.length;
  renderScreen();
});

document.getElementById("nextScreen")?.addEventListener("click", () => {
  currentScreen = (currentScreen + 1) % screens.length;
  renderScreen();
});

screenImage.style.transition = "opacity .25s ease, transform .25s ease";
renderScreen();

// Navegação por teclado no slider.
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") document.getElementById("prevScreen")?.click();
  if (event.key === "ArrowRight") document.getElementById("nextScreen")?.click();
});
