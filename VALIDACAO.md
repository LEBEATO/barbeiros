# Validação realizada

- npm run lint: aprovado, sem erros e sem avisos.
- npm run build: aprovado no Next.js 16.4.4, incluindo TypeScript strict.
- npm run check: 12 verificações de validação e JWT aprovadas.
- npm start: aplicação iniciada e 12 cenários HTTP verificados: home, login, redirecionamento de dashboard/agendamentos/serviços, autorização de APIs, catálogo de demonstração, dados inválidos, data passada, falha sem banco e origem inválida no login.
- npm audit --omit=dev: nenhuma vulnerabilidade encontrada em produção. A auditoria completa reportou 16 avisos moderados na cadeia ESLint; a correção automática sugeria downgrade incompatível e não foi aplicada.

Não foi possível verificar persistência, conflitos concorrentes, seed e autenticação com usuário real no Atlas: MONGODB_URI e as demais credenciais não foram fornecidas. A lógica de conflito foi implementada com índice único multikey por data/blocos de horário.

A sessão não disponibilizou ferramenta de navegador. Inspeção visual, interações reais por teclado e console WebGL não foram verificadas em navegador. O layout tem regras responsivas e acessibilidade implementadas, mas isso não substitui a verificação visual.

O servidor de validação foi encerrado após os testes. Para abrir localmente, execute npm run dev.
