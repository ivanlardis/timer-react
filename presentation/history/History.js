import React, {Component} from 'react';
import {View, ListView, StyleSheet, Text, Alert, Button} from 'react-native';
import Prefs from "../utils/Prefs";

import HistoryModel from "../history/HistoryModel";
import {Toolbar} from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

export default class HistoryView extends Component {
    constructor() {
        super();

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds
        };
    }


    componentDidMount() {
        //
        var historyRepository = new HistoryRepository(this);
        historyRepository.getData()


    }

    show(array) {
        if (array.length > 0) {

            this.setState({
                dataSource: this.ds.cloneWithRows(array),
            });

        }


    }


    render() {
        return (<View style={{flex: 1}}>
                <Toolbar
                    centerElement="История"
                    rightElement={

                        {
                            actions: ['reply'],

                        }


                    }

                    onRightElementPress={(label) => {

                        var historyRepository = new HistoryRepository(this);
                        historyRepository.getData()

                    }}
                />


                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <HistoryItem data={data}/>}
                />


            </View>

        );
    }
}


class HistoryItem extends Component {
    render() {

        return (
            <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text>Имя {this.props.data.name}</Text>
                    <Text>Циклы {this.props.data.cycleCount}</Text>
                    <Text>Отдых {this.props.data.restTime}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text>{ this.props.data.time}</Text>
                    <Text>Сеты {this.props.data.setCount}</Text>
                    <Text>Работа {this.props.data.workTime}</Text>
                </View>
            </View>
                <View style={{width: 3350, height: 1, backgroundColor: 'powderblue'}} />

            </View>
        );
    }
}





class HistoryRepository {
    constructor(view: HistoryView) {
        this.view = view
        this.CarSchema = {
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

    }


    getData() {


        this.getDataDB()
            .then(arr => {
                this.view.show(arr);

                arr.forEach(item =>
                    this.saveDataNW(item)
                );
                //
                //
                this.getDataNV()
                    .then(items1 => {
                        items1.forEach(item1 =>
                            this.saveDataDB(item1)
                        )


                        this.getDataDB()
                            .then(arr1 => {

                                this.view.show(arr1)
                            });


                    })


            })


    }


    getDataDB() {
        const Realm = require('realm');

// Define your models and their properties


        return Realm.open({schema: [this.CarSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                var trainList = [];


                // Query Realm for all cars with a high mileage
                const historyModels = realm.objects('HistoryModel');


                historyModels.forEach(historyModel => {
                    trainList.push(new HistoryModel(
                        historyModel.cycleCount,
                        historyModel.restTime,
                        historyModel.setCount,
                        historyModel.workTime,
                        historyModel.time,
                        historyModel.name))


                });

                return trainList;
            });
    }

    saveDataDB(historyModel: HistoryModel) {

        const Realm = require('realm');

// Define your models and their properties


        Realm.open({schema: [this.CarSchema]})
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

                    }, true);

                });



            })
        ;

    }

    saveDataNW(historyModel: HistoryModel) {

        fetch("https://timerble-8665b.firebaseio.com/messages/" + historyModel.time.toString() + ".json", {
            method: 'PUT',
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




