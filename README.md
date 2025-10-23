# 🏗️ Aventura de GUI - Construindo Academias com Papai CIRO

## 🎉 Sobre o Jogo

**Aventura de GUI** é um jogo web interativo criado para comemorar os **9 meses do GUI**! 

Neste jogo clicker/idle com elementos estratégicos, você ajuda o pequeno GUI e o Papai CIRO (Engenheiro especializado em Obras de Interiores) a construir academias de ginástica incríveis, inspiradas na Smart Fit.

---

## 🎮 Como Jogar

### Objetivo Principal
Construir todas as 4 áreas de uma academia coletando recursos e fazendo escolhas estratégicas!

### Mecânicas do Jogo

#### 1. 🔨 Coletar Recursos
- Clique no botão **"Trabalhar na Obra"** para coletar recursos aleatórios
- Cada clique gera: **Tijolos** 🧱, **Ferramentas** 🔨 ou **Equipamentos** 💪
- A quantidade coletada depende da sua taxa de trabalho atual

#### 2. 🏗️ Construir Áreas
O jogo possui 4 áreas para construir:

| Área | Descrição | Custo | Recompensa |
|------|-----------|-------|------------|
| 🏢 **Recepção** | Entrada da academia | 20 tijolos, 10 ferramentas, R$ 50 | R$ 100 |
| 💪 **Musculação** | Equipamentos de musculação | 40 tijolos, 20 ferramentas, 15 equipamentos, R$ 150 | R$ 250 |
| 🏃 **Cardio** | Esteiras e bikes | 35 tijolos, 15 ferramentas, 20 equipamentos, R$ 120 | R$ 200 |
| 🚿 **Vestiários** | Chuveiros e armários | 30 tijolos, 25 ferramentas, 10 equipamentos, R$ 100 | R$ 150 |

#### 3. ⚡ Comprar Melhorias
Use o dinheiro ganho para comprar melhorias que aumentam sua eficiência:

- **🔧 Ferramentas Melhores** (R$ 100): +1 recurso por clique
- **👷 Equipe de Trabalho** (R$ 200): +1 recurso automático a cada 3 segundos
- **⚡ Ferramentas Avançadas** (R$ 300): +2 recursos por clique
- **🤖 Robô de Construção** (R$ 500): +3 recursos automáticos a cada 3 segundos

#### 4. 🎲 Decisões Estratégicas
Durante o jogo, você enfrentará decisões importantes que afetam seu progresso:

**Decisão 1 - Escolha de Equipamentos** (quando tiver R$ 100+)
- **Opção A**: Equipamentos básicos (mais quantidade, menor custo)
- **Opção B**: Equipamentos premium (menos quantidade, maior custo, bônus futuro) ⭐ *Recomendado*

**Decisão 2 - Método de Construção** (após construir 1 área)
- **Opção A**: Construção rápida (30% desconto em tijolos na próxima área)
- **Opção B**: Construção de qualidade (dobro de recompensa na próxima área) ⭐ *Recomendado*

**Decisão 3 - Plano de Expansão** (após construir 2 áreas)
- **Opção A**: Foco em uma área (20% desconto na próxima construção) ⭐ *Recomendado*
- **Opção B**: Desenvolvimento simultâneo (+20 de cada recurso imediatamente)

---

## 🎯 Estratégias e Dicas

### Para Iniciantes
1. **Comece clicando bastante** para acumular recursos iniciais
2. **Construa a Recepção primeiro** - é a mais barata e dá dinheiro para melhorias
3. **Compre "Ferramentas Melhores"** assim que possível
4. **Nas decisões, escolha as opções de longo prazo** (marcadas com ⭐)

### Para Jogadores Avançados
1. **Priorize melhorias automáticas** para ganhar recursos passivamente
2. **Planeje suas construções** - use os descontos das decisões estrategicamente
3. **Maximize o dinheiro** antes de completar a academia para começar o próximo nível com vantagem
4. **Combine bônus** - construção de qualidade + equipamentos premium = lucro máximo

### Cálculos Úteis

**Custo Total (sem descontos):**
- Tijolos: 125
- Ferramentas: 70
- Equipamentos: 45
- Dinheiro: R$ 420

**Recompensa Total:**
- R$ 700 (sem bônus)
- Até R$ 1.000+ (com decisões estratégicas corretas)

**Lucro Líquido Mínimo:** R$ 280  
**Lucro Líquido Máximo:** R$ 580+

---

## 🏆 Sistema de Progressão

### Níveis
Após completar todas as 4 áreas, você avança para a próxima academia (nível):
- **Nível 1**: Academia básica
- **Nível 2+**: Academias mais desafiadoras com os mesmos custos, mas você começa com 50% do dinheiro anterior

### Estatísticas Rastreadas
- ⏱️ Tempo de jogo
- 🖱️ Total de cliques
- 📦 Recursos coletados
- ✅ Decisões estratégicas corretas
- 💰 Dinheiro acumulado

---

## 🎨 Recursos Visuais

O jogo inclui:
- **Personagens customizados**: GUI (bebê engenheiro) e CIRO (engenheiro profissional)
- **Favicon personalizado**: Ícone do GUI com capacete
- **Cenário de obra**: Background com academia em construção
- **Animações suaves**: Transições, hover effects, e feedback visual
- **Design responsivo**: Funciona em desktop, tablet e mobile

---

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com gradientes, animações e responsividade
- **JavaScript (Vanilla)**: Lógica do jogo sem dependências externas

---

## 📁 Estrutura de Arquivos

```
aventura-gui/
├── index.html              # Página principal
├── styles.css              # Estilos do jogo
├── game.js                 # Lógica do jogo
├── favicon.png             # Ícone do navegador
├── gui_character.png       # Personagem GUI
├── ciro_character.png      # Personagem CIRO
├── gym_background.png      # Cenário da academia
├── resources_icons.png     # Ícones de recursos
└── README.md              # Este arquivo
```

---

## 🚀 Como Executar

### Opção 1: Abrir Localmente
1. Baixe todos os arquivos para uma pasta
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Comece a jogar!

### Opção 2: Servidor Web
1. Use qualquer servidor HTTP simples
2. Exemplo com Python:
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000`

### Opção 3: Deploy Online
O jogo pode ser facilmente hospedado em:
- GitHub Pages
- Netlify
- Vercel
- Qualquer serviço de hospedagem estática

---

## 🎓 Aspectos Educacionais

Este jogo foi projetado para ser **acessível a todas as idades** e oferece:

### Para Crianças
- **Coordenação motora**: Cliques e interações
- **Cores e animações**: Estímulo visual
- **Causa e efeito**: Entender que ações geram resultados

### Para Jovens e Adultos
- **Matemática básica**: Cálculo de custos e recursos
- **Planejamento estratégico**: Decisões de curto vs longo prazo
- **Gestão de recursos**: Priorização e otimização
- **Paciência e persistência**: Progressão gradual

### Aspecto Lúdico
- **Comemoração especial**: Celebra os 9 meses do GUI
- **Conexão familiar**: Tema baseado no trabalho do Papai CIRO
- **Narrativa positiva**: Mensagens de incentivo do CIRO
- **Senso de conquista**: Completar academias e avançar níveis

---

## 🐛 Solução de Problemas

### O jogo não carrega
- Verifique se todos os arquivos estão na mesma pasta
- Certifique-se de que as imagens (.png) estão presentes
- Tente abrir em outro navegador

### Imagens não aparecem
- Confirme que os arquivos PNG estão no mesmo diretório que o HTML
- Verifique o console do navegador (F12) para erros

### Botões não funcionam
- Certifique-se de que o JavaScript está habilitado
- Limpe o cache do navegador (Ctrl+F5)

---

## 🎉 Mensagem Especial

> **Parabéns GUI pelos 9 meses!** 🎊
> 
> Este jogo foi criado com muito carinho para celebrar essa data especial.
> Que você continue crescendo forte e saudável, assim como as academias
> que o Papai CIRO constrói!
> 
> Com amor,  
> Sua família 💙

---

## 📝 Notas de Desenvolvimento

### Versão: 1.0.0
### Data: Outubro 2025

**Características implementadas:**
- ✅ Sistema de clicker com taxa variável
- ✅ Coleta automática de recursos (idle)
- ✅ 4 áreas de construção com custos progressivos
- ✅ 4 melhorias desbloqueáveis
- ✅ 3 decisões estratégicas com consequências
- ✅ Sistema de níveis infinitos
- ✅ Estatísticas detalhadas
- ✅ Interface responsiva
- ✅ Animações e feedback visual
- ✅ Mensagens contextuais do CIRO
- ✅ Persistência de progresso entre níveis

**Possíveis expansões futuras:**
- 💾 Salvamento automático (localStorage)
- 🏅 Sistema de conquistas
- 📊 Gráficos de progresso
- 🎵 Efeitos sonoros
- 🌍 Diferentes tipos de academias
- 👥 Modo multiplayer/comparação

---

## 📄 Licença

Este jogo foi criado como um projeto pessoal para celebração familiar.
Sinta-se livre para modificar e adaptar para suas próprias celebrações!

---

**Desenvolvido com ❤️ para celebrar os 9 meses de GUI!**

