function enviarContato(e) {
  e.preventDefault();

  const fields = [
    document.getElementById('contact-nome'),
    document.getElementById('contact-email'),
    document.getElementById('motivo'),
    document.getElementById('contact-mensagem')
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  fields.forEach((field) => {
    field.classList.remove('invalid');
    if (!field.value.trim()) {
      field.classList.add('invalid');
      isValid = false;
    }
  });

  const emailField = document.getElementById('contact-email');
  if (emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
    emailField.classList.add('invalid');
    isValid = false;
  }

  if (!isValid) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const nome = document.getElementById('contact-nome').value.trim();
  const email = emailField.value.trim();
  const mensagem = document.getElementById('contact-mensagem').value.trim();

  alert(`Mensagem enviada com sucesso!\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`);
  document.getElementById('contact-form').reset();
}

function toggleMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
}

function closeMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', enviarContato);
    contactForm.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => field.classList.remove('invalid'));
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});
