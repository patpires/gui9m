// ========================================
// SISTEMA DE NOTIFICAÇÕES TOAST
// ========================================

let lastNotifiedButtons = {
    areas: [],
    upgrades: []
};

function showToast(message, duration = 3000) {
    // Remover toast anterior se existir
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Criar novo toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remover após duração
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function checkNewlyAvailableButtons() {
    // Verificar áreas disponíveis
    const availableAreas = gymAreas.filter(area => {
        if (gameState.areasBuilt.includes(area.id)) return false;
        return hasEnoughResources(area.cost);
    });
    
    availableAreas.forEach(area => {
        if (!lastNotifiedButtons.areas.includes(area.id)) {
            lastNotifiedButtons.areas.push(area.id);
            showToast(`✨ ${area.name} disponível para construir!`);
            
            // Adicionar classe de destaque
            setTimeout(() => {
                const areaElement = document.querySelector(`[data-area-id="${area.id}"]`);
                if (areaElement) {
                    areaElement.classList.add('newly-available');
                    setTimeout(() => areaElement.classList.remove('newly-available'), 3000);
                }
            }, 100);
        }
    });
    
    // Verificar melhorias disponíveis
    const availableUpgrades = upgrades.filter(upgrade => {
        if (gameState.upgradesPurchased.includes(upgrade.id)) return false;
        const hasRequirements = !upgrade.requires || 
            (Array.isArray(upgrade.requires) && upgrade.requires.every(req => gameState.upgradesPurchased.includes(req)));
        if (!hasRequirements) return false;
        return gameState.money >= upgrade.cost.money;
    });
    
    availableUpgrades.forEach(upgrade => {
        if (!lastNotifiedButtons.upgrades.includes(upgrade.id)) {
            lastNotifiedButtons.upgrades.push(upgrade.id);
            showToast(`⚡ ${upgrade.name} disponível para comprar!`);
            
            // Adicionar classe de destaque
            setTimeout(() => {
                const upgradeElement = document.querySelector(`[data-upgrade-id="${upgrade.id}"]`);
                if (upgradeElement) {
                    upgradeElement.classList.add('newly-available');
                    setTimeout(() => upgradeElement.classList.remove('newly-available'), 3000);
                }
            }, 100);
        }
    });
    
    // Limpar notificações de itens que não estão mais disponíveis
    lastNotifiedButtons.areas = lastNotifiedButtons.areas.filter(id => 
        availableAreas.some(area => area.id === id)
    );
    lastNotifiedButtons.upgrades = lastNotifiedButtons.upgrades.filter(id => 
        availableUpgrades.some(upgrade => upgrade.id === id)
    );
}

// Adicionar navegação rápida para mobile
function addQuickNavigation() {
    if (window.innerWidth > 768) return;
    
    // Verificar se já existe
    if (document.querySelector('.quick-nav')) return;
    
    const nav = document.createElement('div');
    nav.className = 'quick-nav';
    nav.innerHTML = `
        <button class="quick-nav-btn" onclick="scrollToSection('actions')" title="Ações">🔨</button>
        <button class="quick-nav-btn" onclick="scrollToSection('areas')" title="Áreas">🏗️</button>
        <button class="quick-nav-btn" onclick="scrollToSection('upgrades')" title="Melhorias">⚡</button>
        <button class="quick-nav-btn" onclick="scrollToTop()" title="Voltar ao topo">⬆️</button>
    `;
    document.body.appendChild(nav);
}

function scrollToSection(section) {
    let element;
    switch(section) {
        case 'actions':
            element = document.querySelector('.left-panel');
            break;
        case 'areas':
            element = document.querySelector('.right-panel');
            break;
        case 'upgrades':
            element = document.querySelector('#upgrades-list');
            break;
    }
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar ao carregar o jogo
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        addQuickNavigation();
    });
}

