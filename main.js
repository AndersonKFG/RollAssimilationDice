function updateDiceAmount(diceType, operation) {
    const valueElement = document.getElementById(`value-${diceType}`);
    const currentValue = valueElement.textContent;  // Ex: "0d6"
    let parts = currentValue.split('d');  // Divide em duas partes, por exemplo, [0, 6]

    let currentAmount = parseInt(parts[0]);  // Pega o número de dados (0 em "0d6")

    if (operation === 'increase') {
        currentAmount++;
    } else if (operation === 'decrease' && currentAmount > 0) {  // Não permite diminuir abaixo de 0
        currentAmount--;
    }

    valueElement.textContent = `${currentAmount}d${parts[1]}`;  // Atualiza com o novo valor, ex: "1d6"
}

// Adicionando eventos para os botões de aumentar e diminuir
document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function () {
        const diceType = this.getAttribute('data-dice');
        updateDiceAmount(diceType, 'decrease');
    });
});

document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function () {
        const diceType = this.getAttribute('data-dice');
        updateDiceAmount(diceType, 'increase');
    });
});

// Carregar histórico da firebase
function loadHistoryFromFirebase() {
    rollsRef.on('value', snapshot => {
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

        const data = snapshot.val();
        if (data) {
            const historyEntries = Object.values(data).map(entry => {
                // Convertendo o timestamp em formato ISO para um objeto Date
                const timestamp = new Date(entry.timestamp); // entry.timestamp vem do Firebase, como "2024-11-28T14:10:21.944Z"

                // Formatar a hora no formato "hh:mm:ss"
                const hours = timestamp.getHours().toString().padStart(2, '0');
                const minutes = timestamp.getMinutes().toString().padStart(2, '0');
                const seconds = timestamp.getSeconds().toString().padStart(2, '0');
                const timeString = `${hours}h:${minutes}m:${seconds}s`;

                // Montando a string de resultados
                const resultString = entry.results.map(r =>
                    `${r.dado} (${r.roll}): ${r.sucessos} sucesso${r.sucessos == 1 ? '' : 's'}, ` +
                    `${r.adaptacoes} adaptaç${r.adaptacoes == 1 ? 'ão' : 'ões'}, ` +
                    `${r.pressoes} press${r.pressoes == 1 ? 'ão' : 'ões'}.`
                ).join("<br>");

                // Retorna a entrada formatada com o horário
                return `<strong>${entry.player}:</strong> Rolagem às ${timeString}<br>${resultString}`;
            });

            // Reverte a ordem para mostrar o mais recente primeiro
            historyList.innerHTML = historyEntries.reverse().map(item => `<li>${item}</li>`).join("");
        }
    });
}


// Chamar essa função quando a página carregar
window.onload = loadHistoryFromFirebase;

// Tabela de relação de dados


// Configuração da firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZnZGDp3o3tAj_eHBRqrD5V6oooi26OE4",
    authDomain: "sistemadados-a97d7.firebaseapp.com",
    databaseURL: "https://sistemadados-a97d7-default-rtdb.firebaseio.com",
    projectId: "sistemadados-a97d7",
    storageBucket: "sistemadados-a97d7.appspot.com",
    messagingSenderId: "1029740435080",
    appId: "1:1029740435080:web:893e3ad9e2ae7073a8713d",
    measurementId: "G-GS4NTKW7ZP"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const rollsRef = database.ref('rolls');

function rollDice() {

    const outcomeTable = {
        d6: [
            { resultado: "nada", sucessos: 0, adaptacoes: 0, pressoes: 0 },
            { resultado: "nada", sucessos: 0, adaptacoes: 0, pressoes: 0 },
            { resultado: "pressão", sucessos: 0, adaptacoes: 0, pressoes: 1 },
            { resultado: "pressão e adaptação", sucessos: 0, adaptacoes: 1, pressoes: 1 },
            { resultado: "pressão e adaptação", sucessos: 0, adaptacoes: 1, pressoes: 1 },
            { resultado: "sucesso", sucessos: 1, adaptacoes: 0, pressoes: 0 }
        ],
        d10: [
            { resultado: "nada", sucessos: 0, adaptacoes: 0, pressoes: 0 },
            { resultado: "nada", sucessos: 0, adaptacoes: 0, pressoes: 0 },
            { resultado: "pressão", sucessos: 0, adaptacoes: 0, pressoes: 1 },
            { resultado: "pressão e adaptação", sucessos: 0, adaptacoes: 1, pressoes: 1 },
            { resultado: "pressão e adaptação", sucessos: 0, adaptacoes: 1, pressoes: 1 },
            { resultado: "sucesso", sucessos: 1, adaptacoes: 0, pressoes: 0 },
            { resultado: "2 sucessos", sucessos: 2, adaptacoes: 0, pressoes: 0 },
            { resultado: "sucesso e adaptação", sucessos: 1, adaptacoes: 1, pressoes: 0 },
            { resultado: "sucesso, pressão e adaptação", sucessos: 1, adaptacoes: 1, pressoes: 1 },
            { resultado: "2 sucessos e pressão", sucessos: 2, adaptacoes: 0, pressoes: 1 }
        ],
        d12: [
            { resultado: "nada", sucessos: 0, adaptacoes: 0, pressoes: 0 },
            { resultado: "nada", sucessos: 0, adaptacoes: 0, pressoes: 0 },
            { resultado: "pressão", sucessos: 0, adaptacoes: 0, pressoes: 1 },
            { resultado: "pressão e adaptação", sucessos: 0, adaptacoes: 1, pressoes: 1 },
            { resultado: "pressão e adaptação", sucessos: 0, adaptacoes: 1, pressoes: 1 },
            { resultado: "sucesso", sucessos: 1, adaptacoes: 0, pressoes: 0 },
            { resultado: "2 sucessos", sucessos: 2, adaptacoes: 0, pressoes: 0 },
            { resultado: "sucesso e adaptação", sucessos: 1, adaptacoes: 1, pressoes: 0 },
            { resultado: "sucesso, pressão e adaptação", sucessos: 1, adaptacoes: 1, pressoes: 1 },
            { resultado: "2 sucessos e pressão", sucessos: 2, adaptacoes: 0, pressoes: 1 },
            { resultado: "sucesso, 2 adaptações e pressão", sucessos: 1, adaptacoes: 2, pressoes: 1 },
            { resultado: "2 pressões", sucessos: 0, adaptacoes: 0, pressoes: 2 }
        ]
    };
    const player = document.getElementById("character").value;
    const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
    let results = [];

    if (player === "unusable") {
        alert("Por favor, selecione um personagem antes de rolar os dados.");
        return;
    }

    // Percorrer todos os tipos de dados e suas quantidades
    diceTypes.forEach(diceType => {
        const count = parseInt(document.getElementById(`value-${diceType}`).textContent.split('d')[0]);

        for (let i = 0; i < count; i++) {
            const sides = parseInt(diceType.slice(1)); // extrai o número de lados do tipo de dado
            const roll = Math.floor(Math.random() * sides) + 1;
            animateDice(diceType);

            if (["d6", "d10", "d12"].includes(diceType)) {
                const sequence = outcomeTable[diceType]
                const values = (sequence[roll - 1])

                results.push({
                    dado: diceType,
                    roll: roll,
                    sucessos: values.sucessos,
                    adaptacoes: values.adaptacoes,
                    pressoes: values.pressoes
                });
            } else {
                results.push({
                    dado: diceType,
                    roll: roll,
                    sucessos: 0,
                    adaptacoes: 0,
                    pressoes: 0
                })
            }
            const diceElement = document.querySelector(`#value-${diceType}`);
            diceElement.innerText = `0d${diceType.slice(1)}`;
        }
    });

    displayResult(results, player);

    if (player != "Assimilador Oculto") {
        if (results == "") {
            alert("Selecione os dados para a rolagem.")
        } else {
            displayResult(results, player);
            saveToFirebase(player, results);

        }
    } else {
        displayResult(results, player);
        console.log("Rolagem do Assimilador Oculto ocultada.")
    }
}

function animateDice(diceType) {
    const diceElement = document.querySelector(`#dice-${diceType}`);

    // Remove a animação anterior (caso já tenha sido aplicada)
    diceElement.style.animation = 'none';

    // Força o navegador a resetar a animação
    void diceElement.offsetWidth; // Esse truque reinicia a animação no navegador

    // Adiciona a animação de rotação de volta
    diceElement.style.animation = 'dice-roll 0.75s ease-out 2';
}

// Função para exibir o resultado
function displayResult(results, player) {
    const playerDiv = document.getElementById("divResults");

    const resultString = results.map(r =>
        `${r.dado} (${r.roll}): ${r.sucessos} sucesso${r.sucessos == 1 ? 's' : ''},` +
        `${r.adaptacoes} adaptaç${r.adaptacoes == 1 ? 'ão' : 'ões'}, ` +
        `${r.pressoes} press${r.adaptacoes == 1 ? 'ão' : 'ões'}.`
    ).join("<br>");

    playerDiv.innerHTML = `<strong>${player}:</strong><br>${resultString}`;
}

// Função para salvar os dados no Firebase
function saveToFirebase(player, results) {
    const rollData = {
        player,
        timestamp: new Date().toISOString(),
        results
    };

    rollsRef.push(rollData) // Adicionar dados com identificador único
        .then(() => console.log("Rolagem salva com sucesso no Firebase"))
        .catch(error => console.error("Erro ao salvar no Firebase:", error));
}

// Função para limpar o histórico local
function clearHistory() {
    rollsRef.remove()
        .then(() => {
            console.log("Histórico limpo com sucesso no Firebase");
            document.getElementById("historyList").innerHTML = ""; // Atualiza a interface
        })
        .catch(error => console.error("Erro ao limpar o histórico no Firebase:", error));
}