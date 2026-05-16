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

            backgroundColor:[
                '#c59d5f'
            ]

        }]

    }

});

// ========================================
// APPOINTMENTS
// ========================================

const appointmentsTable =
document.getElementById(
    'appointmentsTable'
);

async function loadAppointments(){

    try{

        const response =
        await fetch(
            'http://localhost:3000/api/appointments'
        );

        const appointments =
        await response.json();

        document.getElementById(
            'appointmentsCount'
        ).innerText =
        appointments.length;

        appointmentsTable.innerHTML='';

        appointments.forEach(
        (appointment) => {

            appointmentsTable.innerHTML += `

            <tr>

                <td>
                    ${appointment.clientName}
                </td>

                <td>
                    ${appointment.service}
                </td>

                <td>
                    ${appointment.hour}
                </td>

                <td>

                    <span class="status pending">
                        ${appointment.status}
                    </span>

                </td>

            </tr>

            `;

        });

    } catch(error){

        console.log(error);

    }

}

// ========================================
// FINANCEIRO
// ========================================

const financeForm =
document.getElementById(
    'financeForm'
);

async function loadFinances(){

    try{

        const response =
        await fetch(
            'http://localhost:3000/api/finances'
        );

        const finances =
        await response.json();

        let income = 0;
        let expense = 0;

        finances.forEach((item) => {

            if(item.type === 'entrada'){

                income += item.amount;

            } else {

                expense += item.amount;

            }

        });

        const profit =
        income - expense;

        document.getElementById(
            'income'
        ).innerText =
        `R$ ${income}`;

        document.getElementById(
            'expense'
        ).innerText =
        `R$ ${expense}`;

        document.getElementById(
            'profit'
        ).innerText =
        `R$ ${profit}`;

        // UPDATE CHART

        financeChart.data.labels =
        finances.map(item => item.title);

        financeChart.data.datasets[0].data =
        finances.map(item => item.amount);

        financeChart.update();

    } catch(error){

        console.log(error);

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

            const data = {

                title:
                document.getElementById(
                    'title'
                ).value,

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
                ).value

            };

            await fetch(
                'http://localhost:3000/api/finances',

                {

                    method:'POST',

                    headers:{
                        'Content-Type':
                        'application/json'
                    },

                    body:JSON.stringify(data)

                }

            );

            financeForm.reset();

            loadFinances();

        }

    );

}

// ========================================
// INIT
// ========================================

loadAppointments();

loadFinances();