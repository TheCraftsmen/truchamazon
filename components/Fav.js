import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Fav extends Component {

	render(){
		console.log(this.props)
		return(
			<View>
				{ this.props.favs.map((item) => <Text>{item}</Text>) }	
			</View>
			
		)
	}

}

export default connect( state => state, {})(Fav);