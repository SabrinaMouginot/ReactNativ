# Installation de React Native

cf. https://reactnative.dev/docs/environment-setup

## Installation de node et de yarn

1. Installer `nvm` (Node Version Manager) et/ou `chocolatey` et/ou `scoop`
1. Installer nodejs version [14.18.2 LTS](https://nodejs.org/download/release/latest-v14.x/) `choco install nodejs --version=14.18.2`
1. Si nécessaire mettre node.exe dans le PATH
1. `refreshenv`
1. Vérifier `node --version`
1. Installer yarn `npm install --global yarn`
1. Vérifier `yarn --version`

## Commandes de Yarn

- `yarn add` : add a package to use in your current package.
- `yarn bin` : displays the location of the yarn bin folder.
- `yarn list` : list installed packages.
- `yarn remove` : remove a package that will no longer be used in your current package.
- `yarn upgrade` : upgrade packages to their latest version based on the specified range.
- `yarn upgrade-interactive` : similar to upgrade command, but display the outdated
- `yarn cache clean [--all}]` : clean the cache
- `yarn autoclean` : voir la [doc](https://classic.yarnpkg.com/en/docs/cli/autoclean)
- `yarn policies set-version` : met à jour yarn

## Démarrage rapide avec expo

1. `yarn policies set-version` : mettre yarn à jour
2. `yarn global add --dev expo-cli`
3. `yarn global upgrade`
4. `yarn global bin` Renvoie le nom du dossier contenat expo
5. Ajouter le résultat de `yarn global bin` dans le PATH
6. `refreshenv` ou bien fermer la fenêtre & redémarrer explorer.exe<br>
7. `where expo` ou bien `which expo`
8. Vérifier `expo --version`

## Installer l'extension

1. Navigateur Internet : React Developer Tools
2. Éditeur de code : vérifier et installer les extensions disponibles/utiles
    - React Native Tools
    - Auto Rename Tag
    - Auto Close Tag
    - Color Highlight
    - Fullstack React/React Native snippets

## Création du projet

1. Aller dans le dossier des projets `cd %USERPROFILE%/Documents && mkdir ReactNative && cd ReactNative` Linux `cd ~ && mkdir ReactNative`
1. `cd %USERPROFILE%/Documents/ReactNative` Linux `cd ~/ReactNative`
1. `expo init moviesandme`
1. `cd moviesandme`
1. `code .`
1. `expo start`

## Modules intéressants

- `yarn add react-json-pretty`

````javascript
import 'react-json-pretty/themes/adventure_time.css'
import JSONPretty from 'react-json-pretty'
<View>
    <JSONPretty
        id="json-pretty"
        data={ obj || this.state.obj }
    ></JSONPretty>
</View>

```bash
- `yarn add axios`
- `yarn add react-navigation`
- `yarn global add redux`
- `yarn global add react-redux`
- `yarn add react-native-device-info`

Spécifique expo :

- `expo install expo-camera`
- `expo install expo-location`
- `expo install expo-sensors`
```javascript
import {
  Accelerometer,
  Barometer,
  Gyroscope,
  Magnetometer,
  MagnetometerUncalibrated,
  Pedometer,
} from 'expo-sensors';
````

[React Native Directory](https://reactnative.directory/)  
[Chrome Debugger Tools](http://localhost:8081/debugger-ui/)
react-devtools
