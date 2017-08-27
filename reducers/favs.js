import {
  AsyncStorage,
} from 'react-native';

const favs = (state = [], action) => {
  console.log("nueva accion", action)
  switch(action.type){
    case 'SET_FAVS':
      console.log("entra al setfavs",action)
      return [...action.favs]
    case 'ADD_TO_FAV':
      console.warn("entrando como un caballo", ...state);
      if( state.indexOf(action.id) < 0 ){
        let newState = [...state, action.id];
        saveBooks(newState)
        return newState
      }
      return state
    default:
      return state
  }
}

saveBooks = async (favs) => {
  await AsyncStorage.setItem('@Favorites:key', JSON.stringify(favs));
  console.log("guardando");
}

export default favs;