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
            12211212,
            "тест",
        );

        historyRepository.saveData(historyView)
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



    saveData(historyModel:HistoryModel){

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




