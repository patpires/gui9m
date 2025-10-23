// ========================================
// SISTEMA DE COMBO/STREAK
// ========================================

let comboState = {
    streak: 0,
    multiplier: 1,
    lastClickTime: 0,
    comboTimeout: null
};

function updateCombo() {
    const now = Date.now();
    const timeSinceLastClick = now - comboState.lastClickTime;
    
    // Se passou mais de 3 segundos, reseta combo
    if (timeSinceLastClick > 3000 && comboState.streak > 0) {
        resetCombo();
        return;
    }
    
    // Incrementa streak
    comboState.streak++;
    comboState.lastClickTime = now;
    
    // Calcula multiplicador baseado no streak
    if (comboState.streak >= 20) {
        comboState.multiplier = 2.5;
    } else if (comboState.streak >= 10) {
        comboState.multiplier = 2;
    } else if (comboState.streak >= 5) {
        comboState.multiplier = 1.5;
    } else {
        comboState.multiplier = 1;
    }
    
    // Mostrar indicador de combo
    if (comboState.multiplier > 1) {
        showComboIndicator();
    }
    
    // Limpar timeout anterior
    if (comboState.comboTimeout) {
        clearTimeout(comboState.comboTimeout);
    }
    
    // Configurar novo timeout para resetar combo
    comboState.comboTimeout = setTimeout(() => {
        resetCombo();
    }, 3000);
}

function resetCombo() {
    if (comboState.streak > 0) {
        hideComboIndicator();
    }
    comboState.streak = 0;
    comboState.multiplier = 1;
}

function showComboIndicator() {
    let indicator = document.getElementById('combo-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'combo-indicator';
        indicator.className = 'combo-indicator';
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = `🔥 COMBO x${comboState.multiplier.toFixed(1)}!`;
    indicator.style.display = 'block';
    
    // Animação de pulse
    indicator.classList.remove('combo-pulse');
    void indicator.offsetWidth; // Trigger reflow
    indicator.classList.add('combo-pulse');
}

function hideComboIndicator() {
    const indicator = document.getElementById('combo-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function getComboMultiplier() {
    return comboState.multiplier;
}

// ========================================
// SISTEMA DE NÚMEROS FLUTUANTES
// ========================================

function showFloatingNumber(text, x, y, color = '#4CAF50') {
    const floating = document.createElement('div');
    floating.className = 'floating-number';
    floating.textContent = text;
    floating.style.left = x + 'px';
    floating.style.top = y + 'px';
    floating.style.color = color;
    
    document.body.appendChild(floating);
    
    // Remover após animação
    setTimeout(() => {
        floating.remove();
    }, 2000);
}

function showResourceGain(resource, amount, element) {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    let icon = '';
    let color = '#4CAF50';
    
    switch(resource) {
        case 'bricks':
            icon = '🧱';
            color = '#e74c3c';
            break;
        case 'tools':
            icon = '🔨';
            color = '#95a5a6';
            break;
        case 'equipment':
            icon = '💪';
            color = '#f39c12';
            break;
        case 'money':
            icon = '💰';
            color = '#2ecc71';
            break;
    }
    
    showFloatingNumber(`${icon} +${amount}`, x, y, color);
}

// ========================================
// SISTEMA DE MINI-EVENTOS
// ========================================

const miniEvents = [
    {
        id: 'donation',
        title: '🎁 Doação de Materiais!',
        message: 'Um fornecedor doou materiais para a obra!',
        effect: () => {
            const amount = 20;
            gameState.bricks += amount;
            gameState.tools += amount;
            gameState.equipment += amount;
            return `Você ganhou ${amount} de cada recurso!`;
        },
        chance: 0.15
    },
    {
        id: 'inspection',
        title: '✅ Inspeção Aprovada!',
        message: 'A prefeitura aprovou a obra com louvor!',
        effect: () => {
            const bonus = 100;
            gameState.money += bonus;
            return `Você ganhou R$ ${bonus} de bônus!`;
        },
        chance: 0.12
    },
    {
        id: 'vip_client',
        title: '⭐ Cliente VIP!',
        message: 'Um cliente especial visitou a obra!',
        effect: () => {
            gameState.vipBonus = true;
            return 'Próxima área construída dá +50% de recompensa!';
        },
        chance: 0.10
    },
    {
        id: 'lucky_find',
        title: '💎 Achado da Sorte!',
        message: 'GUI encontrou algo valioso na obra!',
        effect: () => {
            const money = Math.floor(Math.random() * 100) + 50;
            gameState.money += money;
            return `Você encontrou R$ ${money}!`;
        },
        chance: 0.15
    },
    {
        id: 'motivation',
        title: '💪 Equipe Motivada!',
        message: 'A equipe está super motivada hoje!',
        effect: () => {
            gameState.motivationBonus = 5; // 5 cliques com bônus
            return 'Próximos 5 cliques rendem o dobro!';
        },
        chance: 0.13
    },
    {
        id: 'discount',
        title: '🏷️ Desconto Especial!',
        message: 'Fornecedor ofereceu desconto!',
        effect: () => {
            gameState.discountActive = true;
            return 'Próxima construção custa 30% menos!';
        },
        chance: 0.10
    }
];

let eventState = {
    lastEventTime: 0,
    eventCooldown: 30000, // 30 segundos entre eventos
    activeEvent: null
};

function checkRandomEvent() {
    const now = Date.now();
    
    // Verificar cooldown
    if (now - eventState.lastEventTime < eventState.eventCooldown) {
        return;
    }
    
    // Só dispara eventos após ter construído pelo menos 1 área
    if (gameState.areasBuilt.length === 0) {
        return;
    }
    
    // Chance de evento acontecer (20% a cada verificação)
    if (Math.random() > 0.2) {
        return;
    }
    
    // Selecionar evento aleatório baseado nas chances
    const availableEvents = miniEvents.filter(e => Math.random() < e.chance);
    if (availableEvents.length === 0) return;
    
    const event = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    
    // Disparar evento
    triggerMiniEvent(event);
    eventState.lastEventTime = now;
}

function triggerMiniEvent(event) {
    eventState.activeEvent = event;
    
    // Aplicar efeito
    const result = event.effect();
    
    // Mostrar modal de evento
    showEventModal(event, result);
    
    // Atualizar UI
    updateUI();
    renderAreas();
    renderUpgrades();
    
    // Salvar
    saveGame();
}

function showEventModal(event, result) {
    // Criar modal se não existir
    let modal = document.getElementById('event-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'event-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content event-modal-content">
                <div class="event-icon"></div>
                <h2 class="event-title"></h2>
                <p class="event-message"></p>
                <p class="event-result"></p>
                <button class="btn-primary" onclick="closeEventModal()">Legal! 🎉</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Preencher conteúdo
    modal.querySelector('.event-title').textContent = event.title;
    modal.querySelector('.event-message').textContent = event.message;
    modal.querySelector('.event-result').textContent = result;
    
    // Mostrar modal
    modal.style.display = 'flex';
    
    // Adicionar animação
    const content = modal.querySelector('.modal-content');
    content.classList.add('event-appear');
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// ANIMAÇÕES E EFEITOS VISUAIS
// ========================================

function shakeScreen() {
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
}

function showConfetti() {
    // Criar confetes
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function pulseElement(element) {
    if (!element) return;
    element.classList.add('pulse-animation');
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, 600);
}

// ========================================
// INICIALIZAÇÃO
// ========================================

// Verificar eventos aleatórios a cada 10 segundos
setInterval(checkRandomEvent, 10000);

// Exportar funções globais
window.updateCombo = updateCombo;
window.getComboMultiplier = getComboMultiplier;
window.showResourceGain = showResourceGain;
window.showFloatingNumber = showFloatingNumber;
window.shakeScreen = shakeScreen;
window.showConfetti = showConfetti;
window.pulseElement = pulseElement;
window.closeEventModal = closeEventModal;

