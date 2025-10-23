// ========================================
// SISTEMA DE GAME OVER E VITÓRIA
// ========================================

function checkGameOver() {
    // Não verificar se já mostrou game over
    if (gameState.gameOverShown) return;
    
    // Verificar se perdeu por decisões erradas
    if (gameState.decisionsWrong >= 2) {
        gameState.gameOverShown = true;
        showGameOver('Você tomou muitas decisões arriscadas!', 'decisoes');
        return;
    }
    
    // Verificar se perdeu por falta de recursos (não consegue mais progredir)
    // Só verifica se já construiu pelo menos 1 área (para não dar game over no início)
    if (gameState.areasBuilt.length > 0 && gameState.areasBuilt.length < gymAreas.length) {
        // Verificar se tem recursos suficientes para construir alguma área
        const canBuildSomething = gymAreas.some(area => {
            if (gameState.areasBuilt.includes(area.id)) return false;
            return hasEnoughResources(area.cost);
        });
        
        // Verificar se tem dinheiro para comprar melhorias
        const canBuyUpgrade = upgrades.some(upgrade => {
            if (gameState.upgradesPurchased.includes(upgrade.id)) return false;
            return gameState.money >= upgrade.cost.money;
        });
        
        // Só dá game over se não pode construir E não pode comprar melhorias E tem poucos recursos
        const totalResources = gameState.bricks + gameState.tools + gameState.equipment + gameState.money;
        
        if (!canBuildSomething && !canBuyUpgrade && totalResources < 50) {
            gameState.gameOverShown = true;
            showGameOver('Você ficou sem recursos e não pode mais progredir!', 'recursos');
            return;
        }
    }
}

function showGameOver(reason, type) {
    const modal = document.getElementById('gameover-modal');
    const messageEl = document.getElementById('gameover-message');
    const statsEl = document.getElementById('gameover-stats');
    
    const elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    messageEl.textContent = `😢 ${reason}`;
    
    statsEl.innerHTML = `
        <p><strong>📊 Estatísticas Finais:</strong></p>
        <p>🏗️ Áreas construídas: ${gameState.areasBuilt.length}/${gymAreas.length}</p>
        <p>⏱️ Tempo jogado: ${minutes}m ${seconds}s</p>
        <p>🖱️ Cliques: ${gameState.totalClicks}</p>
        <p>✅ Decisões corretas: ${gameState.decisionsCorrect}</p>
        <p>❌ Decisões erradas: ${gameState.decisionsWrong}</p>
        <p>💰 Dinheiro final: R$ ${gameState.money}</p>
    `;
    
    modal.classList.add('active');
    
    // Salvar que perdeu
    saveGame();
}

function calculateMedal(timeInSeconds, decisionsCorrect, decisionsWrong) {
    // Critérios para medalhas
    const perfectDecisions = decisionsWrong === 0 && decisionsCorrect >= 2;
    
    if (timeInSeconds <= 180 && perfectDecisions) {
        return { medal: '🥇', name: 'Ouro', color: '#FFD700', message: 'DESEMPENHO EXCEPCIONAL!' };
    } else if (timeInSeconds <= 300 && decisionsCorrect >= 1) {
        return { medal: '🥈', name: 'Prata', color: '#C0C0C0', message: 'MUITO BOM!' };
    } else if (timeInSeconds <= 420) {
        return { medal: '🥉', name: 'Bronze', color: '#CD7F32', message: 'BOM TRABALHO!' };
    } else {
        return { medal: '🏅', name: 'Participação', color: '#888', message: 'CONTINUE PRATICANDO!' };
    }
}

function saveRecord(level, timeInSeconds, medal) {
    try {
        const records = JSON.parse(localStorage.getItem('aventuraGUI_records') || '{}');
        
        if (!records[level] || timeInSeconds < records[level].time) {
            records[level] = {
                time: timeInSeconds,
                medal: medal.name,
                date: new Date().toISOString()
            };
            localStorage.setItem('aventuraGUI_records', JSON.stringify(records));
            return true; // Novo recorde!
        }
    } catch (e) {
        console.log('Erro ao salvar recorde');
    }
    return false;
}

function showLevelComplete() {
    const modal = document.getElementById('level-complete-modal');
    const messageEl = document.getElementById('level-message');
    const statsEl = document.getElementById('level-stats');
    
    const elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    // Calcular medalha
    const medalInfo = calculateMedal(elapsedTime, gameState.decisionsCorrect, gameState.decisionsWrong);
    const isNewRecord = saveRecord(gameState.currentLevel, elapsedTime, medalInfo);
    
    if (gameState.currentLevel >= gameState.maxLevel) {
        // VITÓRIA FINAL!
        messageEl.innerHTML = `
            <h2>🏆 PARABÉNS! VOCÊ VENCEU! 🏆</h2>
            <h3>🎯️ Prêmio Qualidade ConstruBusiness Sinaprocim 🎯️</h3>
            <p>Você construiu ${gameState.maxLevel} academias de sucesso e se tornou um MILIONÁRIO!</p>
            <div style="font-size: 4rem; margin: 1rem 0;">${medalInfo.medal}</div>
            <h3 style="color: ${medalInfo.color};">Medalha de ${medalInfo.name}</h3>
            <p style="font-size: 1.2rem; font-weight: bold;">${medalInfo.message}</p>
            ${isNewRecord ? '<p style="color: gold; font-size: 1.1rem;">⭐ NOVO RECORDE! ⭐</p>' : ''}
        `;
        
        statsEl.innerHTML = `
            <p><strong>📊 Estatísticas Finais:</strong></p>
            <p>🏗️ Academias construídas: ${gameState.currentLevel}</p>
            <p>⏱️ Tempo total: ${minutes}m ${seconds}s</p>
            <p>🖱️ Total de cliques: ${gameState.totalClicks}</p>
            <p>✅ Decisões corretas: ${gameState.decisionsCorrect}</p>
            <p>❌ Decisões erradas: ${gameState.decisionsWrong}</p>
            <p>💰 Dinheiro acumulado: R$ ${gameState.money}</p>
            <p style="color: gold; font-size: 1.3rem; margin-top: 1rem;">🌟 VOCÊ É UM MESTRE CONSTRUTOR! 🌟</p>
        `;
        
        // Esconder botão de próximo nível, mostrar só celebrar
        document.getElementById('btn-next-level').style.display = 'none';
        document.getElementById('btn-celebrate').textContent = 'Jogar Novamente';
        
    } else {
        // Nível intermediário completo
        messageEl.innerHTML = `
            <h2>🎉 Academia #${gameState.currentLevel} Completa! 🎉</h2>
            <div style="font-size: 3rem; margin: 1rem 0;">${medalInfo.medal}</div>
            <h3 style="color: ${medalInfo.color};">Medalha de ${medalInfo.name}</h3>
            <p style="font-size: 1.1rem; font-weight: bold;">${medalInfo.message}</p>
            ${isNewRecord ? '<p style="color: gold;">⭐ NOVO RECORDE PESSOAL! ⭐</p>' : ''}
            <p>Parabéns! O Papai CIRO está muito orgulhoso!</p>
            <p>Pronto para o próximo desafio?</p>
        `;
        
        statsEl.innerHTML = `
            <p><strong>📊 Estatísticas desta Academia:</strong></p>
            <p>⏱️ Tempo: ${minutes}m ${seconds}s</p>
            <p>🖱️ Cliques: ${gameState.totalClicks}</p>
            <p>✅ Decisões corretas: ${gameState.decisionsCorrect}</p>
            <p>❌ Decisões erradas: ${gameState.decisionsWrong}</p>
            <p>💰 Dinheiro: R$ ${gameState.money}</p>
        `;
        
        document.getElementById('btn-next-level').style.display = 'inline-block';
        document.getElementById('btn-celebrate').textContent = 'Recomeçar do Zero';
    }
    
    modal.classList.add('active');
}

function nextLevel() {
    // Incrementar nível
    gameState.currentLevel++;
    
    // Manter algum dinheiro e recursos
    const moneyCarryOver = Math.floor(gameState.money * 0.3);
    const resourcesCarryOver = Math.floor(gameState.totalResourcesCollected * 0.1);
    
    // Resetar estado mantendo progressão
    gameState.bricks = resourcesCarryOver;
    gameState.tools = resourcesCarryOver;
    gameState.equipment = resourcesCarryOver;
    gameState.money = moneyCarryOver;
    gameState.areasBuilt = [];
    gameState.decisionsMade = [];
    gameState.upgradesPurchased = [];
    gameState.startTime = Date.now();
    gameState.totalClicks = 0;
    gameState.totalResourcesCollected = 0;
    gameState.decisionsCorrect = 0;
    gameState.decisionsWrong = 0;
    gameState.workRate = 1;
    gameState.autoWorkRate = 0;
    
    // Aumentar dificuldade
    gymAreas.forEach(area => {
        Object.keys(area.cost).forEach(resource => {
            area.cost[resource] = Math.floor(area.cost[resource] * 1.5);
        });
    });
    
    // Fechar modal
    document.getElementById('level-complete-modal').classList.remove('active');
    
    // Reinicializar jogo
    renderAreas();
    renderUpgrades();
    updateGymVisual();
    updateUI();
    
    showCiroMessage(`Bem-vindo à Academia #${gameState.currentLevel}! Esta será ainda mais desafiadora! Você começa com R$ ${moneyCarryOver} e ${resourcesCarryOver} de cada recurso da academia anterior.`);
    
    saveGame();
}

function restartGame() {
    // Limpar save
    localStorage.removeItem('aventuraGUI_save');
    
    // Fechar todos os modais
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Recarregar página
    location.reload();
}

