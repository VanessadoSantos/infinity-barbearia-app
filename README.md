# Barbearia Infinity App

Sistema web para barbearias organizarem agendamentos, fidelizarem clientes e aumentarem a recorrência com agenda digital.

## Funcionalidades

- **Agendamento Online**: Formulário completo para agendar cortes e barba.
- **Integração WhatsApp**: Envio automático de mensagens para confirmação.
- **Google Calendar**: Adição automática de eventos no calendário.
- **PWA (Progressive Web App)**: Instalável como app nativo.
- **Design Responsivo**: Otimizado para desktop e mobile.
- **Galeria de Serviços**: Exibição de imagens dos serviços oferecidos.

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível.
- **CSS3**: Estilos modernos com variáveis CSS e responsividade.
- **JavaScript**: Validações e interações dinâmicas.
- **Service Worker**: Cache offline para PWA.
- **Manifest**: Configuração para instalação como app.

## Como Usar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/VanessadoSantos/infinity-barbearia-app.git
   cd infinity-barbearia-app
   ```

2. **Abra no navegador**:
   - Use um servidor local (ex: `python -m http.server` ou Live Server no VS Code).
   - Acesse `index.html` para a página principal.
   - Vá para `agendamento.html` para agendar.

3. **Instalação como PWA**:
   - No navegador compatível (Chrome, Edge), clique em "Instalar" quando solicitado.

## Estrutura do Projeto

```
infinity-barbearia-app/
├── index.html          # Página principal
├── agendamento.html    # Página de agendamento
├── style.css           # Estilos CSS
├── script.js           # JavaScript para funcionalidades
├── manifest.json       # Manifesto PWA
├── service-worker.js   # Service Worker para cache
├── images/             # Imagens do projeto
└── README.md           # Este arquivo
```

## Melhorias Implementadas

- **Acessibilidade**: Labels adequados, navegação por teclado.
- **Performance**: Lazy loading de imagens, cache offline.
- **SEO**: Metas tags otimizadas, Open Graph.
- **UX**: Validações em tempo real, feedback visual.
- **Compatibilidade**: Suporte a navegadores modernos.

## Contribuição

Contribuições são bem-vindas! Abra issues ou pull requests no GitHub.

## Licença

© 2026 Vanessa Infinity Code - Todos os direitos reservados.
