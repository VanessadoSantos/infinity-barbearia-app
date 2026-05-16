// ========================================
// MENU MOBILE
// ========================================

const menuMobile = document.getElementById('menu-mobile');

const navbar = document.getElementById('navbar');

if(menuMobile){

    menuMobile.addEventListener('click', () => {

        navbar.classList.toggle('active');

    });

}

// ========================================
// HEADER DINÂMICO
// ========================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        header.classList.add('active');

    } else {

        header.classList.remove('active');

    }

});

// ========================================
// LOADER
// ========================================

window.addEventListener('load', () => {

    const loader = document.querySelector('.loader');

    setTimeout(() => {

        loader.style.display = 'none';

    }, 2000);

});

// ========================================
// SCROLL REVEAL
// ========================================

const revealElements = document.querySelectorAll(
    '.card-diferencial, .servico-card, .plano-card'
);

function revealOnScroll(){

    const triggerBottom =
        window.innerHeight * 0.85;

    revealElements.forEach((element) => {

        const elementTop =
            element.getBoundingClientRect().top;

        if(elementTop < triggerBottom){

            element.classList.add('show');

        }

    });

}

window.addEventListener('scroll', 
    () => {

    },
    {passive:true}
);

revealOnScroll();

// ========================================
// BOTÃO VOLTAR TOPO
// ========================================

const backToTop = document.createElement('button');

backToTop.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

backToTop.classList.add('back-to-top');

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {

    if(window.scrollY > 500){

        backToTop.classList.add('active');

    } else {

        backToTop.classList.remove('active');

    }

});

backToTop.addEventListener('click', () => {

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

});

// ========================================
// NOTIFICAÇÕES
// ========================================

function showNotification(message){

    const notification =
        document.createElement('div');

    notification.classList.add('notification');

    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add('show');

    }, 100);

    setTimeout(() => {

        notification.remove();

    }, 3000);

}

// ========================================
// CONTADORES ANIMADOS
// ========================================

const counters =
    document.querySelectorAll('.counter');

const speed = 200;

counters.forEach((counter) => {

    const updateCounter = () => {

        const target =
            +counter.getAttribute('data-target');

        const count =
            +counter.innerText;

        const increment =
            target / speed;

        if(count < target){

            counter.innerText =
                Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});

// ========================================
// SCROLL SUAVE LINKS
// ========================================

document.querySelectorAll('a[href^="#"]')
.forEach((anchor) => {

    anchor.addEventListener('click', function(e){

        e.preventDefault();

        const section =
            document.querySelector(
                this.getAttribute('href')
            );

        section.scrollIntoView({
            behavior:'smooth'
        });

    });

});

// ========================================
// EFEITO PARALLAX
// ========================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {

    let offset = window.scrollY;

    hero.style.backgroundPositionY =
        offset * 0.5 + 'px';

});

// ========================================
// ANIMAÇÃO TEXTO HERO
// ========================================

const heroTitle =
    document.querySelector('.hero-content h1');

if(heroTitle){

    heroTitle.classList.add('fade-title');

}

// ========================================
// FECHAR MENU AO CLICAR
// ========================================

document.querySelectorAll('.navbar a')
.forEach((link) => {

    link.addEventListener('click', () => {

        navbar.classList.remove('active');

    });

});

// ========================================
// DETECTAR ONLINE/OFFLINE
// ========================================

window.addEventListener('offline', () => {

    showNotification(
        'Você está sem internet.'
    );

});

window.addEventListener('online', () => {

    showNotification(
        'Conexão restaurada.'
    );

});

// ========================================
// PRELOAD IMAGES
// ========================================

const images = [

    './assets/images/banner.jpg'

];

images.forEach((image) => {

    const img = new Image();

    img.src = image;

});

// ========================================
// SISTEMA PREPARADO
// ========================================

console.log(
    'Infinity Barbearia carregada com sucesso.'
);
// ========================================
// AGENDAMENTO
// ========================================

const appointmentForm =
document.getElementById(
    'appointmentForm'
);

if(appointmentForm){

    appointmentForm.addEventListener(
        'submit',

        async (e) => {

            e.preventDefault();

            const data = {

                clientName:
                document.getElementById(
                    'clientName'
                ).value,

                phone:
                document.getElementById(
                    'phone'
                ).value,

                service:
                document.getElementById(
                    'service'
                ).value,

                date:
                document.getElementById(
                    'date'
                ).value,

                hour:
                document.getElementById(
                    'hour'
                ).value

            };

            try{

                const response =
                await fetch(

                    'http://localhost:3000/api/appointments',

                    {

                        method:'POST',

                        headers:{
                            'Content-Type':
                            'application/json'
                        },

                        body:JSON.stringify(
                            data
                        )

                    }

                );

                if(response.ok){

                    showNotification(
                        'Agendamento realizado.'
                    );

                    appointmentForm.reset();

                }

            } catch(error){

                showNotification(
                    'Erro no agendamento.'
                );

            }

        }

    );

}
// ========================================
// PWA
// ========================================

if('serviceWorker' in navigator){

    window.addEventListener(
        'load',

        () => {

            navigator.serviceWorker.register(
                './pwa/service-worker.js'
            )

            .then(() => {

                console.log(
                    'PWA registrado.'
                );

            })

            .catch((error) => {

                console.log(error);

            });

        }

    );

}