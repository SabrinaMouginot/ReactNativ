// Components/Search.js
import React from "react";
import { FlatList, View, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";
import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import getFilmsFromApiWithSearchedText from "../API/TMDBApi";


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
    this.state = { films: [], height: 0 };
    this.searchedText = "";
  }
  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _loadFilms() {

    getFilmsFromApiWithSearchedText(this.searchedText).then((data) => {
      // appel de setSate, actualistion automatique de la Flatlist
      this.setState({ films: data.results });
      // enlever le forceUpdate()

      console.log(
        "--_loadFilms\n" +
          JSON.stringify(data) +
          "\n_loadFilms--" +
          data.results[0].original_title +
          "\n--_loadFilms--"
      );
    });
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
        <View>
          <Button title="Rechercher" onPress={() => this._loadFilms()} />

          <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <FlatList
              // onLayout={(e) => {
              //   this.setState({ height: e.nativeEvent.layout.height }); //setstate pr ne pas charger les données à l'infini
              //   console.log(e.nativeEvent.layout.height);
              // }}
              // style={{
              //   flexGrow: 1,
              //   height: this.state.height,
              // }}
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
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;
