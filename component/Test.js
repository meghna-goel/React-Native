import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { StyleSheet, Text, View } from "react-native"

class Test extends Component {
    render() {
        return(
<View>
    <Text>
        hiii
    </Text>
    {/* <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
     /> */}
</View>
        )
    }
}

export default Test;
