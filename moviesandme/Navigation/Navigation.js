import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Search from "../Component/Search";

const SearchStackNavigator = createStackNavigator({
  // le nom Search dans le StackNavigator n'est pas forcément identique au nom du composant
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher",
        },

  // le nom dans le StackNavigator n'est pas obligatoirement
  // identique au nom du Composant
    
    // FilmDetail: {
    //     screen: FilmDetail
    // },
    }
});

export default createAppContainer(SearchStackNavigator);
