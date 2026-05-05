# Odon Rankings — Status do Projeto

## O que é
Site de rankings de provas de concursos odontológicos da OdonConcursos.
URL do site: **https://odonconcursos.github.io/odon-rankings/**

## Stack
- HTML/CSS/JS puro (sem frameworks)
- Firebase (Authentication + Firestore)
- Cloudinary (upload de arquivos)
- GitHub Pages (hosting)

## Credenciais configuradas

### Firebase (já no firebase-config.js)
- Project ID: `odonrankings`
- Auth Domain: `odonrankings.firebaseapp.com`
- Storage Bucket: `odonrankings.firebasestorage.app`
- App ID: `1:1015486867554:web:2bd9dd2a002f18ecc4c93b`

### Cloudinary (já no firebase-config.js)
- Cloud Name: `ducokydym`
- Upload Preset: `odon-rankings-uploads`

### Admin emails (firebase-config.js + firestore.rules)
- `michelecostaor@gmail.com`
- `adm.odonconcursos@gmail.com`
- `odonconcursosvendas@gmail.com`

## Arquivos do projeto
- `index.html` — tela inicial com cards de provas e busca
- `ranking.html` — ranking individual de cada prova (exibe badge "🎓 Aluno(a) Odon" para alunos)
- `submit.html` — formulário de envio/edição de nota com disciplinas, upload e checkbox "Sou aluno(a) Odon"
- `auth.html` — login por e-mail/senha e Google, cadastro, recuperação de senha
- `history.html` — histórico pessoal para usuários logados
- `admin.html` — painel restrito à equipe Odon
- `tutorial-usuario.html` — tutorial público para candidatos (acessível via "Como usar" no menu)
- `tutorial-interno.html` — manual interno da equipe OdonConcursos (NÃO divulgar publicamente)
- `css/styles.css` — visual OdonConcursos (azul #1a1b4b + pink #D4276A)
- `js/firebase-config.js` — config Firebase + Cloudinary (JÁ PREENCHIDO)
- `rules/firestore.rules` — regras de segurança do Firestore
- `rules/storage.rules` — regras de segurança do Storage
- `SETUP.md` — guia de deploy
- `BACKUP/` — cópia de segurança de todos os arquivos (29/04/2026)

## O que já foi feito ✅

1. ✅ `firebase-config.js` preenchido com todas as chaves do Firebase e Cloudinary
2. ✅ Repositório GitHub criado: `OdonConcursos/odon-rankings`
3. ✅ Código enviado para o GitHub via Git Bash
4. ✅ GitHub Pages ativado (branch main, pasta root)
5. ✅ Site no ar: https://odonconcursos.github.io/odon-rankings/
6. ✅ Domínio `odonconcursos.github.io` autorizado no Firebase Authentication
7. ✅ Cadastro de usuário testado e funcionando
8. ✅ Login automático após cadastro testado e funcionando
9. ✅ Regras do Firestore publicadas
10. ✅ Todos os testes de funcionalidade passaram (criar ranking, enviar nota, ver ranking, histórico, painel admin)
11. ✅ Emails admin adicionados: michelecostaor, adm.odonconcursos, odonconcursosvendas
12. ✅ Bug de identificação do usuário no ranking corrigido (userId vs anonToken)
13. ✅ Upload de provas via Cloudinary testado e funcionando
14. ✅ Painel admin: visualização, download e exclusão de provas funcionando
15. ✅ Backup de todos os arquivos criado em BACKUP/
16. ✅ Tutorial público para usuários criado (tutorial-usuario.html)
17. ✅ Tutorial interno para a equipe criado (tutorial-interno.html)
18. ✅ Link "Como usar" adicionado no menu de todas as páginas (index, ranking, submit, auth, history, admin)
19. ✅ Checkbox "Sou aluno(a) OdonConcursos" adicionado no formulário de envio de nota (submit.html)
20. ✅ Badge "🎓 Aluno(a) Odon" exibido no ranking ao lado de quem marcou o checkbox
21. ✅ Campo `alunoOdon` salvo no Firestore junto com cada nota
22. ✅ Tutoriais (público e interno) atualizados com as novas funcionalidades (05/05/2026)

## O que ainda falta fazer ❌

### PRIORIDADE 1 — Tarefas pendentes
- [ ] Adicionar o link https://odonconcursos.github.io/odon-rankings/ no menu do Circle
- ~~Publicar as regras do Firestore no Firebase Console~~ — CONCLUÍDO em 05/05/2026. Coleção `usuarios` e regra de sugestão de inscritos já ativas.
- ~~Deletar usuário de teste (`aluno.teste.odon@gmail.com`)~~ — CANCELADO: site já está em uso por usuários reais, não deletar nada do Firebase para não correr risco de perda de dados
- ~~Deletar prova de teste "Cirurgião-Dentista — CFMV 2026"~~ — CANCELADO pelo mesmo motivo acima. O ranking de teste já foi deletado manualmente.

### PRIORIDADE 2 — Melhorias implementadas em 05/05/2026 ✅

- [x] **Cadastro obrigatório para enviar nota** — `submit.html` redireciona não-logados para `auth.html` com mensagem explicativa e retorno automático após login. Rankings continuam públicos. Envios anônimos existentes preservados.

- [x] **Captação de leads no painel admin** — aba "Leads" no `admin.html` lista usuários da coleção `usuarios` (Firestore) que nunca marcaram "Sou aluno(a) Odon". Exibe nome, e-mail, data de cadastro e provas participadas. Botão "Exportar CSV". Perfis são salvos no Firestore automaticamente no cadastro/login.

- [x] **Posição estimada no ranking** — exibida em `ranking.html` quando `totalInscritos` está preenchido na prova. Visível apenas para o candidato que enviou a nota (dentro do banner pessoal). Fórmula: `(posição / total envios) × total inscritos`. Usuários logados podem sugerir inscritos (não verificado). Admin confirma/edita no painel admin (aba Rankings). Regras do Firestore atualizadas.

- [x] **Tutoriais atualizados** — `tutorial-usuario.html` e `tutorial-interno.html` atualizados para refletir login obrigatório, remoção da opção de envio anônimo, posição estimada e aba Leads.

#### Arquivos modificados (Prioridade 2)
- `submit.html` — bloqueio de acesso a não-logados
- `auth.html` — mensagem contextual + gravação de perfil no Firestore (`usuarios/{uid}`)
- `ranking.html` — posição estimada + modal de sugestão de inscritos + box de inscritos
- `admin.html` — aba Leads (com exportação CSV) + coluna inscritos na aba Rankings
- `rules/firestore.rules` — coleção `usuarios` + regra para sugestão de inscritos
- `tutorial-usuario.html` — atualizado: conta obrigatória, posição estimada, removida menção a envio anônimo
- `tutorial-interno.html` — atualizado: fluxo de login, aba Leads, gerenciamento de inscritos, data 05/05/2026

## Bug corrigido em 29/04/2026
**Problema:** A lógica de identificação do usuário no `ranking.html` usava `||` entre userId e anonToken,
fazendo com que qualquer entrada que coincidisse com o token anônimo do browser fosse marcada como "você".
**Correção:** Mudado para operador ternário — se logado, usa apenas userId; se anônimo, usa apenas anonToken.
```js
// ANTES (bugado):
const ehMeu = (uid && nota.userId === uid) || nota.anonToken === token;
// DEPOIS (correto):
const ehMeu = uid ? nota.userId === uid : nota.anonToken === token;
```

## Como atualizar o site no futuro
Quando modificar qualquer arquivo, rodar no Git Bash dentro da pasta do projeto:
```bash
git add .
git commit -m "descrição da mudança"
git push
```
O GitHub Pages atualiza automaticamente em ~1 minuto.

## Como adicionar novo email admin
1. Editar `js/firebase-config.js` → array `ADMIN_EMAILS`
2. Editar `rules/firestore.rules` → função `ehAdmin()`
3. Fazer git push
4. Republicar as regras no Firebase Console → Firestore → Rules

## Conta de teste criada durante os testes
- Email: aluno.teste.odon@gmail.com
- Senha: Teste123
- **Apagar após apresentação aos gestores** (Firebase Console → Authentication → Usuários)
