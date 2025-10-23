// ========================================
// TUTORIAL SIMPLIFICADO - SEM INTERAÇÃO OBRIGATÓRIA
// ========================================

const tutorialSteps = [
    {
        id: 'welcome',
        title: 'Bem-vindo à Aventura de GUI! 🎉',
        message: 'Olá! Eu sou o Papai CIRO e vou te mostrar como funciona o jogo!',
        target: null,
        duration: 3000
    },
    {
        id: 'resources',
        title: 'Recursos da Obra 📦',
        message: 'Aqui você vê seus recursos: Tijolos 🧱, Ferramentas 🔨, Equipamentos 💪 e Dinheiro 💰.',
        target: '.resources-panel',
        duration: 4000
    },
    {
        id: 'work_button',
        title: 'Trabalhar na Obra 🔨',
        message: 'Clique neste botão para coletar recursos! Cada clique te dá tijolos, ferramentas ou equipamentos.',
        target: '#work-btn',
        duration: 4000,
        highlight: true
    },
    {
        id: 'combo',
        title: 'Sistema de Combo 🔥',
        message: 'Clique rapidamente para ativar o COMBO e ganhar MAIS recursos!',
        target: '#work-btn',
        duration: 3000
    },
    {
        id: 'areas',
        title: 'Áreas para Construir 🏗️',
        message: 'Use recursos para construir as 4 áreas da academia. Cada construção te dá dinheiro!',
        target: '.right-panel',
        duration: 4000
    },
    {
        id: 'upgrades',
        title: 'Melhorias ⚡',
        message: 'Com dinheiro, compre melhorias que aumentam sua coleta ou fazem coleta automática!',
        target: '.upgrades-panel',
        duration: 4000
    },
    {
        id: 'decisions',
        title: 'Decisões Estratégicas 🎲',
        message: 'Tome decisões importantes durante o jogo! Elas aparecem após construir áreas.',
        target: null,
        duration: 4000
    },
    {
        id: 'events',
        title: 'Mini-Eventos 🎁',
        message: 'Eventos aleatórios podem te dar bônus ou desafios. Fique atento!',
        target: null,
        duration: 3000
    },
    {
        id: 'goal',
        title: 'Objetivo do Jogo 🎯',
        message: 'Construa todas as 4 áreas! Complete 3 academias para ZERAR o jogo e ganhar o Prêmio ConstruBusiness!',
        target: '.construction-area',
        duration: 5000
    },
    {
        id: 'warning',
        title: 'Atenção! ⚠️',
        message: 'Se o dinheiro ZERAR (R$ 0), você perde! Se errar 2 decisões, também é Game Over!',
        target: null,
        duration: 4000
    },
    {
        id: 'end',
        title: 'Pronto para Começar! 🚀',
        message: 'Agora você sabe tudo! Boa sorte na construção das academias, GUI!',
        target: null,
        duration: 3000
    }
];

const tutorialState = {
    active: false,
    currentStep: 0,
    autoAdvanceTimer: null
};

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

function startTutorial() {
    // Verificar se já completou tutorial
    const completed = localStorage.getItem('tutorial_completed');
    if (completed === 'true') {
        return;
    }
    
    tutorialState.active = true;
    tutorialState.currentStep = 0;
    
    showTutorialStep(0);
}

function showTutorialStep(stepIndex) {
    if (stepIndex >= tutorialSteps.length) {
        completeTutorial();
        return;
    }
    
    const step = tutorialSteps[stepIndex];
    tutorialState.currentStep = stepIndex;
    
    // Criar/atualizar overlay e dialog
    createTutorialOverlay(step);
    createTutorialDialog(step, stepIndex);
    
    // Avançar automaticamente após duração
    tutorialState.autoAdvanceTimer = setTimeout(() => {
        nextTutorialStep();
    }, step.duration);
}

function nextTutorialStep() {
    clearTimeout(tutorialState.autoAdvanceTimer);
    removeTutorialElements();
    
    setTimeout(() => {
        showTutorialStep(tutorialState.currentStep + 1);
    }, 300);
}

function skipTutorial() {
    clearTimeout(tutorialState.autoAdvanceTimer);
    removeTutorialElements();
    tutorialState.active = false;
    localStorage.setItem('tutorial_completed', 'true');
}

function completeTutorial() {
    removeTutorialElements();
    tutorialState.active = false;
    localStorage.setItem('tutorial_completed', 'true');
    
    // Mensagem final
    if (typeof showCiroMessage === 'function') {
        showCiroMessage('Tutorial concluído! Agora é com você! Boa sorte! 🎉');
    }
}

function resetTutorial() {
    localStorage.removeItem('tutorial_completed');
    tutorialState.active = false;
    tutorialState.currentStep = 0;
}

// ========================================
// CRIAÇÃO DE ELEMENTOS
// ========================================

function createTutorialOverlay(step) {
    // Remover overlay anterior
    const oldOverlay = document.getElementById('tutorial-overlay');
    if (oldOverlay) oldOverlay.remove();
    
    // Criar novo overlay
    const overlay = document.createElement('div');
    overlay.id = 'tutorial-overlay';
    overlay.className = 'tutorial-overlay';
    document.body.appendChild(overlay);
    
    // Destacar elemento alvo
    if (step.target && step.highlight) {
        const targetElement = document.querySelector(step.target);
        if (targetElement) {
            targetElement.classList.add('tutorial-highlight');
            
            // Criar seta apontando
            createArrow(targetElement);
        }
    }
}

function createTutorialDialog(step, stepIndex) {
    // Remover dialog anterior
    const oldDialog = document.getElementById('tutorial-dialog');
    if (oldDialog) oldDialog.remove();
    
    // Criar dialog
    const dialog = document.createElement('div');
    dialog.id = 'tutorial-dialog';
    dialog.className = 'tutorial-dialog';
    
    const progress = Math.round(((stepIndex + 1) / tutorialSteps.length) * 100);
    
    dialog.innerHTML = `
        <div class="tutorial-header">
            <img src="ciro_character.png" alt="CIRO" class="tutorial-ciro">
            <div class="tutorial-progress">Passo ${stepIndex + 1} de ${tutorialSteps.length}</div>
        </div>
        <h3 class="tutorial-title">${step.title}</h3>
        <p class="tutorial-message">${step.message}</p>
        <div class="tutorial-progress-bar">
            <div class="tutorial-progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="tutorial-actions">
            <button class="btn-secondary tutorial-skip" onclick="skipTutorial()">Pular Tutorial</button>
            <button class="btn-primary tutorial-next" onclick="nextTutorialStep()">Próximo →</button>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Animação de entrada
    setTimeout(() => {
        dialog.classList.add('tutorial-show');
    }, 50);
}

function createArrow(targetElement) {
    const arrow = document.createElement('div');
    arrow.className = 'tutorial-arrow';
    arrow.innerHTML = '👇';
    arrow.id = 'tutorial-arrow';
    
    const rect = targetElement.getBoundingClientRect();
    arrow.style.position = 'fixed';
    arrow.style.left = `${rect.left + rect.width / 2 - 20}px`;
    arrow.style.top = `${rect.top - 60}px`;
    arrow.style.zIndex = '10002';
    
    document.body.appendChild(arrow);
}

function removeTutorialElements() {
    // Remover overlay
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) overlay.remove();
    
    // Remover dialog
    const dialog = document.getElementById('tutorial-dialog');
    if (dialog) {
        dialog.classList.remove('tutorial-show');
        setTimeout(() => dialog.remove(), 300);
    }
    
    // Remover highlight
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });
    
    // Remover seta
    const arrow = document.getElementById('tutorial-arrow');
    if (arrow) arrow.remove();
}

