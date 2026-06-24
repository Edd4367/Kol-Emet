# Kol Emet — Site oficial (institucional)

Site institucional/apresentativo da banda de rock/metal **Kol Emet**
(קול אמת, "a voz da verdade"). Como a banda ainda não lançou faixas, o site
foi pensado para apresentar a identidade, a proposta sonora e os integrantes,
servindo como cartão de visitas digital até o primeiro lançamento.

## Demonstração

Abra `index.html` diretamente no navegador ou publique a pasta inteira em
qualquer serviço de hospedagem estática (veja a seção **Publicação**).

## Estrutura do projeto

```
kol-emet/
├── index.html          # Página inicial (hero + prévia + status da banda)
├── sobre.html           # História, proposta sonora e influências
├── integrantes.html     # Cards com os 4 integrantes da banda
├── contato.html         # Formulário de contato + links de redes sociais
├── 404.html             # Página de erro 404 personalizada
├── css/
│   └── style.css        # Estilo próprio (tokens, componentes, responsividade)
├── js/
│   └── main.js           # Navegação ativa, waveform, validação de form, voltar ao topo
├── img/                  # Pasta reservada para imagens reais da banda (vazia por padrão)
└── README.md
```

Cada página HTML é independente e reaproveita os mesmos arquivos `css/style.css`
e `js/main.js`, então qualquer alteração visual ou de comportamento feita
nesses dois arquivos reflete em todo o site.

## Decisões de projeto

- **Multi-página estática** (sem framework) — o site é simples o suficiente
  para não justificar um bundler ou SPA, e isso facilita publicação imediata
  em qualquer hospedagem estática.
- **Bootstrap 5** (via CDN) é usado para a grade responsiva, o componente de
  navbar colapsável e o sistema de colunas (`row`/`col-*`). O visual customizado
  (cores, tipografia, cards de integrantes, hero) é todo feito em `style.css`,
  sobrepondo o tema padrão do Bootstrap.
- **Identidade visual**: paleta escura (quase-preto, amarelo
  dourado envelhecido) com tipografia condensada (Oswald) para títulos e
  serifada (Lora) para texto corrido — reforçando o contraste entre "grito" e
  "voz" sugerido pelo nome da banda.
- **Conteúdo institucional, não fictício demais**: como a banda não tem faixas
  lançadas, o site não promete áudio/player nem datas de shows. Em vez disso,
  comunica com transparência a fase atual ("em formação, com destino certo")
  e usa isso como parte da narrativa, não como uma limitação escondida.

## Funcionalidades em JavaScript (`js/main.js`)

| Funcionalidade | Descrição |
|---|---|
| Navegação ativa | Marca automaticamente o link da página atual na navbar, comparando o nome do arquivo. |
| Waveform do hero | Gera dinamicamente as barras da forma de onda decorativa no hero. |
| Validação do formulário de contato | Valida nome, e-mail e tamanho mínimo da mensagem no cliente, com feedback acessível (`aria-live`). |
| Botão "voltar ao topo" | Aparece após rolagem e devolve o foco ao topo da página ao ser ativado. |

> **Sobre o formulário de contato:** atualmente a validação acontece apenas no
> navegador (não há backend configurado). Para receber as mensagens de fato,
> conecte o `<form id="contact-form">` em `contato.html` a um serviço como
> [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com/) ou um
> endpoint próprio, e ajuste `setupContactForm()` em `js/main.js` para enviar
> os dados em vez de apenas simular o envio.

## Acessibilidade

- Link "Pular para o conteúdo" (`skip-link`) no início de cada página.
- Contraste de cores testado para o fundo escuro (texto claro `#d8cfc0` sobre
  fundo `#0b0a0c`).
- Foco visível customizado (`:focus-visible`) em links, botões e campos de
  formulário.
- `aria-label`, `aria-current="page"` e `aria-live="polite"` usados onde
  fazem diferença real para leitores de tela.
- Respeita `prefers-reduced-motion` para usuários sensíveis a animação.

## Responsividade

Layout testado nos breakpoints do Bootstrap (`sm`, `md`, `lg`, `xl`), com
ajustes finos próprios para celulares pequenos (`< 576px`): espaçamento de
seções reduzido, botões do hero empilhados e cards de integrantes em uma
coluna.

## Como rodar localmente

Não há dependências de build. Basta servir os arquivos estáticos:

```bash
# Opção 1: abrir direto
open index.html        # macOS
start index.html        # Windows

# Opção 2: servidor local simples (recomendado para testar o roteamento)
python3 -m http.server 8080
# depois acesse http://localhost:8080
```

## Publicação

O projeto é 100% estático, então pode ser publicado em qualquer serviço de
hospedagem estática:

### GitHub Pages
1. Suba esta pasta para um repositório no GitHub.
2. Em **Settings → Pages**, selecione a branch `main` e a pasta raiz (`/`).
3. O site ficará disponível em `https://<seu-usuario>.github.io/<repositorio>/`.

### Netlify / Vercel
1. Crie um novo projeto apontando para este repositório (ou arraste a pasta
   diretamente no painel do Netlify, em "Deploy manually").
2. Não é necessário comando de build — é um site estático puro.

### Importante para qualquer hospedagem
- Mantenha a estrutura de pastas (`css/`, `js/`) relativa à raiz do projeto.
- O arquivo `404.html` é reconhecido automaticamente pelo GitHub Pages e pela
  Netlify como página de erro customizada.

## Próximos passos sugeridos

- Substituir os placeholders de redes sociais em `contato.html` pelos perfis
  reais da banda.
- Trocar os blocos `.about-figure` / `.member-photo` (atualmente glifos e
  iniciais estilizadas) por fotos reais da banda e dos integrantes, em `img/`.
- Conectar o formulário de contato a um serviço de envio de e-mail real.
- Quando houver faixas lançadas, adicionar uma página "Música" com player
  (ex.: embed do Spotify/YouTube) e uma página "Shows/Agenda".

## Licença

Projeto de uso livre para a banda Kol Emet. Sem licença de terceiros aplicada
ao conteúdo textual; Bootstrap e Google Fonts são usados conforme suas
respectivas licenças (MIT e Open Font License).
