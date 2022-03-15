import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

class FilmItem extends React.Component{
    render() {
        const film = this.props.film
        console.log(this.props.film.title)
        return (
            <View>
                <Text>{film.title}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20,
    },
    })
export default FilmItem