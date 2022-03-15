# Ajouter du style à nos composants

**Tous les components React Native possèdent une propriété style.**

Le sylte permet de :

- Changer une couleur
- Définir une taille
- Ajouter des marges
- Modifier l'alignement d'éléments entre eux
- Ajouter des bordures
- Etc.

1. Ajouter un style à l'ensemble du composant

```javascript
<View style={{ marginTop: 20 }}>
```

1. Ajouter un style au TextInput

```javascript
<TextInput
  style={{
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  }}
  placeholder="Titre du film"
/>
```

[Référence des styles React Native](https://github.com/vhpoet/react-native-styling-cheat-sheet)
tout ce qui est [Flexbox](https://github.com/vhpoet/react-native-styling-cheat-sheet#flexbox) (il s'agit de Flexbox React Native, inspirés mais différents des Flexbox CSS) s'applique à tous les composants. D'autres éléments comme `textAlign` ou `maxLength` ne s'appliquent qu'à certains éléments.

**On ne peut appliquer de style que sur les components React Native.**

## Externalisez ses styles

### Stylesheet

**StyleSheet** est une API React Native permettant d'augmenter les performances de vos styles dans votre application. Stylesheet permet de définir un style, de lui donner un identifiant et de le réutiliser, au lieu de créer un nouveau style à chaque fois.

```javascript
// Components/Search.js

import { StyleSheet } from 'react-native'
```

```javascript
// Components/Search.js

const styles = StyleSheet.create({
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
})
```

## Flexbox

Flexbox est un mode de mise en page, utilisé sur du web à la base, permettant de gérer les tailles et les positions de vos éléments dynamiquement. Avec Flexbox, on pense et on construit nos vues comme des boîtes flexibless qui s'ajustent entre elles. En React Native, **tous les components utilisent Flexbox et sont des "boîtes flexibles"**.

- Sans Flexbox il reste des zones blanches

```javascript
render() {
    return (
      <View style={{ backgroundColor: 'yellow' }}>
        <View style={{ height: 100, backgroundColor: 'red' }}></View>
        <View style={{ height: 100, backgroundColor: 'green' }}></View>
      </View>
    )
 }
```

- Avec Flexbox tous l'espace est rempli et on définit comment les éléments se positionnent les uns par rapport aux autres

```javascript
render() {
   return (
     <View style={{ flex: 1, backgroundColor: 'yellow' }}>
       <View style={{ flex: 1, backgroundColor: 'red' }}></View>
       <View style={{ flex: 1, backgroundColor: 'green' }}></View>
     </View>
   )
}
```

Par défaut flex=0 et la taille d'un composant dépend de la taille des éléments qu'il contient.

```javascript
render() {
   return (
     <View style={{ backgroundColor: 'yellow' }}>
       <View style={{ height: 150, backgroundColor: 'red' }}></View>
       <View style={{ height: 220 }}></View>
     </View>
   )
}
```

Taille total (sans flexbox) = 370px

Avec flex :

```javascript
render() {
   return (
     <View style={{ flex: 1, backgroundColor: 'yellow' }}>
       <View style={{ flex: 1, backgroundColor: 'red' }}></View>
       <View style={{ flex: 1, backgroundColor: 'green' }}></View>
     </View>
   )
}
```

On dit à notre vue jaune de prendre toute la place disponible ( flex = 1). Elle n'a pas de components adjacents et son component parent, c'est votre écran. Elle va donc prendre toute la taille de l'écran.

Ensuite, on dit à la vue rouge de prendre toute la place disponible. Elle a un component adjacent (la vue verte), donc elle va partager la place disponible avec elle. Voilà comment le style flex fonctionne.

Si on enlève `flex: 1` de l'élément parent, l'élément parent prendra 0 place et rien ne s'affichera. Les deux enfants se partageront 0 place entre eux.

Flexbox calcule automatiquement les proportions que les éléments doivent prendre les uns par rapport aux autres.

```javascript
render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <View style={{ flex: 1, backgroundColor: 'red' }}></View>
        <View style={{ flex: 2, backgroundColor: 'green' }}></View>
        <View style={{ flex: 3, backgroundColor: 'blue' }}></View>
      </View>
    )
}
```

- Dans un plan à 2 dimensions il y a deux axes : l'axe horizontal (lignes) et l'axe vertical (colonnes)
- Flexbox a deux axes : l'axe principal et l'axe secondaire
- Par défaut on travaille sur l'axe horizontal, en lignes
- On peut changer l'axe principal et dire de fonctionner en colonnes par défaut

```javascript
render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'yellow' }}>
        <View style={{ flex: 1, backgroundColor: 'red' }}></View>
        <View style={{ flex: 2, backgroundColor: 'green' }}></View>
        <View style={{ flex: 3, backgroundColor: 'blue' }}></View>
      </View>
    )
}
```

On peut travailler avec l'attribut `justifyContent` pour aligner à doite, centrer, aligner à gauche, soit selon l'axe horizontal, soit selon l'axe vertical. L'attribut `alignItems` s'applique à l'axe secondaire.
