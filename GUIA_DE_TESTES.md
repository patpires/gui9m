# 🧪 Guia de Testes - Aventura de GUI

Este documento contém um checklist completo para testar todas as funcionalidades do jogo.

---

## ✅ Checklist de Testes

### 1. Tela Inicial
- [ ] A tela inicial carrega corretamente
- [ ] O título "Aventura de GUI" está visível
- [ ] A mensagem "Parabéns GUI pelos 9 meses!" aparece
- [ ] A imagem do personagem GUI está visível
- [ ] O botão "Começar Aventura!" funciona
- [ ] O botão "Como Jogar" abre as instruções
- [ ] O favicon aparece na aba do navegador

### 2. Tela de Instruções
- [ ] As instruções são exibidas corretamente
- [ ] Todas as 5 seções de instruções estão visíveis
- [ ] O botão "Entendi!" fecha as instruções
- [ ] É possível acessar as instruções durante o jogo (botão ❓)

### 3. Interface do Jogo
- [ ] O cabeçalho mostra "Aventura de GUI"
- [ ] O nível atual é exibido (Academia #1)
- [ ] Os 4 recursos são mostrados (Tijolos, Ferramentas, Equipamentos, Dinheiro)
- [ ] Todos começam em 0
- [ ] As imagens de GUI e CIRO aparecem no painel esquerdo
- [ ] A mensagem inicial do CIRO é exibida

### 4. Mecânica de Trabalho (Clicker)
- [ ] O botão "Trabalhar na Obra" está visível
- [ ] Ao clicar, um dos recursos aumenta em +1
- [ ] A barra de progresso anima ao clicar
- [ ] A taxa de trabalho é exibida (+1 recursos)
- [ ] É possível clicar múltiplas vezes rapidamente

### 5. Sistema de Recursos
- [ ] Tijolos são coletados aleatoriamente
- [ ] Ferramentas são coletadas aleatoriamente
- [ ] Equipamentos são coletados aleatoriamente
- [ ] Os valores são atualizados em tempo real
- [ ] Não há números negativos

### 6. Áreas de Construção

#### Recepção (🏢)
- [ ] Aparece na lista de áreas
- [ ] Mostra custo: 20 tijolos, 10 ferramentas, R$ 50
- [ ] Botão "Construir" está desabilitado sem recursos
- [ ] Botão "Construir" fica habilitado com recursos suficientes
- [ ] Ao construir, recursos são deduzidos
- [ ] Recompensa de R$ 100 é adicionada
- [ ] Área aparece como "Construída" no visual
- [ ] Área é marcada como completa na lista

#### Musculação (💪)
- [ ] Requer: 40 tijolos, 20 ferramentas, 15 equipamentos, R$ 150
- [ ] Recompensa: R$ 250
- [ ] Funciona corretamente após construção

#### Cardio (🏃)
- [ ] Requer: 35 tijolos, 15 ferramentas, 20 equipamentos, R$ 120
- [ ] Recompensa: R$ 200
- [ ] Funciona corretamente após construção

#### Vestiários (🚿)
- [ ] Requer: 30 tijolos, 25 ferramentas, 10 equipamentos, R$ 100
- [ ] Recompensa: R$ 150
- [ ] Funciona corretamente após construção

### 7. Sistema de Melhorias

#### Ferramentas Melhores (🔧)
- [ ] Custo: R$ 100
- [ ] Aparece na lista de melhorias
- [ ] Botão desabilitado sem dinheiro
- [ ] Ao comprar, aumenta taxa de trabalho para +2
- [ ] Desaparece da lista após compra
- [ ] Não pode ser comprada duas vezes

#### Equipe de Trabalho (👷)
- [ ] Custo: R$ 200
- [ ] Inicia coleta automática (+1 a cada 3 segundos)
- [ ] Recursos aumentam automaticamente
- [ ] Funciona em background

#### Ferramentas Avançadas (⚡)
- [ ] Custo: R$ 300
- [ ] Requer "Ferramentas Melhores" primeiro
- [ ] Aumenta taxa de trabalho em +2 adicional
- [ ] Fica bloqueada até comprar pré-requisito

#### Robô de Construção (🤖)
- [ ] Custo: R$ 500
- [ ] Requer "Equipe de Trabalho" primeiro
- [ ] Adiciona +3 recursos automáticos a cada 3 segundos
- [ ] Funciona corretamente

### 8. Decisões Estratégicas

#### Decisão 1: Escolha de Equipamentos
- [ ] Aparece quando dinheiro >= R$ 100
- [ ] Modal é exibido com a pergunta
- [ ] Opção A: Ganha 10 equipamentos, perde R$ 50
- [ ] Opção B: Ganha 5 equipamentos, perde R$ 100, bônus futuro
- [ ] Ao escolher, modal fecha
- [ ] Efeito é aplicado corretamente
- [ ] Não aparece novamente

#### Decisão 2: Método de Construção
- [ ] Aparece após construir 1 área
- [ ] Opção A: 30% desconto em tijolos na próxima área
- [ ] Opção B: Dobro de recompensa na próxima área
- [ ] Efeito é aplicado na próxima construção
- [ ] Não aparece novamente

#### Decisão 3: Plano de Expansão
- [ ] Aparece após construir 2 áreas
- [ ] Opção A: 20% desconto na próxima construção
- [ ] Opção B: +20 de cada recurso imediatamente
- [ ] Efeito é aplicado corretamente
- [ ] Não aparece novamente

### 9. Progresso Visual
- [ ] Barra de progresso total é atualizada
- [ ] Porcentagem é calculada corretamente (0%, 25%, 50%, 75%, 100%)
- [ ] Áreas construídas aparecem no visual da academia
- [ ] Animações de "pop in" funcionam

### 10. Sistema de Vitória
- [ ] Modal de vitória aparece ao completar 4 áreas
- [ ] Mensagem de parabéns é exibida
- [ ] Estatísticas são mostradas:
  - [ ] Tempo de jogo
  - [ ] Total de cliques
  - [ ] Recursos coletados
  - [ ] Decisões corretas
  - [ ] Dinheiro final
- [ ] Botão "Próxima Academia" funciona
- [ ] Botão "Comemorar e Recomeçar" funciona

### 11. Sistema de Níveis
- [ ] Ao avançar, nível aumenta para #2
- [ ] 50% do dinheiro é mantido
- [ ] Outros recursos são zerados
- [ ] Áreas são resetadas
- [ ] Melhorias são mantidas
- [ ] Decisões podem aparecer novamente

### 12. Botão de Reset
- [ ] Botão 🔄 está visível no cabeçalho
- [ ] Ao clicar, pede confirmação
- [ ] Se confirmar, jogo reseta completamente
- [ ] Todos os recursos voltam a 0
- [ ] Nível volta para #1
- [ ] Melhorias são perdidas

### 13. Mensagens do CIRO
- [ ] Mensagem inicial ao começar
- [ ] Mensagem ao construir cada área
- [ ] Mensagem ao comprar melhorias
- [ ] Mensagem ao fazer decisões
- [ ] Mensagem quando faltam recursos
- [ ] Mensagens são contextuais e úteis

### 14. Responsividade
- [ ] Funciona em desktop (1920x1080)
- [ ] Funciona em laptop (1366x768)
- [ ] Funciona em tablet (768x1024)
- [ ] Funciona em mobile (375x667)
- [ ] Layout se adapta corretamente
- [ ] Botões são clicáveis em touch

### 15. Performance
- [ ] Jogo carrega em menos de 3 segundos
- [ ] Cliques respondem instantaneamente
- [ ] Animações são suaves (60fps)
- [ ] Não há travamentos
- [ ] Trabalho automático funciona em background

### 16. Compatibilidade de Navegadores
- [ ] Chrome/Edge (versão recente)
- [ ] Firefox (versão recente)
- [ ] Safari (versão recente)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

---

## 🎯 Cenários de Teste Completos

### Cenário 1: Jogo Completo Básico
1. Iniciar jogo
2. Clicar 50 vezes em "Trabalhar na Obra"
3. Construir Recepção
4. Continuar clicando e construindo outras áreas
5. Completar academia
6. Verificar estatísticas

**Tempo estimado:** 5-10 minutos

### Cenário 2: Teste de Melhorias
1. Iniciar jogo
2. Coletar recursos até ter R$ 100
3. Comprar "Ferramentas Melhores"
4. Verificar que taxa aumentou
5. Comprar "Equipe de Trabalho"
6. Verificar coleta automática
7. Tentar comprar "Ferramentas Avançadas" antes do pré-requisito (deve bloquear)

**Tempo estimado:** 8-12 minutos

### Cenário 3: Teste de Decisões Estratégicas
1. Iniciar jogo
2. Coletar até ter R$ 100
3. Verificar aparição da Decisão 1
4. Escolher Opção B (equipamentos premium)
5. Construir Recepção
6. Verificar aparição da Decisão 2
7. Escolher Opção B (construção de qualidade)
8. Construir próxima área e verificar recompensa dobrada

**Tempo estimado:** 10-15 minutos

### Cenário 4: Teste de Progressão de Níveis
1. Completar Academia #1
2. Clicar em "Próxima Academia"
3. Verificar que está no nível #2
4. Verificar que tem 50% do dinheiro anterior
5. Verificar que melhorias foram mantidas
6. Jogar normalmente

**Tempo estimado:** 15-20 minutos

### Cenário 5: Teste de Reset
1. Jogar por alguns minutos
2. Clicar em botão de Reset
3. Confirmar reset
4. Verificar que tudo voltou ao estado inicial

**Tempo estimado:** 3-5 minutos

---

## 🐛 Bugs Conhecidos e Limitações

### Limitações Intencionais
- Não há salvamento automático (o progresso se perde ao fechar o navegador)
- Não há efeitos sonoros
- Não há animações complexas de personagens
- Decisões são fixas (não há aleatoriedade)

### Possíveis Melhorias Futuras
- Sistema de conquistas
- Salvamento em localStorage
- Mais tipos de academias
- Sons e música de fundo
- Modo escuro
- Compartilhamento de estatísticas

---

## 📊 Métricas de Sucesso

O jogo é considerado **aprovado** se:

✅ Todos os itens críticos do checklist passarem  
✅ Não houver bugs que impeçam a conclusão do jogo  
✅ A experiência for fluida e divertida  
✅ Funcionar em pelo menos 2 navegadores diferentes  
✅ Ser responsivo em desktop e mobile  

---

## 📝 Relatório de Bugs

Use este template para reportar problemas:

```
**Descrição do Bug:**
[Descreva o que aconteceu]

**Passos para Reproduzir:**
1. [Primeiro passo]
2. [Segundo passo]
3. [...]

**Comportamento Esperado:**
[O que deveria acontecer]

**Comportamento Atual:**
[O que realmente acontece]

**Navegador/Dispositivo:**
[Ex: Chrome 120 no Windows 11]

**Screenshot:**
[Se possível, anexe uma imagem]
```

---

## ✨ Feedback e Sugestões

Após testar, considere:

1. **Diversão**: O jogo é divertido?
2. **Clareza**: As instruções são claras?
3. **Dificuldade**: O jogo é muito fácil/difícil?
4. **Visual**: Os gráficos são agradáveis?
5. **Performance**: O jogo roda bem?

---

**Bons testes! 🎮**

