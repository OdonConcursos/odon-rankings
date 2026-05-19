#!/bin/bash
# =============================================
#  ODON RANKINGS - Criar backup antes de mexer
#  Rode este script no Git Bash ANTES de
#  qualquer sessão de alterações no site
# =============================================

DATA=$(date +"%Y-%m-%d_%H-%M")
TAG="backup-$DATA"

git tag "$TAG"
git push origin "$TAG"

echo ""
echo "✅ Backup criado com sucesso: $TAG"
echo ""
echo "Para RESTAURAR este backup no futuro, rode:"
echo "  git checkout $TAG -- ."
echo "  git add ."
echo "  git commit -m \"Restaura backup $TAG\""
echo "  git push"
echo ""
