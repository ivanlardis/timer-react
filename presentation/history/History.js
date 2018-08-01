import React, {Component} from 'react';
import {Text, View, Alert} from 'react-native';

export default class HistoryView extends Component {

    componentWillMount() {
        // this.subscription = Rx.Observable.presenter(0, 1000).timestamp().subscribe(::this.setState);

        var historyRepository = new HistoryRepository();

        var historyView = new HistoryModel(
            1,
            2,
            3,
            3,
            12121221,
            "тест",
        );

        // historyRepository.saveDataDBsaveDataDB(historyView)
        historyRepository.getDataDB( )


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


class HistoryModel {
    constructor(
        cycleCount: int,
        restTime: int,
        setCount: int,
        workTime: int,
        time: In64,
        name: string) {

        this.cycleCount = cycleCount;
        this.restTime = restTime;
        this.setCount = setCount;
        this.workTime = workTime;
        this.time = time;
        this.name = name;


    }

}


class HistoryRepository {


    getDataDB() {
        const Realm = require('realm');

// Define your models and their properties
        const CarSchema = {
            name: 'HistoryModel',
            primaryKey: 'time',
            properties: {
                name: 'string',

                time: {type: 'int', default: 0},
                workTime: {type: 'int', default: 0},
                setCount: {type: 'int', default: 0},
                restTime: {type: 'int', default: 0},
                cycleCount: {type: 'int', default: 0},
            }
        };


       return Realm.open({schema: [CarSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                var trainList = [];


                // Query Realm for all cars with a high mileage
                const historyModels = realm.objects('HistoryModel');


                historyModels.forEach(historyModel => {
                    trainList.push(new HistoryModel(
                        historyModel.name,
                        historyModel.cycleCount,
                        historyModel.restTime,
                        historyModel.setCount,
                        historyModel.time,
                        historyModel.workTime))


                });
                // Query results are updated in realtime
                Alert.alert("" + trainList.length) // => 2

                return trainList;
            })
            .catch(error => {
                console.log(error);
            });
    }

    saveDataDB(historyModel: HistoryModel) {

        const Realm = require('realm');

// Define your models and their properties
        const CarSchema = {
            name: 'HistoryModel',
            primaryKey: 'time',
            properties: {
                name: 'string',

                time: {type: 'int', default: 0},
                workTime: {type: 'int', default: 0},
                setCount: {type: 'int', default: 0},
                restTime: {type: 'int', default: 0},
                cycleCount: {type: 'int', default: 0},
            }
        };


        Realm.open({schema: [CarSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                realm.write(() => {
                    const myCar = realm.create('HistoryModel', {
                        name: historyModel.name,
                        cycleCount: historyModel.cycleCount,
                        restTime: historyModel.restTime,
                        setCount: historyModel.setCount,
                        time: historyModel.time,
                        workTime: historyModel.workTime,

                    });

                });

                // Query Realm for all cars with a high mileage
                const HistoryModels = realm.objects('HistoryModel');


                // Query results are updated in realtime
                Alert.alert("" + HistoryModels.length) // => 2
            })
            .catch(error => {
                console.log(error);
            });

    }

    saveDataNW(historyModel: HistoryModel) {

        fetch('https://timerble-8665b.firebaseio.com/messages.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyModel),
        });


    }

    getDataNV() {
        return fetch('https://timerble-8665b.firebaseio.com/messages.json')
            .then((response) => response.json())
            .then((responseJson) => {
                var trainList = [];

                for (let prop in responseJson) {
                    var historyView = new HistoryModel(
                        responseJson[prop].cycleCount,
                        responseJson[prop].restTime,
                        responseJson[prop].setCount,
                        responseJson[prop].workTime,
                        responseJson[prop].time,
                        responseJson[prop].name,
                    );
                    trainList.push(historyView)
                }
                return trainList;
            });
    }
}




