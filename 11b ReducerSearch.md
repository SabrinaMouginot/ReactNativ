# Utiliser le Reducer avec la recherche de films

```javascript
// Components/Search.js

import { connect } from "react-redux"
// ...

class Search extends React.Component {

  <FlatList
    extraData={this.props.favoritesFilm}

    renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
              isFilmFavorite={
                this.props.favoritesFilm.findIndex(
                  (film) => film.id === item.id
                ) !== -1
                  ? true
                  : false
              }
            />
          )}
  >

  </FlatList>

// ...

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  }
}

export default connect(mapStateToProps)(Search)
```
