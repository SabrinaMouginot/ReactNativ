import React from "react";
import {
  FlatList,
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#346",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

class Search extends React.Component {
  // ajouter la prop films, une liste vide au départ
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      height: 0,
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    };
    this.searchedText = "";
    this.page = 0; // Compteur pour connaître la page courante
    this.totalPages = 0; // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API
  }

  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;

    // setState est une fonction asychrone
    // Pour améliorer les performances React peut en différer les traitements
    // Elle prend un deuxième paramètre
    //      une fonction callback qui est appelée lorsque tout est prêt
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          "Page : " +
            this.page +
            " / TotalPages : " +
            this.totalPages +
            " / Nombre de films : " +
            this.state.films.length
        );
        this._loadFilms();
      }
    );
  }



  // Bien noter les deux setState
  //   isLoading: True puis appel API puis lorsque l'API a répondu isLoading: False
  _loadFilms() {
    if (this.searchedText.length > 0 && !this.state.isLoading) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          // enlever le forceUpdate()          this.page = data.page
          this.totalPages = data.total_pages;
          this.setState({
            // ... syntaxe Javascript ES6 qui permet de recopier
            // et de fusionner les deux tableaux
            // ⟺ films: this.state.films.concat(data.results)
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });

          console.log(
            "--_loadFilms\n" +
              JSON.stringify(data) +
              "\n_loadFilms--" +
              data.results[0].original_title +
              "\n--_loadFilms--"
          );
        }
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        {/* <View> */}
        <Button title="Rechercher" onPress={() => this._searchFilms()} />

        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <FlatList
            onLayout={(e) => {
              this.setState({ height: e.nativeEvent.layout.height }); //setstate pr ne pas charger les données à l'infini
              console.log(e.nativeEvent.layout.height);
            }}
            style={{
              flexGrow: 1,
              height: this.state.height,
            }}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) {
                // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                this._loadFilms();
              }
            }}
            data={this.state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FilmItem film={item} />}
          />
        </View>
        {/* </View> */}
        {this._displayLoading()}
      </SafeAreaView>
    );
  }
}

export default Search;
