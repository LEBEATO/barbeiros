# BARBER PRIME

Sistema de barbearia em Next.js App Router, React, TypeScript strict, Tailwind v4 e MongoDB Atlas. Conteúdo comercial demonstrativo; valores, endereço, indicadores e depoimentos devem ser revisados antes da publicação.

## Instalar e iniciar

Requer Node.js 22.13 ou posterior e npm. No PowerShell, use npm.cmd caso a política do Windows bloqueie npm.ps1.

```sh
npm install
cp .env.example .env.local
npm run seed
npm run dev
```

Abra http://localhost:3000. Administração: http://localhost:3000/admin/login. O seed é idempotente: cria o administrador e os serviços sem sobrescrever registros existentes. Para alterar a senha de uma conta existente, é necessário um procedimento administrativo de redefinição no banco; mudar ADMIN_PASSWORD não altera o usuário já criado.

## Valores de .env.local

- MONGODB_URI: string Atlas real, por exemplo mongodb+srv://USUARIO:SENHA_CODIFICADA@SEU_CLUSTER.mongodb.net/barber_prime?retryWrites=true&w=majority. Nunca use essa variável com prefixo NEXT_PUBLIC. Codifique caracteres especiais da senha na URI.
- JWT_SECRET: segredo aleatório de ao menos 32 caracteres. Gere localmente com node -e "console.log(require('crypto').randomBytes(48).toString('hex'))". Não compartilhe o valor nem faça commit.
- ADMIN_EMAIL: e-mail do administrador que será criado pelo seed, por exemplo admin@barberprime.com.
- ADMIN_PASSWORD: senha exclusiva, com pelo menos 12 caracteres. O seed recusa troque-esta-senha. A senha é armazenada apenas como hash bcrypt com custo 12.
- NEXT_PUBLIC_WHATSAPP_NUMBER: número real com país e DDD, somente dígitos, por exemplo 5535999999999. É uma configuração pública.

Sem MongoDB, a página pública mostra os quatro serviços de demonstração. Envio de formulários retorna erro explícito; nenhum dado é simulado como salvo. O painel só funciona com Atlas configurado e seed executado.

## MongoDB Atlas

1. Crie uma conta e um cluster gratuito no Atlas.
2. Em Database Access, crie um usuário de banco com permissão readWrite apenas na base barber_prime.
3. Em Network Access, libere o IP do ambiente que executará o projeto. Para hospedagem com IP variável, configure a política de rede apropriada do seu provedor.
4. Em Connect / Drivers, copie a URI e preencha usuário, senha codificada e nome da base.
5. Configure .env.local e rode npm run seed. O seed prepara os índices, inclusive o índice único de horários.

Agendamentos ocupam blocos de dez minutos durante toda a duração do serviço, impedindo sobreposições inclusive sob requisições concorrentes. Há uma única cadeira/agenda. Horários de início: 09:00 a 18:30, em intervalos de 30 minutos; atendimentos precisam terminar até 19:00. Datas e horários usam America/Sao_Paulo (UTC-3). O servidor recusa datas passadas. O cliente solicita; a equipe confirma. Agendamentos concluídos ou cancelados não podem ser reabertos pela API.

## Comandos

```sh
npm run lint
npm run build
npm start
npm run seed
```

O build não exige conexão com MongoDB. Após o seed, valide com dados reais: login, criar agendamento, tentar um horário conflitante, filtrar a agenda, confirmar/concluir/cancelar, criar/editar/desativar/remover serviços e enviar contato. Mensagens ficam na coleção contacts.

## Publicar na Vercel

1. Envie o projeto para um repositório Git privado e importe na Vercel com preset Next.js.
2. Configure as cinco variáveis do .env.local nas configurações do projeto, em cada ambiente desejado.
3. Garanta acesso de rede do ambiente ao Atlas.
4. Rode o seed localmente apontando para a base correta, antes de habilitar agendamentos.
5. Faça o deploy com npm run build. Use HTTPS para o cookie secure de produção.

Nada é publicado automaticamente por este projeto. Nenhuma API paga é necessária. Custos de hospedagem e limites de planos dependem do provedor escolhido.

## Estrutura e segurança

src/app/(public): landing page. src/app/admin: login, dashboard, agendamentos e serviços. src/app/api: autenticação e CRUD. src/models: modelos Mongoose. src/lib: conexão, JWT, validação e utilitários. scripts/seed.ts: dados iniciais. Todas as mutações administrativas validam a sessão e a origem. Cookies httpOnly, sameSite=lax e secure em produção expiram em oito horas. Segredos ficam no servidor.

Next.js 16 usa src/proxy.ts no lugar do nome antigo src/middleware.ts. O proxy protege /admin exceto /admin/login e as APIs validam a autorização independentemente dele.

## Identidade, mídia e movimento

Tokens em src/app/globals.css. Edite conteúdo em src/data e nos componentes de seção. Indicadores e depoimentos estão identificados como ilustrativos. Diretórios public/images/gallery, services, logo e public/lottie ficam preparados para mídia real. O vídeo public/videos/barber-hero.mp4 é opcional; não há arquivo falso. Quando presente no momento do build, é centralizado com object-fit cover. Sem vídeo, o hero usa composição CSS/SVG interna. Para adicionar depois, refaça o build. Adicione fotografias locais nos componentes Gallery e Experience quando disponíveis.

GSAP: contexto com cleanup, revelações únicas de 550ms e deslocamento de 20px. Motion Design: personalidade Premium, easing de desaceleração, transições breves e ausência de loops cansativos. Modal nativo acessível com retenção de foco, Escape e restauração do foco. O menu usa transição de 350ms. prefers-reduced-motion desativa movimentos e vídeo.

O objeto 3D é uma máquina de corte procedural estilizada, sem imagens, texturas ou modelos externos, inspirada nas orientações Img2ThreeJS. Não é uma reconstrução fotográfica: não foi fornecida imagem de referência. Canvas de baixa resolução e renderização sob demanda, carregado dinamicamente apenas em desktop com ponteiro preciso, pelo menos quatro núcleos e sem economia de dados. Não intercepta cliques.

Referências lidas: https://github.com/greensock/gsap-skills, https://github.com/lottiefiles/motion-design-skill, https://github.com/img2threejs/img2threejs. Não são dependências npm.

## Verificação desta entrega

Consulte VALIDACAO.md para resultados e limites. Execute npm run check para repetir as 12 verificações locais de validação e JWT.
