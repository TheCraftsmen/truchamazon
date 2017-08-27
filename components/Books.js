import React, { Component } from 'react';
import { setFavs } from '../actions';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  View,
  TextInput,
  Switch,
  AsyncStorage,
} from 'react-native';
import Header from './Header';
import Book from './Book';
import { connect } from 'react-redux';

class Books extends Component {
  state = {
    books: [],
    loading: true,
    lastSearch: 'javascript',
    spanish: false,
  }

  componentDidMount() {
    AsyncStorage.getItem('@Favorites:key').then((resp) => {
      console.log('cosa guardada', resp);
      var favs = JSON.parse(resp);
      console.log("parseado", favs);
      this.props.setFavs(favs)
      console.log("termina de guardar");
      this.search();
    }).catch((error) => {
      console.log("error",error);
    }); 
  }

  search = async () => {
    const term = this.state.lastSearch;
    const lang = this.state.spanish ? 'es' : 'en';
    const uri = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&langRestrict=${lang}&maxResults=40`;
    const response = await fetch(uri);
    const data = await response.json();
    this.setState({ books: data.items, loading: false });
  }

  submitSearch = (event) => {
    this.setState(
      { loading: true, lastSearch: event.nativeEvent.text },
      () => this.search(),
    );
  }

  extractKey = item => item.id;
  changeLanguage = () => this.setState({ spanish: !this.state.spanish })
  renderBook = book => (
    <Book
      id={book.item.id}
      title={book.item.volumeInfo.title}
      desc={book.item.volumeInfo.description}
      image={book.item.volumeInfo.imageLinks && book.item.volumeInfo.imageLinks.smallThumbnail}
    />
  );
  renderFooter = () => <Text>No hay más libros</Text>
  render() {
    const list = this.state.loading ? <Text>Cargando...</Text>
      : (
        <FlatList
          data={this.state.books}
          renderItem={this.renderBook}
          keyExtractor={this.extractKey}
        />
      );
    return (
      <View style={styles.container}>
        <StatusBar />
        <Header />
        <TextInput
          style={styles.searchBox}
          placeholder={'Ingrese el libro a buscar'}
          onSubmitEditing={this.submitSearch}
        />
        <View style={styles.langContainer}>
          <Text style={styles.langText}>Buscar en español</Text>
          <Switch value={this.state.spanish} onValueChange={this.changeLanguage} />
        </View>
        { list }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3c3c3',
  },
  searchBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 18,
    paddingVertical: 5,
  },
  langContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 10,
  },
  langText: {
    fontSize: 20,
    marginRight: 20,
  },
});

export default connect( state => state, { setFavs })(Books);
