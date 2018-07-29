import React, {Component} from 'react';
import {AppRegistry, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import Prefs from "../utils/Prefs";


export default class SettingView extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <SettingItem/>

            </View>
        );
    }
}

class SettingItem extends Component {


    constructor(type: PREFS_ENUM) {
        super();
        this.state = {
            type: type,
            value: 0
        };


    }

    componentDidMount() {


    }

    updateState1() {

        Alert.alert(
            'Alert Title ' + value)

    }
    onPressButtonPlus() {


        prefs = new Prefs();
        prefs.get(PREFS_ENUM.CYCLE_COUNT)
            .then(value => {

                this._updateState1()


            });
    }

    onPressButtonMinus() {

        prefs = new Prefs();
        prefs.get(PREFS_ENUM.CYCLE_COUNT)
            .then(function (value) {
                    if (value > 1) {
                        prefs.save(PREFS_ENUM.SET_COUNT, value - 1)


                    }

                }
            );

    }



    render() {
        let value = this.state.value;
        return (
            <View style={{flex: 1, height: 100, flexDirection: 'row'}}>
                <TouchableOpacity

                    onPress={this.onPressButtonMinus}


                    style={{

                        flex: 1, height: 50, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text> a </Text>

                </TouchableOpacity>


                <View style={{
                    flex: 3, height: 50, backgroundColor: 'skyblue', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text> {value} </Text>
                </View>
                <TouchableOpacity
                    onPress={this.onPressButtonPlus}
                    style={{
                        flex: 1, height: 50, justifyContent: 'center',
                        alignItems: 'center'
                    }}


                >
                    <Text> > </Text>

                </TouchableOpacity>
            </View>
        );
    }
}