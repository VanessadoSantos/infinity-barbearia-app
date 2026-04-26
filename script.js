function agendar(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const cep = document.getElementById("cep").value;
  const cpf = document.getElementById("cpf").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  // PEGAR SERVIÇOS
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  let servicos = [];

  checkboxes.forEach(cb => {
    servicos.push(cb.value);
  });

  const listaServicos = servicos.join(", ");

  // WHATSAPP
  const numero = "55119964995899";

  const mensagem = `Novo Agendamento:%0A
Nome: ${nome}%0A
Serviços: ${listaServicos}%0A
Data: ${data}%0A
Hora: ${hora}`;

  const urlWhats = `https://wa.me/${numero}?text=${mensagem}`;

  // GOOGLE AGENDA
  const dataFormatada = data.replaceAll("-", "");
  const horaFormatada = hora.replace(":", "") + "00";

  const urlCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Agendamento Barbearia&details=Cliente:${nome}%0AServiços:${listaServicos}&dates=${dataFormatada}T${horaFormatada}/${dataFormatada}T${horaFormatada}`;

  // ABRE OS DOIS
  window.open(urlWhats, "_blank");
  window.open(urlCalendar, "_blank");
}

function enviarContato(e) {
  e.preventDefault();

  const nome = document.getElementById("contact-nome").value;
  const email = document.getElementById("contact-email").value;
  const mensagem = document.getElementById("contact-mensagem").value;

  // Simular envio (em produção, enviar para backend)
  alert(`Mensagem enviada!\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`);

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