import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getFilmDetailFromApi } from "../API/TMDBApi";


class FilmDetail extends React.Component {
    render() {
        console.log(this.props.navigation)
        const filmId = this.props.navigation.getParam('idFilm')
        return (
        <View style={styles.main_container}>
            <Text>Détail du film</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

export default FilmDetail;
