import React, { Component } from 'react';

import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import { getMusic } from '../actions/music.action';
import { connect } from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,
        padding: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(240,240,240,1)',
    },
    button: {
        fontSize: 20,
        backgroundColor: 'rgba(220,220,220,1)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(80,80,80,0.5)',
        overflow: 'hidden',
        padding: 7,
    },
    header: {
        textAlign: 'left',
    },
    feature: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(180,180,180)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)',
    },
});

const Button = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
);

const Header = ({ children, style }) => <Text style={[styles.header, style]}>{children}</Text>;

const Feature = ({ title, onPress, buttonLabel = 'PLAY', status, urlRequired }) => {
    return (<View style={styles.feature}>
        <Header style={{ flex: 1 }}>{title}</Header>
        {status ? <Text style={{ padding: 5 }}>{resultIcons[status] || ''}</Text> : null}
        <Button title={'Download'} onPress={() => requestToPermissions(title, urlRequired)} />
        <Button title={buttonLabel} onPress={onPress} />
    </View>)
}

const resultIcons = {
    '': '',
    pending: '?',
    playing: '\u25B6',
    win: '\u2713',
    fail: '\u274C',
};

const audioTests = [
    {
        title: 'street dancer',
        url: 'https://funksyou.com/fileDownload/Songs/128/33964.mp3',
    },
    {
        title: 'dil bechara',
        url: 'https://funksyou.com/fileDownload/Songs/128/34157.mp3',
    },
      {
        title: 'success kaur',
        url: 'https://funksyou.com/fileDownload/Songs/128/34261.mp3',
      },
      {
        title: 'tronic',
        url: 'https://funksyou.com/fileDownload/Songs/128/31404.mp3',
      }
];
let player;

function setTestState(testInfo, component, status) {
    component.setState({ tests: { ...component.state.tests, [testInfo.title]: status } });
}

/**
 * Generic play function for majority of tests
 */
function playSound(testInfo, component) {
    setTestState(testInfo, component, 'pending');
    const callback = (error, sound) => {
        console.dir(sound, 'sound')
        if(player) player.stop();
        player = sound;
        if (error) {
            Alert.alert('error', error.message);
            setTestState(testInfo, component, 'fail');
            return;
        }
        setTestState(testInfo, component, 'playing');
        // Run optional pre-play callback
        testInfo.onPrepared && testInfo.onPrepared(sound, component);
        sound.play(() => {
            // Success counts as getting to the end
            setTestState(testInfo, component, 'win');
            // Release when it's done so we're not using up resources
            sound.release();
        });
    };

    // If the audio is a 'require' then the second parameter must be the callback.
    if (testInfo.isRequire) {
        const sound = new Sound(testInfo.url, error => callback(error, sound));
    } else {
        const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
    }
}
async function requestToPermissions(title, urlRequired){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Music',
          message:
            'App needs access to your Files... ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        startDownload(title, urlRequired);
      }
    } catch (err) {
      console.log(err);
    }
  };


function startDownload(title, urlRequired){
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: title,
        // path: RNFetchBlob.fs.dirs.DownloadDir + `${title}`, // Android platform
        description: 'Downloading the file',
      },
    })
      .fetch('GET', urlRequired)
      .then(res => {
        console.log('The file is save to ', res.path());
      });
  };
class Music extends Component {
    constructor(props) {
        super(props);

        

        Sound.setCategory('Playback', true); // true = mixWithOthers

        // Special case for stopping
        this.stopSoundLooped = () => {
            if (!this.state.loopingSound) {
                return;
            }

            this.state.loopingSound.stop().release();
            this.setState({ loopingSound: null, tests: { ...this.state.tests, ['mp3 in bundle (looped)']: 'win' } });
        };

        this.state = {
            loopingSound: undefined,
            tests: {},
        };
    }
    componentDidMount(){
        this.props.getMusic()
    }

    render() {
        return (
            <>
                <Header style={styles.title}>react-native-sound-demo</Header>
                <ScrollView>
                    {this.props.musicList && this.props.musicList.length ? this.props.musicList.map(testInfo => {
                        return (
                            <Feature
                            status={this.state.tests[testInfo.title]}
                            key={testInfo.title}
                            title={testInfo.title}
                            urlRequired={testInfo.url}
                            onPress={() => {
                              return playSound(testInfo, this);
                            }}
                          />

                        );
                    }) : 
                   
                        <View>
                            <Text>Loading</Text>
                            </View>
                   
                    }
                </ScrollView>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        musicList : state.music.listing
    };
  };

Music = connect(
    mapStateToProps,
    { getMusic }
)(Music);

export default Music;