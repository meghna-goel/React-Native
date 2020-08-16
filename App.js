import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Login from './component/Logme/Login'
import Music from './component/Music'
import { Provider } from 'react-redux';
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import store, { history } from './store/store';
import { ConnectedRouter } from "connected-react-router";

const App = () => {
	return (
	<Provider store={store}>
			<NativeRouter>
				<ConnectedRouter history={history}>
				<Switch>
				<View>
				<Route exact path="/" component={Login} />
				<Route exact path="/music" component={Music} />
				</View>
				</Switch>
				</ConnectedRouter>
			</NativeRouter>
		</Provider>
	)
}

const styles = StyleSheet.create({
	text: {
		fontWeight: "bold",
		fontSize: 30
	}
})

export default App