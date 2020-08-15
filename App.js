import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Login from './component/Logme/Login'
import Test from './component/Test'
class App extends React.Component {
	render() {
		console.log('Meghna')
		return (
			<View>
				<Text style={styles.text}>Hello world m</Text>
				<Test />
				<Login />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontWeight: "bold",
		fontSize: 30
	}
})

export default App