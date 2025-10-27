let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const confirmedDays = [];  // Array para armazenar os dias confirmados

function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    calendar.innerHTML = '';

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const today = new Date();

    // Atualiza o título do mês e ano
    monthYear.innerText = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month))} ${year}`;

    // Adiciona os dias da semana
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
        const header = document.createElement('div');
        header.classList.add('header');
        header.innerText = day;
        calendar.appendChild(header);
    });

    // Adiciona espaços vazios para os dias antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendar.appendChild(emptyDiv);
    }

    // Adiciona os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = day;

        // Aplica a classe 'past' para dias passados
        if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth()) || (year === today.getFullYear() && month === today.getMonth() && day < today.getDate())) {
            dayDiv.classList.add('past');
        }

        // Adiciona evento de clique
        dayDiv.addEventListener('click', function () {
            if (!dayDiv.classList.contains('past')) {
                toggleDay(day, month, year, dayDiv);
            }
        });

        calendar.appendChild(dayDiv);
    }
}

// Função para alternar a seleção do dia
function toggleDay(day, month, year, element) {
    const dateKey = `${year}-${month + 1}-${day}`; // Formato: YYYY-MM-DD
    const index = confirmedDays.indexOf(dateKey);

    if (index === -1) {
        confirmedDays.push(dateKey); // Adiciona o dia
        element.classList.add('selected'); // Atualiza a interface
    } else {
        confirmedDays.splice(index, 1); // Remove o dia
        element.classList.remove('selected'); // Atualiza a interface
    }
}

// Mostra os dias confirmados
document.getElementById('showConfirmed').addEventListener('click', function () {
    const confirmedMessages = confirmedDays.map(date => {
        const [year, month, day] = date.split('-');
        return `Day: ${day}, Month: ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month - 1))}, Year: ${year}`;
    });
    alert('Coonfirmed days:\n' + (confirmedMessages.join('\n') || 'Any day confirmed.'));
});

document.getElementById('prevMonth').addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Gera o calendário para o mês atual
generateCalendar(currentMonth, currentYear);
