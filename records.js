// ========================================
// SISTEMA DE RECORDES
// ========================================

function showRecords() {
    const modal = document.getElementById('records-modal');
    const recordsList = document.getElementById('records-list');
    
    try {
        const records = JSON.parse(localStorage.getItem('aventuraGUI_records') || '{}');
        
        if (Object.keys(records).length === 0) {
            recordsList.innerHTML = '<p style="text-align: center; color: #888;">Nenhum recorde ainda. Complete uma academia para registrar seu tempo!</p>';
        } else {
            let html = '<div class="records-grid">';
            
            for (let level = 1; level <= 3; level++) {
                const record = records[level];
                
                if (record) {
                    const minutes = Math.floor(record.time / 60);
                    const seconds = record.time % 60;
                    const date = new Date(record.date);
                    const dateStr = date.toLocaleDateString('pt-BR');
                    
                    let medalEmoji = '🏅';
                    let medalColor = '#888';
                    
                    switch(record.medal) {
                        case 'Ouro':
                            medalEmoji = '🥇';
                            medalColor = '#FFD700';
                            break;
                        case 'Prata':
                            medalEmoji = '🥈';
                            medalColor = '#C0C0C0';
                            break;
                        case 'Bronze':
                            medalEmoji = '🥉';
                            medalColor = '#CD7F32';
                            break;
                    }
                    
                    html += `
                        <div class="record-card">
                            <h3>Academia #${level}</h3>
                            <div style="font-size: 3rem;">${medalEmoji}</div>
                            <p style="color: ${medalColor}; font-weight: bold;">${record.medal}</p>
                            <p><strong>⏱️ ${minutes}m ${seconds}s</strong></p>
                            <p style="font-size: 0.9rem; color: #666;">📅 ${dateStr}</p>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="record-card empty">
                            <h3>Academia #${level}</h3>
                            <div style="font-size: 3rem;">❓</div>
                            <p style="color: #888;">Não completada</p>
                        </div>
                    `;
                }
            }
            
            html += '</div>';
            recordsList.innerHTML = html;
        }
    } catch (e) {
        recordsList.innerHTML = '<p style="text-align: center; color: #888;">Erro ao carregar recordes.</p>';
    }
    
    modal.classList.add('active');
}

function hideRecords() {
    document.getElementById('records-modal').classList.remove('active');
}

function clearRecords() {
    if (confirm('Tem certeza que deseja apagar todos os recordes?')) {
        localStorage.removeItem('aventuraGUI_records');
        showRecords(); // Atualizar exibição
    }
}

