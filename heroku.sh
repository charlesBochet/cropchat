#! /bin/bash

br=$(git rev-parse --abbrev-ref HEAD)
deploy_br=heroku
git checkout $deploy_br && \
git pull --rebase || exit 1

if ! git config user.email || ! git config user.name; then
  git config user.email "kevinj@theodo.fr"
  git config user.name "Circle CI"
fi

git pull --rebase && \
git merge -X theirs --no-edit $br && \
npm run build && \
git add -f cropchat/dist
git commit -a --amend --no-edit && \
git push origin $deploy_br && \
git checkout $br || exit 1