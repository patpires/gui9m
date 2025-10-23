// ========================================
// AVENTURA DE GUI - GAME LOGIC
// ========================================

// Estado do Jogo
const gameState = {
    // Recursos
    bricks: 0,
    tools: 0,
    equipment: 0,
    money: 0,
    
    // Progresso
    currentLevel: 1,
    workRate: 1,
    autoWorkRate: 0,
    
    // Áreas construídas
    areasBuilt: [],
    
    // Melhorias compradas
    upgradesPurchased: [],
    
    // Estatísticas
    totalClicks: 0,
    totalResourcesCollected: 0,
    decisionsCorrect: 0,
    decisionsWrong: 0,
    decisionsMade: [],
    
    // Configurações de jogo
    maxLevel: 3,
    premiumBonus: 0,
    qualityConstruction: false,
    fastConstruction: false,
    focusedExpansion: false,
    gameOverShown: false,
    
    // Bônus de eventos
    vipBonus: false,
    motivationBonus: 0,
    discountActive: false,
    
    // Tempo
    startTime: Date.now()
};

// Definição das Áreas da Academia
const gymAreas = [
    {
        id: 'reception',
        name: '🏢 Recepção',
        description: 'A entrada da academia, onde os alunos fazem matrícula',
        cost: { bricks: 20, tools: 10 },
        reward: { money: 100 }
    },
    {
        id: 'weights',
        name: '💪 Área de Musculação',
        description: 'Equipamentos de musculação e halteres',
        cost: { bricks: 40, tools: 20, equipment: 15, money: 80 },
        reward: { money: 200 }
    },
    {
        id: 'cardio',
        name: '🏃 Área Cardio',
        description: 'Esteiras, bicicletas e equipamentos aeróbicos',
        cost: { bricks: 35, tools: 15, equipment: 20, money: 70 },
        reward: { money: 150 }
    },
    {
        id: 'locker',
        name: '🚿 Vestiários',
        description: 'Vestiários com chuveiros e armários',
        cost: { bricks: 30, tools: 25, equipment: 10, money: 60 },
        reward: { money: 120 }
    }
];

// Definição das Melhorias
const upgrades = [
    {
        id: 'better_tools',
        name: '🔧 Ferramentas Melhores',
        description: 'Aumenta a coleta de recursos em +1',
        cost: { money: 100 },
        effect: () => { gameState.workRate += 1; },
        level: 1
    },
    {
        id: 'work_team',
        name: '👷 Equipe de Trabalho',
        description: 'Coleta automática de +1 recurso a cada 3 segundos',
        cost: { money: 200 },
        effect: () => { gameState.autoWorkRate += 1; startAutoWork(); },
        level: 1
    },
    {
        id: 'advanced_tools',
        name: '⚡ Ferramentas Avançadas',
        description: 'Aumenta a coleta de recursos em +2',
        cost: { money: 300 },
        effect: () => { gameState.workRate += 2; },
        level: 2,
        requires: 'better_tools'
    },
    {
        id: 'construction_robot',
        name: '🤖 Robô de Construção',
        description: 'Coleta automática de +3 recursos a cada 3 segundos',
        cost: { money: 500 },
        effect: () => { gameState.autoWorkRate += 3; startAutoWork(); },
        level: 2,
        requires: 'work_team'
    }
];

// Decisões Estratégicas
const decisions = [
    {
        id: 'equipment_choice',
        question: 'Um fornecedor oferece dois tipos de equipamentos:\n\nA) Equipamentos básicos mais baratos (ganha 10 equipamentos, perde 50 dinheiro)\nB) Equipamentos premium mais caros (ganha 5 equipamentos, perde 100 dinheiro, mas ganha bônus de +50 dinheiro por área construída)',
        options: [
            {
                text: 'A) Equipamentos Básicos (mais quantidade)',
                effect: () => {
                    gameState.equipment += 10;
                    gameState.money -= 50;
                    gameState.decisionsWrong++;
                    showCiroMessage('Hmm... Equipamentos básicos podem não trazer tanto retorno. Mas vamos em frente!');
                    setTimeout(checkGameOver, 1000);
                }
            },
            {
                text: 'B) Equipamentos Premium (melhor qualidade)',
                effect: () => {
                    gameState.equipment += 5;
                    gameState.money -= 100;
                    // Aplicar bônus imediato das áreas já construídas
                    const bonusImediato = gameState.areasBuilt.length * 50;
                    gameState.money += bonusImediato;
                    gameState.premiumBonus = 50;
                    gameState.decisionsCorrect++;
                    showCiroMessage(`Excelente! Equipamentos premium! Você ganhou R$ ${bonusImediato} de bônus pelas ${gameState.areasBuilt.length} áreas já construídas!`);
                }
            }
        ],
        trigger: () => gameState.areasBuilt.length >= 1 && !gameState.decisionsMade?.includes('equipment_choice')
    },
    {
        id: 'construction_method',
        question: 'Você pode escolher o método de construção:\n\nA) Construção Rápida (reduz custo de tijolos em 30% para a próxima área)\nB) Construção de Qualidade (próxima área construída dá o dobro de recompensa)',
        options: [
            {
                text: 'A) Construção Rápida (economizar recursos)',
                effect: () => {
                    gameState.fastConstruction = true;
                    gameState.decisionsWrong++;
                    showCiroMessage('Construção rápida pode comprometer a qualidade. Vamos torcer para dar certo!');
                    setTimeout(checkGameOver, 1000);
                }
            },
            {
                text: 'B) Construção de Qualidade (maior recompensa)',
                effect: () => {
                    gameState.qualityConstruction = true;
                    gameState.decisionsCorrect++;
                    showCiroMessage('Perfeito! Qualidade sempre compensa no final!');
                }
            }
        ],
        trigger: () => gameState.areasBuilt.length >= 2 && !gameState.decisionsMade?.includes('construction_method')
    },
    {
        id: 'expansion_plan',
        question: 'O Papai CIRO pergunta: como devemos expandir?\n\nA) Focar em uma área por vez (próxima construção custa 20% menos)\nB) Desenvolver todas as áreas simultaneamente (ganha 20 de cada recurso)',
        options: [
            {
                text: 'A) Focar em uma área (desconto)',
                effect: () => {
                    gameState.focusedExpansion = true;
                    gameState.decisionsCorrect++;
                    showCiroMessage('Estratégia focada! Isso nos ajudará a construir mais rápido!');
                }
            },
            {
                     text: 'B) Desenvolver tudo junto (ganhar recursos)',
                effect: () => {
                    gameState.bricks += 20;
                    gameState.tools += 20;
                    gameState.equipment += 20;
                    gameState.decisionsWrong++;
                    showCiroMessage('Desenvolver tudo ao mesmo tempo pode dispersar nossos esforços. Vamos ver no que dá!');
                    setTimeout(checkGameOver, 1000);
                }
            }
        ],
        trigger: () => gameState.areasBuilt.length >= 3 && !gameState.decisionsMade?.includes('expansion_plan')
    }
];

// ========================================
// FUNÇÕES DE SALVAMENTO
// ========================================

function saveGame() {
    try {
        localStorage.setItem('aventuraGUI_save', JSON.stringify(gameState));
    } catch (e) {
        console.log('Não foi possível salvar o jogo');
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('aventuraGUI_save');
        if (saved) {
            const savedState = JSON.parse(saved);
            Object.assign(gameState, savedState);
            return true;
        }
    } catch (e) {
        console.log('Não foi possível carregar o jogo');
    }
    return false;
}

function clearSaveAndStart() {
    if (confirm('Tem certeza que deseja apagar todo o progresso salvo e começar um novo jogo?')) {
        localStorage.removeItem('aventuraGUI_save');
        localStorage.removeItem('tutorial_completed');
        localStorage.removeItem('records');
        location.reload();
    }
}

// ========================================
// FUNÇÕES DE INICIALIZAÇÃO
// ========================================

function startGame() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    initializeGame();
    
    // Iniciar tutorial se for primeira vez
    if (typeof startTutorial === 'function') {
        setTimeout(() => {
            startTutorial();
        }, 500);
    } else {
        showCiroMessage('Bem-vindo à obra, GUI! Vamos construir uma academia incrível! Clique em "Trabalhar na Obra" para começar a coletar recursos!');
    }
}

function initializeGame() {
    // Tentar carregar jogo salvo
    const loaded = loadGame();
    
    if (!loaded) {
        gameState.decisionsMade = [];
    }
    
    // Sempre resetar flag de game over ao iniciar
    gameState.gameOverShown = false;
    
    renderUpgrades();
    renderAreas();
    updateUI();
    updateGymVisual();
    checkDecisions();
    
    // Iniciar salvamento automático a cada 5 segundos
    setInterval(saveGame, 5000);
}

function showInstructions() {
    // Criar modal de ajuda
    const modal = document.createElement('div');
    modal.id = 'help-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <h2>📋 Como Jogar</h2>
            <div class="instructions-content">
                <div class="instruction-item">
                    <h3>🎯 Objetivo</h3>
                    <p>Construir academias completas coletando recursos e fazendo escolhas estratégicas!</p>
                </div>
                <div class="instruction-item">
                    <h3>🔨 Coletar Recursos</h3>
                    <p>Clique no botão "Trabalhar na Obra" para coletar tijolos, ferramentas e equipamentos.</p>
                </div>
                <div class="instruction-item">
                    <h3>🏭 Construir Áreas</h3>
                    <p>Use seus recursos para construir diferentes áreas da academia: Recepção, Musculação, Cardio e Vestiários.</p>
                </div>
                <div class="instruction-item">
                    <h3>⚡ Melhorias</h3>
                    <p>Compre melhorias para coletar recursos mais rapidamente!</p>
                </div>
                <div class="instruction-item">
                    <h3>🎲 Decisões Estratégicas</h3>
                    <p>Durante o jogo, você terá que tomar decisões importantes que afetarão seu progresso!</p>
                </div>
                <div class="instruction-item">
                    <h3>⚠️ Atenção</h3>
                    <p>Se o dinheiro ZERAR (R$ 0), você perde! Se errar 2 decisões, também é Game Over!</p>
                </div>
            </div>
            <button class="btn-primary" onclick="hideInstructions()" style="width: 100%; margin-top: 1rem;">Entendi!</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideInstructions();
        }
    });
}

function hideInstructions() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.remove();
    }
}

// ========================================
// FUNÇÕES DE TRABALHO E COLETA
// ========================================

function work() {
    // Atualizar combo
    if (typeof updateCombo === 'function') {
        updateCombo();
    }
    
    // Incrementar recursos baseado na taxa de trabalho
    const resourceTypes = ['bricks', 'tools', 'equipment'];
    const randomResource = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    
    // Aplicar multiplicador de combo
    let comboMult = 1;
    if (typeof getComboMultiplier === 'function') {
        comboMult = getComboMultiplier();
    }
    
    // Aplicar bônus de motivação
    let motivationMult = 1;
    if (gameState.motivationBonus && gameState.motivationBonus > 0) {
        motivationMult = 2;
        gameState.motivationBonus--;
    }
    
    const totalGain = Math.floor(gameState.workRate * comboMult * motivationMult);
    
    gameState[randomResource] += totalGain;
    gameState.totalClicks++;
    gameState.totalResourcesCollected += totalGain;
    
    // Mostrar número flutuante
    if (typeof showResourceGain === 'function') {
        const workBtn = document.getElementById('work-btn');
        showResourceGain(randomResource, totalGain, workBtn);
    }
    
    // 20% de chance de ganhar dinheiro ao trabalhar (R$ 5-15)
    if (Math.random() < 0.2) {
        const moneyGained = Math.floor(Math.random() * 11) + 5; // 5 a 15
        gameState.money += moneyGained;
        // Mostrar feedback visual breve
        if (Math.random() < 0.3) { // Nem sempre mostrar mensagem para não poluir
            showCiroMessage(`💰 Você encontrou R$ ${moneyGained} na obra!`);
        }
    }
    
    // Animação de progresso
    animateWorkProgress();
    
    // Atualizar UI
    updateUI();
    
    // Forçar atualização dos botões de construção e melhorias
    renderAreas();
    renderUpgrades();
    
    // Salvar progresso
    saveGame();
    
    // Verificar game over por dinheiro zerado
    if (gameState.money === 0 && gameState.areasBuilt.length > 0) {
        setTimeout(() => {
            if (gameState.money === 0) {
                showGameOver('Você ficou sem dinheiro! Game Over!');
            }
        }, 1000);
    }
    
    // Verificar game over
    checkGameOver();
    
    // Verificar botões disponíveis (notificações)
    if (typeof checkNewlyAvailableButtons === 'function') {
        checkNewlyAvailableButtons();
    }
    
    // Verificar tutorial
    if (typeof checkTutorialWorkClick === 'function') {
        console.log('Chamando checkTutorialWorkClick');
        checkTutorialWorkClick();
    } else {
        console.log('checkTutorialWorkClick não está definida');
    }
    
    // Verificar decisões
    checkDecisions();
}

function animateWorkProgress() {
    const progressBar = document.getElementById('work-progress');
    progressBar.style.width = '100%';
    setTimeout(() => {
        progressBar.style.width = '0%';
    }, 300);
}

// Trabalho Automático
let autoWorkInterval;
function startAutoWork() {
    if (autoWorkInterval) return;
    
    autoWorkInterval = setInterval(() => {
        if (gameState.autoWorkRate > 0) {
            const resourceTypes = ['bricks', 'tools', 'equipment'];
            resourceTypes.forEach(resource => {
                gameState[resource] += gameState.autoWorkRate;
            });
            gameState.totalResourcesCollected += gameState.autoWorkRate * 3;
            updateUI();
        }
    }, 3000);
}

// ========================================
// FUNÇÕES DE CONSTRUÇÃO
// ========================================

function buildArea(areaId) {
    const area = gymAreas.find(a => a.id === areaId);
    if (!area) return;
    
    // Verificar se já foi construída
    if (gameState.areasBuilt.includes(areaId)) {
        showCiroMessage('Esta área já foi construída!');
        return;
    }
    
    // Calcular custo (com possíveis descontos)
    let cost = { ...area.cost };
    
    if (gameState.fastConstruction) {
        cost.bricks = Math.floor(cost.bricks * 0.7);
        gameState.fastConstruction = false;
    }
    
    if (gameState.focusedExpansion) {
        Object.keys(cost).forEach(key => {
            cost[key] = Math.floor(cost[key] * 0.8);
        });
        gameState.focusedExpansion = false;
    }
    
    // Desconto de evento (-30%)
    if (gameState.discountActive) {
        Object.keys(cost).forEach(key => {
            cost[key] = Math.floor(cost[key] * 0.7);
        });
        gameState.discountActive = false;
    }
    
    // Verificar se tem recursos suficientes
    if (!hasEnoughResources(cost)) {
        showCiroMessage('Recursos insuficientes! Continue trabalhando para coletar mais recursos.');
        return;
    }
    
    // Deduzir recursos
    Object.keys(cost).forEach(resource => {
        gameState[resource] -= cost[resource];
    });
    
    // Adicionar recompensa
    let reward = { ...area.reward };
    if (gameState.qualityConstruction) {
        reward.money *= 2;
        gameState.qualityConstruction = false;
    }
    
    if (gameState.premiumBonus) {
        reward.money += gameState.premiumBonus;
    }
    
    // Bônus VIP (+50%)
    if (gameState.vipBonus) {
        reward.money = Math.floor(reward.money * 1.5);
        gameState.vipBonus = false;
    }
    
    Object.keys(reward).forEach(resource => {
        gameState[resource] += reward[resource];
    });
    
    // Marcar como construída
    gameState.areasBuilt.push(areaId);
    
    // Verificar tutorial
    if (typeof checkTutorialBuild === 'function') {
        checkTutorialBuild(areaId);
    }
    
    // Efeitos visuais
    if (typeof shakeScreen === 'function') {
        shakeScreen();
    }
    if (typeof showConfetti === 'function') {
        showConfetti();
    }
    
    // Atualizar visualização
    updateGymVisual();
    renderAreas();
    updateUI();
    
    // Salvar progresso
    saveGame();
    
    // Mensagem de sucesso
    showCiroMessage(`🎉 ${area.name} construída com sucesso! Você ganhou R$ ${reward.money}!`);
    
    // Verificar decisões após construir
    setTimeout(checkDecisions, 1500);
    
    // Verificar vitória
    if (gameState.areasBuilt.length === gymAreas.length) {
        setTimeout(showLevelComplete, 1000);
    }
}

function hasEnoughResources(cost) {
    return Object.keys(cost).every(resource => {
        return gameState[resource] >= cost[resource];
    });
}

function updateGymVisual() {
    const gymVisual = document.getElementById('gym-visual');
    
    if (gameState.areasBuilt.length === 0) {
        gymVisual.innerHTML = '<div class="construction-message"><p>Comece a construir as áreas da academia!</p></div>';
    } else {
        gymVisual.innerHTML = '';
        gameState.areasBuilt.forEach(areaId => {
            const area = gymAreas.find(a => a.id === areaId);
            const areaDiv = document.createElement('div');
            areaDiv.className = 'area-built';
            areaDiv.textContent = area.name;
            gymVisual.appendChild(areaDiv);
        });
    }
    
    // Atualizar progresso total
    const progress = (gameState.areasBuilt.length / gymAreas.length) * 100;
    document.getElementById('total-progress').textContent = Math.round(progress);
    document.getElementById('total-progress-bar').style.width = progress + '%';
}

// ========================================
// FUNÇÕES DE MELHORIAS
// ========================================

function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;
    
    // Verificar se já foi comprada
    if (gameState.upgradesPurchased.includes(upgradeId)) {
        showCiroMessage('Esta melhoria já foi comprada!');
        return;
    }
    
    // Verificar pré-requisitos
    if (upgrade.requires && !gameState.upgradesPurchased.includes(upgrade.requires)) {
        showCiroMessage('Você precisa comprar a melhoria anterior primeiro!');
        return;
    }
    
    // Verificar nível
    if (upgrade.level > gameState.currentLevel) {
        showCiroMessage('Esta melhoria estará disponível em níveis mais avançados!');
        return;
    }
    
    // Verificar recursos
    if (!hasEnoughResources(upgrade.cost)) {
        showCiroMessage('Dinheiro insuficiente para esta melhoria!');
        return;
    }
    
    // Deduzir custo
    Object.keys(upgrade.cost).forEach(resource => {
        gameState[resource] -= upgrade.cost[resource];
    });
    
    // Aplicar efeito
    upgrade.effect();
    
    // Marcar como comprada
    gameState.upgradesPurchased.push(upgradeId);
    
    // Atualizar UI
    renderUpgrades();
    updateUI();
    
    // Salvar progresso
    saveGame();
    
    showCiroMessage(`✅ ${upgrade.name} comprada! ${upgrade.description}`);
}

// ========================================
// FUNÇÕES DE DECISÕES
// ========================================

function checkDecisions() {
    const availableDecision = decisions.find(d => 
        d.trigger() && !gameState.decisionsMade.includes(d.id)
    );
    
    if (availableDecision) {
        showDecision(availableDecision);
    }
}

function showDecision(decision) {
    const modal = document.getElementById('decision-modal');
    const questionEl = document.getElementById('decision-question');
    const optionsEl = document.getElementById('decision-options');
    
    questionEl.textContent = decision.question;
    optionsEl.innerHTML = '';
    
    decision.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'decision-option';
        optionDiv.textContent = option.text;
        optionDiv.onclick = () => {
            option.effect();
            gameState.decisionsMade.push(decision.id);
            modal.classList.remove('active');
            updateUI();
        };
        optionsEl.appendChild(optionDiv);
    });
    
    modal.classList.add('active');
}

// ========================================
// FUNÇÕES DE UI
// ========================================

function updateUI() {
    // Atualizar recursos
    document.getElementById('bricks').textContent = Math.floor(gameState.bricks);
    document.getElementById('tools').textContent = Math.floor(gameState.tools);
    document.getElementById('equipment').textContent = Math.floor(gameState.equipment);
    document.getElementById('money').textContent = Math.floor(gameState.money);
    
    // Atualizar nível
    document.getElementById('current-level').textContent = gameState.currentLevel;
    
    // Atualizar taxa de trabalho
    document.getElementById('work-rate').textContent = gameState.workRate;
}

function renderUpgrades() {
    const upgradesList = document.getElementById('upgrades-list');
    upgradesList.innerHTML = '';
    
    upgrades.forEach(upgrade => {
        if (upgrade.level > gameState.currentLevel) return;
        if (gameState.upgradesPurchased.includes(upgrade.id)) return;
        
        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgrade-item';
        upgradeDiv.setAttribute('data-upgrade-id', upgrade.id);
        
        const canAfford = hasEnoughResources(upgrade.cost);
        const hasRequirements = !upgrade.requires || gameState.upgradesPurchased.includes(upgrade.requires);
        
        upgradeDiv.innerHTML = `
            <h4>${upgrade.name}</h4>
            <p>${upgrade.description}</p>
            <p class="upgrade-cost">💰 R$ ${upgrade.cost.money}</p>
            <button class="btn-build" onclick="buyUpgrade('${upgrade.id}')" 
                ${!canAfford || !hasRequirements ? 'disabled' : ''}>
                ${hasRequirements ? 'Comprar' : 'Bloqueado'}
            </button>
        `;
        
        upgradesList.appendChild(upgradeDiv);
    });
    
    if (upgradesList.children.length === 0) {
        upgradesList.innerHTML = '<p style="color: #888; text-align: center;">Todas as melhorias compradas!</p>';
    }
}

function renderAreas() {
    const areasList = document.getElementById('areas-list');
    areasList.innerHTML = '';
    
    gymAreas.forEach(area => {
        const areaDiv = document.createElement('div');
        areaDiv.className = 'area-item';
        areaDiv.setAttribute('data-area-id', area.id);
        
        const isBuilt = gameState.areasBuilt.includes(area.id);
        if (isBuilt) {
            areaDiv.classList.add('completed');
        }
        
        const canAfford = hasEnoughResources(area.cost);
        
        areaDiv.innerHTML = `
            <h4>${area.name}</h4>
            <p>${area.description}</p>
            <div class="area-cost">
                ${area.cost.bricks ? `🧱 ${area.cost.bricks} ` : ''}
                ${area.cost.tools ? `🔨 ${area.cost.tools} ` : ''}
                ${area.cost.equipment ? `💪 ${area.cost.equipment} ` : ''}
                ${area.cost.money ? `💰 R$ ${area.cost.money}` : ''}
            </div>
            ${isBuilt ? 
                '<p style="font-weight: bold;">✅ Construída!</p>' :
                `<button class="btn-build" data-area="${area.id}" onclick="buildArea('${area.id}')" ${!canAfford ? 'disabled' : ''}>
                    Construir
                </button>`
            }
        `;
        
        areasList.appendChild(areaDiv);
    });
}

function showCiroMessage(message) {
    document.getElementById('ciro-message').textContent = message;
}

// ========================================
// FUNÇÕES DE VITÓRIA E PROGRESSÃO
// ========================================

function showVictory() {
    const modal = document.getElementById('victory-modal');
    const messageEl = document.getElementById('victory-message');
    const statsEl = document.getElementById('victory-stats');
    
    const timePlayed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(timePlayed / 60);
    const seconds = timePlayed % 60;
    
    messageEl.textContent = `Parabéns! Você completou a Academia #${gameState.currentLevel}! O Papai CIRO está muito orgulhoso!`;
    
    statsEl.innerHTML = `
        <p><strong>📊 Estatísticas:</strong></p>
        <p>⏱️ Tempo: ${minutes}m ${seconds}s</p>
        <p>🖱️ Cliques: ${gameState.totalClicks}</p>
        <p>📦 Recursos coletados: ${gameState.totalResourcesCollected}</p>
        <p>✅ Decisões estratégicas corretas: ${gameState.decisionsCorrect}</p>
        <p>💰 Dinheiro final: R$ ${gameState.money}</p>
    `;
    
    modal.classList.add('active');
}

function nextLevel() {
    // Incrementar nível
    gameState.currentLevel++;
    
    // Manter alguns recursos e melhorias
    const moneyCarryOver = Math.floor(gameState.money * 0.5);
    
    // Resetar estado mantendo progressão
    gameState.bricks = 0;
    gameState.tools = 0;
    gameState.equipment = 0;
    gameState.money = moneyCarryOver;
    gameState.areasBuilt = [];
    gameState.decisionsMade = [];
    gameState.startTime = Date.now();
    gameState.totalClicks = 0;
    gameState.totalResourcesCollected = 0;
    gameState.decisionsCorrect = 0;
    
    // Fechar modal
    document.getElementById('victory-modal').classList.remove('active');
    
    // Reinicializar jogo
    renderAreas();
    renderUpgrades();
    updateGymVisual();
    updateUI();
    
    showCiroMessage(`Bem-vindo à Academia #${gameState.currentLevel}! Esta será ainda mais desafiadora! Você começa com R$ ${moneyCarryOver} da academia anterior.`);
}

function celebrateAndReset() {
    document.getElementById('victory-modal').classList.remove('active');
    resetGame();
}

function resetGame() {
    if (confirm('Tem certeza que deseja recomeçar? Todo o progresso será perdido.')) {
        // Resetar completamente
        gameState.bricks = 0;
        gameState.tools = 0;
        gameState.equipment = 0;
        gameState.money = 0;
        gameState.currentLevel = 1;
        gameState.workRate = 1;
        gameState.autoWorkRate = 0;
        gameState.areasBuilt = [];
        gameState.upgradesPurchased = [];
        gameState.decisionsMade = [];
        gameState.totalClicks = 0;
        gameState.totalResourcesCollected = 0;
        gameState.decisionsCorrect = 0;
        gameState.startTime = Date.now();
        
        // Parar trabalho automático
        if (autoWorkInterval) {
            clearInterval(autoWorkInterval);
            autoWorkInterval = null;
        }
        
        // Reinicializar
        renderAreas();
        renderUpgrades();
        updateGymVisual();
        updateUI();
        
        showCiroMessage('Vamos começar uma nova aventura, GUI!');
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

// Atualizar UI inicial quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

