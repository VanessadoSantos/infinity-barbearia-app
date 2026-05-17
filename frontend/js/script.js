// ========================================
// MENU MOBILE
// ========================================

const menuMobile =
document.getElementById(
    'menu-mobile'
);

const navbar =
document.getElementById(
    'navbar'
);

if(menuMobile && navbar){

    menuMobile.addEventListener(

        'click',

        () => {

            navbar.classList.toggle(
                'active'
            );

        }

    );

}

// ========================================
// HEADER DINÂMICO
// ========================================

const header =
document.querySelector(
    '.header'
);

window.addEventListener(

    'scroll',

    () => {

        if(window.scrollY > 50){

            header.classList.add(
                'active'
            );

        } else {

            header.classList.remove(
                'active'
            );

        }

    },

    { passive:true }

);

// ========================================
// LOADER
// ========================================

window.addEventListener(

    'load',

    () => {

        const loader =
        document.querySelector(
            '.loader'
        );

        if(loader){

            setTimeout(() => {

                loader.style.opacity = '0';

                loader.style.visibility =
                'hidden';

            }, 1500);

        }

    }

);

// ========================================
// SCROLL REVEAL
// ========================================

const revealElements =
document.querySelectorAll(

    '.card-diferencial, .servico-card'

);

function revealOnScroll(){

    const triggerBottom =
    window.innerHeight * 0.85;

    revealElements.forEach(

        (element) => {

            const elementTop =
            element.getBoundingClientRect().top;

            if(elementTop < triggerBottom){

                element.classList.add(
                    'show'
                );

            }

        }

    );

}

window.addEventListener(

    'scroll',

    revealOnScroll,

    { passive:true }

);

revealOnScroll();

// ========================================
// BOTÃO VOLTAR TOPO
// ========================================

const backToTop =
document.createElement(
    'button'
);

backToTop.innerHTML =

'<i class="fa-solid fa-arrow-up"></i>';

backToTop.classList.add(
    'back-to-top'
);

backToTop.setAttribute(

    'aria-label',

    'Voltar ao topo'

);

document.body.appendChild(
    backToTop
);

window.addEventListener(

    'scroll',

    () => {

        if(window.scrollY > 500){

            backToTop.classList.add(
                'active'
            );

        } else {

            backToTop.classList.remove(
                'active'
            );

        }

    },

    { passive:true }

);

backToTop.addEventListener(

    'click',

    () => {

        window.scrollTo({

            top:0,

            behavior:'smooth'

        });

    }

);

// ========================================
// NOTIFICAÇÕES
// ========================================

function showNotification(message){

    const notification =
    document.createElement(
        'div'
    );

    notification.classList.add(
        'notification'
    );

    notification.innerText =
    message;

    document.body.appendChild(
        notification
    );

    setTimeout(() => {

        notification.classList.add(
            'show'
        );

    }, 100);

    setTimeout(() => {

        notification.classList.remove(
            'show'
        );

        setTimeout(() => {

            notification.remove();

        }, 400);

    }, 3000);

}

// ========================================
// CONTADORES
// ========================================

const counters =
document.querySelectorAll(
    '.counter'
);

const speed = 200;

counters.forEach((counter) => {

    const updateCounter = () => {

        const target =

        +counter.getAttribute(
            'data-target'
        );

        const count =
        +counter.innerText;

        const increment =
        target / speed;

        if(count < target){

            counter.innerText =

            Math.ceil(
                count + increment
            );

            setTimeout(
                updateCounter,
                20
            );

        } else {

            counter.innerText =
            target;

        }

    };

    updateCounter();

});

// ========================================
// SCROLL SUAVE
// ========================================

document.querySelectorAll(
    'a[href^="#"]'
)

.forEach((anchor) => {

    anchor.addEventListener(

        'click',

        function(e){

            e.preventDefault();

            const section =

            document.querySelector(

                this.getAttribute(
                    'href'
                )

            );

            if(section){

                section.scrollIntoView({

                    behavior:'smooth'

                });

            }

        }

    );

});

// ========================================
// PARALLAX
// ========================================

const hero =
document.querySelector(
    '.hero'
);

window.addEventListener(

    'scroll',

    () => {

        if(hero){

            const offset =
            window.scrollY;

            hero.style.backgroundPositionY =

            offset * 0.5 + 'px';

        }

    },

    { passive:true }

);

// ========================================
// HERO ANIMATION
// ========================================

const heroTitle =
document.querySelector(
    '.hero-content h1'
);

if(heroTitle){

    heroTitle.classList.add(
        'fade-title'
    );

}

// ========================================
// FECHAR MENU MOBILE
// ========================================

document.querySelectorAll(
    '.navbar a'
)

.forEach((link) => {

    link.addEventListener(

        'click',

        () => {

            navbar.classList.remove(
                'active'
            );

        }

    );

});

// ========================================
// ONLINE/OFFLINE
// ========================================

window.addEventListener(

    'offline',

    () => {

        showNotification(

            'Você está offline.'

        );

    }

);

window.addEventListener(

    'online',

    () => {

        showNotification(

            'Conexão restaurada.'

        );

    }

);

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

            const button =
            appointmentForm.querySelector(
                'button'
            );

            button.disabled = true;

            button.innerText =
            'Enviando...';

            const data = {

                clientName:

                document.getElementById(
                    'clientName'
                ).value.trim(),

                phone:

                document.getElementById(
                    'phone'
                ).value.trim(),

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

                // SIMULAÇÃO API

                await new Promise(

                    (resolve) =>

                    setTimeout(
                        resolve,
                        1500
                    )

                );

                showNotification(

                    'Agendamento realizado com sucesso.'

                );

                appointmentForm.reset();

            } catch(error){

                showNotification(

                    'Erro no agendamento.'

                );

            } finally {

                button.disabled = false;

                button.innerText =
                'Agendar Agora';

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

            navigator.serviceWorker

            .register(
                './pwa/service-worker.js'
            )

            .then(() => {

                console.log(
                    'PWA registrado.'
                );

            })

            .catch((error) => {

                console.error(
                    error
                );

            });

        }

    );

}

// ========================================
// PERFORMANCE
// ========================================

window.addEventListener(

    'load',

    () => {

        document.body.classList.add(
            'loaded'
        );

    }

);

// ========================================
// INIT
// ========================================

console.log(

    'Infinity Barbearia carregada com sucesso.'

);
