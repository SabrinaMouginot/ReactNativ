# Suggestion de configuration Visual Studio Code pour React Native

## Packets nodes

`yarn global bin` ajouter dans le PATH

```bash

yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks

yarn eslint --init
```

## Extensions à installer

```bash
code --install-extension codezombiech.gitignore
code --install-extension dbaeumer.vscode-eslint
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension esbenp.prettier-vscode
code --install-extension formulahendry.auto-close-tag
code --install-extension formulahendry.auto-complete-tag
code --install-extension formulahendry.auto-rename-tag
code --install-extension jasonnutter.search-node-modules
code --install-extension mgmcdermott.vscode-language-babel
code --install-extension naumovs.color-highlight
code --install-extension rvest.vs-code-prettier-eslint
code --install-extension walter-ribeiro.full-react-snippets
code --install-extension wmaurer.change-case
```

## Fichier settings.json

```json
{
  "editor.bracketPairColorization.enabled": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "editor.guides.bracketPairs": true,
  "editor.insertSpaces": true,
  "editor.mouseWheelZoom": true,
  "editor.suggestSelection": "first",
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.encoding": "utf8",
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
  "prettier.tabWidth": 2,
  "prettier.useTabs": false,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  "typescript.format.placeOpenBraceOnNewLineForControlBlocks": true,
  "typescript.format.placeOpenBraceOnNewLineForFunctions": true,
  "files.trimFinalNewlines": true,
  "intelephense.environment.shortOpenTag": false,
  "prettier.semi": false,
  "eslint.packageManager": "yarn",
  "prettier.singleQuote": true
}
```
