import React, {Component} from 'react';
import {AppRegistry, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import { Toolbar } from 'react-native-material-ui';

export default class Timer extends Component {
    render() {
        return (
            <View>
                <Toolbar
                    centerElement="Таймер"
                />
            </View>
        );
    }
}

class TimerPresenter {
    
}