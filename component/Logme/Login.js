import React, { useState, useEffect} from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native"

function Login () {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    useEffect(() => {
        GoogleSignin.configure({
          scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
          webClientId:
            '477441946440-78af3h7me58l70rgvjukhnvp55aqh7l8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
          offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
      }, []);
    
      const _signIn = async () => {
        console.log('enter')
        try {
          console.log('enter 1')
          await GoogleSignin.hasPlayServices();
          const {accessToken, idToken} = await GoogleSignin.signIn();
          setloggedIn(true);
          console.log('done')
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('cancel')
            alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signin in progress')
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('PLAY_SERVICES_NOT_AVAILABLE')
            alert('PLAY_SERVICES_NOT_AVAILABLE');
            // play services not available or outdated
          } else {
            console.log('other', error)
            // some other error happened
          }
        }
      };
      // signOut = async () => {
      //   try {
      //     await GoogleSignin.revokeAccess();
      //     await GoogleSignin.signOut();
      //     setloggedIn(false);
      //     setuserInfo([]);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };
      
      return (
        <>
          {/* <StatusBar barStyle="dark-content" /> */}
          {/* <SafeAreaView> */}
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
            //   style={styles.scrollView}
              >
              {/* <Header /> */}
    
              <View 
            //   style={styles.body}
              >
                <View 
                // style={styles.sectionContainer}
                >
                  <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={_signIn}
                  />
                </View>
                <View 
                // style={styles.buttonContainer}
                >
                  {!loggedIn && <Text>You are currently logged out</Text>}
                  {loggedIn && (
                    <Button
                      onPress={this.signOut}
                      title="LogOut"
                      color="red"></Button>
                  )}
                </View>
              </View>
            </ScrollView>
          {/* </SafeAreaView> */}
        </>
      );
}


export default Login;
