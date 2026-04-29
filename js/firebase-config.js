// =============================================
//  ODON RANKINGS - Configuração Firebase
//  IMPORTANTE: Substitua os valores abaixo
//  pelas chaves do seu projeto no Firebase Console
//  Veja o SETUP.md para instruções passo a passo
// =============================================

const firebaseConfig = {
  apiKey:            "AIzaSyBcL3Fo8RxTB-Oh27X5lvKkeiDNbc5mqBM",
  authDomain:        "odonrankings.firebaseapp.com",
  projectId:         "odonrankings",
  storageBucket:     "odonrankings.firebasestorage.app",
  messagingSenderId: "1015486867554",
  appId:             "1:1015486867554:web:2bd9dd2a002f18ecc4c93b",
  measurementId:     "G-7RCZMN2DP3"
};

// =============================================
//  CLOUDINARY - Upload de provas (gratuito)
//  Substitua pelos valores do seu painel Cloudinary
//  Veja o SETUP.md para instruções
// =============================================
const CLOUDINARY_CLOUD_NAME   = "ducokydym";
const CLOUDINARY_UPLOAD_PRESET = "odon-rankings-uploads";

// Faz upload de arquivo para o Cloudinary (sem necessidade de servidor)
async function uploadParaCloudinary(arquivo, provaId) {
  const formData = new FormData();
  formData.append('file', arquivo);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', `odon-rankings/${provaId}`);

  const resposta = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
    { method: 'POST', body: formData }
  );

  if (!resposta.ok) throw new Error('Erro no upload para Cloudinary');

  const dados = await resposta.json();
  return dados.secure_url; // URL pública e segura do arquivo
}

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Serviços globais
const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ---- Admins: emails com acesso à área restrita ----
// Adicione os emails da equipe Odon que terão acesso ao painel admin
const ADMIN_EMAILS = [
  "michelecostaor@gmail.com",
  "adm.odonconcursos@gmail.com",
  "odonconcursosvendas@gmail.com"
];

// Verifica se o usuário atual é admin
async function isAdmin(user) {
  if (!user) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}

// Observador de autenticação global
let currentUser = null;

auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  await updateNavbar(user);
});

// Atualiza a barra de navegação conforme estado de login
async function updateNavbar(user) {
  const navLogado   = document.getElementById('nav-logado');
  const navDeslogado = document.getElementById('nav-deslogado');

  if (!navLogado || !navDeslogado) return;

  if (user) {
    navLogado.classList.remove('d-none');
    navDeslogado.classList.add('d-none');

    const iniciais = document.getElementById('user-iniciais');
    if (iniciais) {
      const nome = user.displayName || user.email;
      iniciais.textContent = gerarIniciais(nome);
    }

    // Mostra link admin se for da equipe
    const linkAdmin = document.getElementById('link-admin');
    if (linkAdmin) {
      const admin = await isAdmin(user);
      if (admin) linkAdmin.classList.remove('d-none');
    }
  } else {
    navLogado.classList.add('d-none');
    navDeslogado.classList.remove('d-none');
  }
}

// Gera iniciais a partir de um nome
function gerarIniciais(nome) {
  if (!nome) return '?';
  const partes = nome.trim().split(' ').filter(p => p.length > 0);
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

// Formata data para exibição
function formatarData(timestamp) {
  if (!timestamp) return '';
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString('pt-BR');
}

// Gera token anônimo para edição sem login
function getAnonToken() {
  let token = localStorage.getItem('odon_anon_token');
  if (!token) {
    token = 'anon_' + Math.random().toString(36).substr(2, 16) + Date.now();
    localStorage.setItem('odon_anon_token', token);
  }
  return token;
}

// Exibe mensagem de toast
function showToast(mensagem, tipo = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = mensagem;
  toast.className = `toast toast-${tipo} visivel`;
  setTimeout(() => toast.classList.remove('visivel'), 3500);
}
.remove('visivel'), 3500);
}
