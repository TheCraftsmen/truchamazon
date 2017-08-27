import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import { addToFav } from '../actions';

class BookView extends Component {
  static propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    addToFav: PropTypes.func,
  }

  goBack = () => {
    Actions.pop()
  }

  saveBook = async () => {
    await AsyncStorage.setItem('@Favorites:key', JSON.stringify(this.props.favs));
    console.log("guardando");
  }

  render() {
    console.log(this.props)
    let is_favorite = this.props.favs.indexOf(this.props.id) < 0 ? false: true;
    return (
      <View style={styles.container}>
        {
          this.props.image &&
          <Image
            style={styles.img}
            source={{ uri: this.props.image.replace('http://', 'https://') }}
          />
        }
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{this.props.title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {this.props.desc}
          </Text>
        </View>
        <TouchableOpacity onPress={this.goBack}>
          <Text>Ir atras</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={ () => this.props.addToFav(this.props.id) } 
          disabled={ is_favorite }
          >
          { !is_favorite && <Text>A favoritos</Text> }
        </TouchableOpacity>
      </View>
      
    );
  }
}

export default connect( state => state, { addToFav })(BookView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    alignContent: 'flex-start',
    maxHeight: 100,
    marginVertical: 2,
  },
  img: {
    width: 70,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  info: {
    flex: 1,
    paddingLeft: 20,
  },
});
