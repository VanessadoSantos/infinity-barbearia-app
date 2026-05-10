// ==========================
// MENU MOBILE
// ==========================

const menuToggle = document.getElementById('menu-toggle');

const navLinks = document.getElementById('nav-links');

if(menuToggle){

  menuToggle.addEventListener('click', () => {

    navLinks.classList.toggle('active');

  });

}

// ==========================
// LOADING SCREEN
// ==========================

window.addEventListener('load', () => {

  const loader = document.getElementById('loader');

  if(loader){

    loader.style.opacity = '0';

    setTimeout(() => {

      loader.style.display = 'none';

    }, 600);

  }

});

// ==========================
// SCROLL REVEAL
// ==========================

const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {

  reveals.forEach(reveal => {

    const windowHeight = window.innerHeight;

    const revealTop = reveal.getBoundingClientRect().top;

    const revealPoint = 100;

    if(revealTop < windowHeight - revealPoint){

      reveal.classList.add('active');

    }

  });

});

// ==========================
// AGENDAMENTO
// ==========================

const form = document.getElementById('formAgendamento');

const lista = document.getElementById('listaAgendamentos');

let agendamentos = JSON.parse(
  localStorage.getItem('agendamentos')
) || [];

// ==========================
// RENDERIZAR
// ==========================

renderizarAgendamentos();

if(form){

  form.addEventListener('submit', (event) => {

    event.preventDefault();

    const novoAgendamento = {

      nome: document.getElementById('nome').value,

      telefone: document.getElementById('telefone').value,

      servico: document.getElementById('servico').value,

      data: document.getElementById('data').value,

      hora: document.getElementById('hora').value,

      status: 'Confirmado'

    };

    // ==========================
    // VALIDAR HORÁRIO DUPLICADO
    // ==========================

    const horarioExiste = agendamentos.some(agendamento => {

      return (

        agendamento.data === novoAgendamento.data &&

        agendamento.hora === novoAgendamento.hora

      );

    });

    if(horarioExiste){

      mostrarToast('Esse horário já está reservado.');

      return;

    }

    // ==========================
    // SALVAR
    // ==========================

    agendamentos.push(novoAgendamento);

    salvarAgendamentos();

    renderizarAgendamentos();

    mostrarToast('Agendamento realizado com sucesso!');

    form.reset();

  });

}

// ==========================
// SALVAR LOCALSTORAGE
// ==========================

function salvarAgendamentos(){

  localStorage.setItem(
    'agendamentos',
    JSON.stringify(agendamentos)
  );

}

// ==========================
// RENDERIZAR LISTA
// ==========================

function renderizarAgendamentos(){

  if(!lista) return;

  lista.innerHTML = '';

  if(agendamentos.length === 0){

    lista.innerHTML = `

      <p style="text-align:center; color:#bdbdbd;">

        Nenhum agendamento realizado.

      </p>

    `;

    return;

  }

  agendamentos.forEach((agendamento, index) => {

    lista.innerHTML += `

      <div class="card-agendamento">

        <p>

          <strong>Nome:</strong>

          ${agendamento.nome}

        </p>

        <p>

          <strong>Telefone:</strong>

          ${agendamento.telefone}

        </p>

        <p>

          <strong>Serviço:</strong>

          ${agendamento.servico}

        </p>

        <p>

          <strong>Data:</strong>

          ${agendamento.data}

        </p>

        <p>

          <strong>Hora:</strong>

          ${agendamento.hora}

        </p>

        <p>

          <strong>Status:</strong>

          <span class="status-confirmado">

            ${agendamento.status}

          </span>

        </p>

        <button onclick="removerAgendamento(${index})">

          Excluir

        </button>

      </div>

    `;

  });

}

// ==========================
// REMOVER
// ==========================

function removerAgendamento(index){

  agendamentos.splice(index,1);

  salvarAgendamentos();

  renderizarAgendamentos();

  mostrarToast('Agendamento removido.');

}

// ==========================
// TOAST
// ==========================

function mostrarToast(mensagem){

  const toast = document.getElementById('toast');

  if(!toast) return;

  toast.innerText = mensagem;

  toast.style.opacity = '1';

  setTimeout(() => {

    toast.style.opacity = '0';

  }, 3000);

}

// ==========================
// SERVICE WORKER
// ==========================

if('serviceWorker' in navigator){

  window.addEventListener('load', () => {

    navigator.serviceWorker
      .register('./service-worker.js')

      .then(() => {

        console.log('Service Worker registrado');

      })

      .catch((error) => {

        console.log(
          'Erro no Service Worker',
          error
        );

      });

  });

}