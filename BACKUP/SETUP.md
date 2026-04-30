# 🚀 Guia de Configuração — Odon Rankings

Siga este passo a passo para colocar o sistema no ar. São aproximadamente **20 minutos** no total.

---

## PARTE 0 — Criar conta no Cloudinary (3 minutos)
*O Cloudinary é o serviço gratuito que armazena as provas enviadas pelos alunos.*

### 0.1 Crie sua conta gratuita
Acesse: **https://cloudinary.com/users/register_free**
Preencha nome, e-mail e senha. **Não precisa de cartão de crédito.**

### 0.2 Anote seu Cloud Name
Após o cadastro, você cai no painel. No topo da tela aparece:
`Cloud name: xxxxxxxxxxx`
**Copie esse valor** — você vai precisar dele em breve.

### 0.3 Crie um Upload Preset sem autenticação
Isso permite que os alunos enviem arquivos diretamente, sem precisar de login no Cloudinary.

1. No menu superior, clique em **Settings** (ícone de engrenagem)
2. Clique na aba **Upload**
3. Role até **Upload presets** e clique em **Add upload preset**
4. Configure:
   - **Preset name**: `odon-rankings-uploads` (anote esse nome)
   - **Signing Mode**: mude para **Unsigned**
   - **Folder**: `odon-rankings`
   - Em **Allowed formats**: coloque `pdf,jpg,jpeg,png`
5. Clique em **Save**

### 0.4 Cole os valores no arquivo de configuração
Abra `js/firebase-config.js` e substitua:
```javascript
const CLOUDINARY_CLOUD_NAME    = "SEU_CLOUD_NAME_AQUI";
const CLOUDINARY_UPLOAD_PRESET = "odon-rankings-uploads";
```

---

## PARTE 1 — Criar o projeto no Firebase (5 minutos)

### 1.1 Acesse o Firebase Console
Acesse: **https://console.firebase.google.com**
Entre com sua conta Google.

### 1.2 Crie um novo projeto
1. Clique em **"Adicionar projeto"**
2. Nome do projeto: `odon-rankings` (ou o nome que preferir)
3. Desmarque o Google Analytics (não precisamos)
4. Clique em **"Criar projeto"**

### 1.3 Ative o Authentication (login)
1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Primeiros passos"**
3. Na aba **"Método de login"**, clique em **"E-mail/senha"**
4. Ative a primeira opção (E-mail/senha) e clique **"Salvar"**

### 1.4 Ative o Firestore (banco de dados)
1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Iniciar no modo de produção"**
4. Selecione a região: **southamerica-east1 (São Paulo)** ← importante para velocidade
5. Clique em **"Ativar"**

### 1.5 Ative o Storage (arquivos)
1. No menu lateral, clique em **"Storage"**
2. Clique em **"Primeiros passos"**
3. Escolha **"Iniciar no modo de produção"**
4. Selecione a mesma região: **southamerica-east1**
5. Clique em **"Concluído"**

---

## PARTE 2 — Configurar as chaves (3 minutos)

### 2.1 Pegue as chaves do projeto
1. No Firebase Console, clique na **engrenagem ⚙️** (canto superior esquerdo)
2. Clique em **"Configurações do projeto"**
3. Role a página até a seção **"Seus aplicativos"**
4. Clique em **"</> Web"** para adicionar um app web
5. Nome do app: `odon-rankings-web`
6. **NÃO** marque o Firebase Hosting por enquanto
7. Clique em **"Registrar app"**
8. Copie o objeto `firebaseConfig` que aparecer na tela

### 2.2 Cole as chaves no arquivo de configuração
1. Abra o arquivo `js/firebase-config.js` nesta pasta
2. Substitua os valores `"COLE_AQUI_..."` pelas chaves reais copiadas acima
3. Salve o arquivo

Exemplo de como vai ficar:
```javascript
const firebaseConfig = {
  apiKey:            "AIzaSyXXXXXXXXXXXXXXXXXXXX",
  authDomain:        "odon-rankings.firebaseapp.com",
  projectId:         "odon-rankings",
  storageBucket:     "odon-rankings.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcdef123456"
};
```

---

## PARTE 3 — Configurar as regras de segurança (3 minutos)

### 3.1 Regras do Firestore
1. No Firebase Console → **Firestore Database** → aba **"Regras"**
2. Apague o conteúdo atual
3. Copie todo o conteúdo do arquivo `rules/firestore.rules` desta pasta
4. Cole no editor e clique em **"Publicar"**

### 3.2 Regras do Storage
1. No Firebase Console → **Storage** → aba **"Regras"**
2. Apague o conteúdo atual
3. Copie todo o conteúdo do arquivo `rules/storage.rules` desta pasta
4. Cole no editor e clique em **"Publicar"**

### 3.3 Adicionar admins
Se quiser dar acesso de admin para outros emails da equipe:
- Abra `js/firebase-config.js` e adicione os emails na lista `ADMIN_EMAILS`
- Abra `rules/firestore.rules` e adicione os mesmos emails na função `ehAdmin()`
- Abra `rules/storage.rules` e faça o mesmo na função `ehAdmin()`
- Republique as regras (passo 3.1 e 3.2)

---

## PARTE 4 — Publicar no GitHub Pages (5 minutos)

### 4.1 Crie uma conta no GitHub (se não tiver)
Acesse: **https://github.com** e crie uma conta gratuita.

### 4.2 Crie um repositório
1. Clique em **"New repository"** (botão verde)
2. Nome: `odon-rankings`
3. Deixe como **Public**
4. Clique em **"Create repository"**

### 4.3 Envie os arquivos
1. Na página do repositório criado, clique em **"uploading an existing file"**
2. Arraste **todos os arquivos e pastas** desta pasta (exceto a pasta `rules/` e o `SETUP.md`)
3. Clique em **"Commit changes"**

### 4.4 Ative o GitHub Pages
1. No repositório, clique em **"Settings"**
2. No menu lateral, clique em **"Pages"**
3. Em **"Source"**, selecione **"Deploy from a branch"**
4. Em **"Branch"**, selecione **"main"** e **"/ (root)"**
5. Clique em **"Save"**

### 4.5 Acesse o link
Após alguns minutos, seu site estará disponível em:
`https://SEU_USUARIO.github.io/odon-rankings/`

---

## PARTE 5 — Adicionar no menu do Circle

1. Acesse sua comunidade no Circle
2. Vá em **Configurações → Personalizar → Navegação**
3. Adicione um link externo com:
   - Nome: `Rankings de Provas`
   - URL: `https://SEU_USUARIO.github.io/odon-rankings/`

---

## ✅ Checklist final

- [ ] Conta Cloudinary criada (gratuita, sem cartão)
- [ ] Upload preset `odon-rankings-uploads` criado no Cloudinary (Unsigned)
- [ ] Cloud Name e Upload Preset colados no `firebase-config.js`
- [ ] Projeto Firebase criado
- [ ] Authentication ativado (e-mail/senha + Google)
- [ ] Firestore ativado (região São Paulo)
- [ ] Chaves Firebase copiadas para `firebase-config.js`
- [ ] Regras do Firestore publicadas
- [ ] Emails admin configurados
- [ ] Arquivos publicados no GitHub Pages
- [ ] Domínio do GitHub Pages adicionado nos domínios autorizados do Firebase Authentication
- [ ] Link adicionado no Circle

---

## ❓ Precisa de ajuda?

Se tiver qualquer dúvida em qualquer etapa, é só me chamar!
Posso guiar passo a passo por cada parte da configuração.
