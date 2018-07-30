import React, {Component} from 'react';
import {AppRegistry, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import Prefs from "../utils/Prefs";
import { Toolbar } from 'react-native-material-ui';
export default class SettingView extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Toolbar
                    centerElement="Настройки"
                />
                <SettingItem type={PREFS_ENUM.PREPARATION_TIME}/>
                <View style={{  height: 1,width:1000,backgroundColor:'blue'}}/>
                <SettingItem type={PREFS_ENUM.CYCLE_COUNT}/>
                <View style={{  height: 1,width:1000,backgroundColor:'blue'}}/>
                <SettingItem type={PREFS_ENUM.SET_COUNT}/>
                <View style={{  height: 1,width:1000,backgroundColor:'blue'}}/>
                <SettingItem type={PREFS_ENUM.REST_BETWEEN_SETS_COUNT}/>
                <View style={{  height: 1,width:1000,backgroundColor:'blue'}}/>
                <SettingItem type={PREFS_ENUM.REST_TIME}/>
                <View style={{  height: 1,width:1000,backgroundColor:'blue'}}/>
                <SettingItem type={PREFS_ENUM.WORK_TIME}/>


            </View>
        );
    }
}

class SettingItem extends Component {


    constructor() {
        super();

        this.state = {
            type: PREFS_ENUM.CYCLE_COUNT,
            value: 0
        };


    }

    componentDidMount() {


        this.setState({
            type: this.props.type
        });
        this.update();

    }

    update() {

        prefs = new Prefs();
        prefs.get(this.props.type)
            .then(val => {

                this.setState(
                    {value: val}
                );
            });


    }

    onPressButtonPlus() {

        prefs = new Prefs();
        prefs.get(this.state.type)
            .then(val => {

                prefs.save(this.state.type, val + 1)

                this.update();
            });
    }

    onPressButtonMinus() {

        prefs = new Prefs();
        prefs.get(this.state.type)
            .then(value => {
                    if (value > 1) {
                        prefs.save(this.state.type, value - 1)

                        this.update();
                    }

                }
            );

    }


    render() {
        let value = this.state.type + " = " + this.state.value;
        let left = "<";
        return (
            <View style={{  height: 50, flexDirection: 'row'}}>
                <TouchableOpacity

                    onPress={this.onPressButtonMinus.bind(this)}


                    style={{

                        flex: 1, height: 50, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text>{left}</Text>

                </TouchableOpacity>


                <View style={{
                    flex: 3, height: 50, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text> {value} </Text>
                </View>
                <TouchableOpacity
                    onPress={this.onPressButtonPlus.bind(this)}
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