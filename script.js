function agendar(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const email = document.getElementById("email").value.trim();
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  // Validações básicas
  if (!nome || !endereco || !cep || !cpf || !whatsapp || !email || !data || !hora) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Validação de email simples
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  // PEGAR SERVIÇOS
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  let servicos = [];
  checkboxes.forEach(cb => servicos.push(cb.value));

  if (servicos.length === 0) {
    alert("Por favor, selecione ao menos um serviço.");
    return;
  }

  const listaServicos = servicos.join(", ");

  // WHATSAPP
  const numero = "55119964995899";
  const mensagem = `Novo Agendamento:\nNome: ${nome}\nEndereço: ${endereco}\nCEP: ${cep}\nCPF: ${cpf}\nWhatsApp: ${whatsapp}\nEmail: ${email}\nServiços: ${listaServicos}\nData: ${data}\nHora: ${hora}`;
  const urlWhats = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  // GOOGLE AGENDA
  const dataFormatada = data.replace(/-/g, "");
  const horaFormatada = hora.replace(":", "") + "00";

  // Adiciona 30 minutos ao horário final
  let [h, m] = hora.split(":").map(Number);
  m += 30;
  if (m >= 60) { h += 1; m -= 60; }
  const horaFim = `${String(h).padStart(2,"0")}${String(m).padStart(2,"0")}00`;

  const tituloEvento = encodeURIComponent("Agendamento Barbearia");
  const detalhesEvento = encodeURIComponent(
    `Cliente: ${nome}\nServiços: ${listaServicos}\nContato: ${whatsapp}\nEmail: ${email}`
  );
  const urlCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${tituloEvento}&details=${detalhesEvento}&dates=${dataFormatada}T${horaFormatada}/${dataFormatada}T${horaFim}`;

  // Feedback ao usuário
  alert("Agendamento enviado! Verifique o WhatsApp e o Google Calendar.");

  // ABRE OS DOIS
  window.open(urlWhats, "_blank");
  window.open(urlCalendar, "_blank");
}

function enviarContato(e) {
  e.preventDefault();

  const nome = document.getElementById("contact-nome").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const mensagem = document.getElementById("contact-mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  // Simular envio (em produção, enviar para backend)
  alert(`Mensagem enviada com sucesso!\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`);

  // Limpar formulário
  document.getElementById("contact-form").reset();
}

// Adicionar event listener ao formulário de contato
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", enviarContato);
  }
});
