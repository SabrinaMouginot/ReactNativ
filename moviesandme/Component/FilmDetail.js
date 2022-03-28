import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { getFilmDetailFromApi } from "../API/TMDBApi";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/adventure_time.css";
import dayjs from "dayjs";
// import numeral from "numeral";

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true, // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    };
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _displayFilm() {
    const { film } = this.state;
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Text>{this.state.film.title}</Text>
          <JSONPretty data={this.state.film}></JSONPretty>
        </ScrollView>
      );
    }
  }

  render() {
    const idFilm = this.props.navigation.getParam("idFilm");
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        <Text>Détail du film id {idFilm}</Text>
      </View>
    );
  }


  componentDidMount() {
    console.log("Component FilmDetail monté");
    getFilmDetailFromApi(this.props.navigation.getParam("idFilm")).then(
      (data) => {
        this.setState({
          film: data,
          isLoading: false,
        });
      }
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Component FilmDetail componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("Component FilmDetail componentWillUnmount");
  }
}
// getParam("idFilm")

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FilmDetail;
