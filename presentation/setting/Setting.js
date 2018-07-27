import React, {Component} from 'react';
import {AppRegistry, Text, View,Image,TouchableOpacity} from 'react-native';

export default class SettingView extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <SettingItem />
                <View style={{backgroundColor: 'skyblue', height: 1}}/>
                <SettingItem />
            </View>
        );
    }
}

class SettingItem extends Component {



    render() {
        return (
            <View style={{flex: 1, height: 100, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, height: 50, justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text> sa </Text>

                </TouchableOpacity>
                <View style={{
                    flex: 3, height: 50, backgroundColor: 'skyblue', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>Just</Text>
                </View>
                <TouchableOpacity

                    style={{flex: 1, height: 50, justifyContent: 'center',
                    alignItems: 'center'}}


                >
                    <Text> > </Text>

                </TouchableOpacity>
            </View>
        );
    }
}