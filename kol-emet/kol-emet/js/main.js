/* ==========================================================================
   KOL EMET — script principal
   Funcionalidades: navegação ativa, geração da waveform, validação de
   formulário de contato e botão "voltar ao topo".
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setActiveNavLink();
  buildWaveform();
  setupContactForm();
  setupBackToTop();
  setYear();
});

/**
 * Marca como "ativo" o link da navbar correspondente à página atual,
 * comparando o caminho do arquivo (funciona em qualquer ambiente de
 * publicação, sem depender de âncoras).
 */
function setActiveNavLink() {
  var links = document.querySelectorAll(".ke-navbar .nav-link");
  var current = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href) return;

    var isHome = (current === "" || current === "index.html") && href === "index.html";
    var isMatch = href === current;

    if (isHome || isMatch) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/**
 * Gera as barras da waveform decorativa do hero em alturas
 * pseudo-aleatórias (mas estáveis por carregamento), simulando
 * uma forma de onda sonora.
 */
function buildWaveform() {
  var container = document.querySelector("[data-waveform]");
  if (!container) return;

  var barCount = 40;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < barCount; i++) {
    var bar = document.createElement("span");
    var height = 14 + Math.round(Math.abs(Math.sin(i * 0.4)) * 50);
    bar.style.height = height + "px";
    fragment.appendChild(bar);
  }

  container.appendChild(fragment);
}

/**
 * Validação simples do formulário de contato no lado do cliente.
 * Não há backend: a mensagem de sucesso simula o envio e orienta
 * o visitante. Pensado para ser substituído por um endpoint real
 * (ver README.md) quando a banda tiver um serviço de e-mail configurado.
 */
function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.querySelector("#name");
    var email = form.querySelector("#email");
    var message = form.querySelector("#message");

    var errors = [];

    if (!name.value.trim()) {
      errors.push("Informe seu nome.");
    }

    if (!isValidEmail(email.value.trim())) {
      errors.push("Informe um e-mail válido.");
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      errors.push("Escreva uma mensagem com pelo menos 10 caracteres.");
    }

    feedback.classList.remove("success", "error");

    if (errors.length > 0) {
      feedback.textContent = errors.join(" ");
      feedback.classList.add("error");
      feedback.setAttribute("role", "alert");
      return;
    }

    feedback.textContent =
      "Mensagem pronta para envio, " + name.value.trim() + ". Em breve a Kol Emet responde no e-mail informado.";
    feedback.classList.add("success");
    feedback.setAttribute("role", "status");
    form.reset();
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Mostra/esconde o botão de voltar ao topo conforme o scroll
 * e move o foco para o topo da página ao ser ativado (acessibilidade).
 */
function setupBackToTop() {
  var button = document.getElementById("back-to-top");
  if (!button) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 480) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  });

  button.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("main-content").setAttribute("tabindex", "-1");
    document.getElementById("main-content").focus();
  });
}

function setYear() {
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
