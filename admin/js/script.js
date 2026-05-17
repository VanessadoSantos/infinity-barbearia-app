// ========================================
// API URL
// ========================================

const API_URL =
'http://localhost:3000/api';

// ========================================
// TOKEN
// ========================================

const token =
localStorage.getItem('token');

// ========================================
// AUTH VALIDATION
// ========================================

if(!token){

    window.location.href =
    './login.html';

}

// ========================================
// CHART
// ========================================

const ctx =
document.getElementById(
    'financeChart'
);

const financeChart =
new Chart(ctx, {

    type:'bar',

    data:{

        labels:[],

        datasets:[{

            label:'Financeiro',

            data:[],

            borderRadius:12,

            borderSkipped:false,

            backgroundColor:[

                '#c59d5f'

            ]

        }]

    },

    options:{

        responsive:true,

        plugins:{

            legend:{

                labels:{

                    color:'#ffffff'

                }

            }

        },

        scales:{

            x:{

                ticks:{

                    color:'#ffffff'

                },

                grid:{

                    color:'rgba(255,255,255,0.05)'

                }

            },

            y:{

                ticks:{

                    color:'#ffffff'

                },

                grid:{

                    color:'rgba(255,255,255,0.05)'

                }

            }

        }

    }

});

// ========================================
// ELEMENTS
// ========================================

const appointmentsTable =
document.getElementById(
    'appointmentsTable'
);

const financeForm =
document.getElementById(
    'financeForm'
);

const incomeElement =
document.getElementById(
    'income'
);

const expenseElement =
document.getElementById(
    'expense'
);

const profitElement =
document.getElementById(
    'profit'
);

const appointmentsCount =
document.getElementById(
    'appointmentsCount'
);

// ========================================
// FORMAT MONEY
// ========================================

function formatMoney(value){

    return Number(value)

    .toLocaleString(

        'pt-BR',

        {

            style:'currency',

            currency:'BRL'

        }

    );

}

// ========================================
// NOTIFICATION
// ========================================

function showMessage(message){

    alert(message);

}

// ========================================
// LOAD APPOINTMENTS
// ========================================

async function loadAppointments(){

    try{

        const response =
        await fetch(

            `${API_URL}/appointments`,

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        const data =
        await response.json();

        appointmentsTable.innerHTML = '';

        // ========================================
        // EMPTY
        // ========================================

        if(

            !data.appointments ||

            data.appointments.length === 0

        ){

            appointmentsTable.innerHTML =

            `
            <tr>

                <td colspan="5">

                    Nenhum agendamento encontrado.

                </td>

            </tr>
            `;

            appointmentsCount.innerText = 0;

            return;

        }

        // ========================================
        // TOTAL
        // ========================================

        appointmentsCount.innerText =
        data.total;

        // ========================================
        // LOOP
        // ========================================

        data.appointments.forEach(

            (appointment) => {

                let statusClass =
                'pending';

                if(

                    appointment.status ===
                    'Concluído'

                ){

                    statusClass =
                    'done';

                }

                if(

                    appointment.status ===
                    'Cancelado'

                ){

                    statusClass =
                    'canceled';

                }

                appointmentsTable.innerHTML +=

                `
                <tr>

                    <td>

                        ${appointment.clientName}

                    </td>

                    <td>

                        ${appointment.service}

                    </td>

                    <td>

                        ${appointment.date}

                    </td>

                    <td>

                        ${appointment.hour}

                    </td>

                    <td>

                        <span
                            class="status ${statusClass}"
                        >

                            ${appointment.status}

                        </span>

                    </td>

                </tr>
                `;

            }

        );

    } catch(error){

        console.log(error);

        showMessage(
            'Erro ao carregar agendamentos.'
        );

    }

}

// ========================================
// LOAD FINANCES
// ========================================

async function loadFinances(){

    try{

        const response =
        await fetch(

            `${API_URL}/finances`,

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        const data =
        await response.json();

        // ========================================
        // VALIDATION
        // ========================================

        if(!data.finances){

            return;

        }

        let income = 0;

        let expense = 0;

        // ========================================
        // CALCULATE
        // ========================================

        data.finances.forEach(

            (item) => {

                if(

                    item.type ===
                    'entrada'

                ){

                    income += item.amount;

                } else {

                    expense += item.amount;

                }

            }

        );

        const profit =
        income - expense;

        // ========================================
        // UPDATE CARDS
        // ========================================

        incomeElement.innerText =
        formatMoney(income);

        expenseElement.innerText =
        formatMoney(expense);

        profitElement.innerText =
        formatMoney(profit);

        // ========================================
        // UPDATE CHART
        // ========================================

        financeChart.data.labels =

        data.finances.map(

            item => item.title

        );

        financeChart.data.datasets[0].data =

        data.finances.map(

            item => item.amount

        );

        financeChart.update();

    } catch(error){

        console.log(error);

        showMessage(
            'Erro ao carregar financeiro.'
        );

    }

}

// ========================================
// CREATE FINANCE
// ========================================

if(financeForm){

    financeForm.addEventListener(

        'submit',

        async (e) => {

            e.preventDefault();

            const financeData = {

                title:

                document.getElementById(
                    'title'
                ).value.trim(),

                type:

                document.getElementById(
                    'type'
                ).value,

                amount:Number(

                    document.getElementById(
                        'amount'
                    ).value

                ),

                category:

                document.getElementById(
                    'category'
                ).value.trim()

            };

            // ========================================
            // VALIDATION
            // ========================================

            if(

                !financeData.title ||

                !financeData.amount

            ){

                showMessage(
                    'Preencha os campos.'
                );

                return;

            }

            try{

                const response =
                await fetch(

                    `${API_URL}/finances`,

                    {

                        method:'POST',

                        headers:{

                            'Content-Type':
                            'application/json',

                            Authorization:
                            `Bearer ${token}`

                        },

                        body:JSON.stringify(
                            financeData
                        )

                    }

                );

                const data =
                await response.json();

                if(data.success){

                    showMessage(
                        'Registro salvo.'
                    );

                    financeForm.reset();

                    loadFinances();

                } else {

                    showMessage(
                        data.message
                    );

                }

            } catch(error){

                console.log(error);

                showMessage(
                    'Erro ao salvar registro.'
                );

            }

        }

    );

}

// ========================================
// LOGOUT
// ========================================

const logoutButton =
document.getElementById(
    'logoutButton'
);

if(logoutButton){

    logoutButton.addEventListener(

        'click',

        () => {

            localStorage.removeItem(
                'token'
            );

            localStorage.removeItem(
                'user'
            );

            window.location.href =
            './login.html';

        }

    );

}

// ========================================
// INIT
// ========================================

loadAppointments();

loadFinances();

console.log(
    'Dashboard Infinity Barbearia carregado.'
);
