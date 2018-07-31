import React, {Component} from 'react';
import {Text, View,Alert} from 'react-native';

export default class HistoryView extends Component {

    componentWillMount() {
        // this.subscription = Rx.Observable.presenter(0, 1000).timestamp().subscribe(::this.setState);
        console.log("saas")
        fetch('https://timerble-8665b.firebaseio.com/messages.json')
            .then((response) => response.json())
            .then((responseJson) => {

                    Alert.alert(""+   Map.from(responseJson).length )


                // return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>
                    "тест"
                </Text>



            </View>
        );
    }
}
