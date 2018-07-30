import React, {Component} from 'react';
import {AppRegistry, Text, Button, View, Image, TouchableOpacity, Alert} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

import {Observable, Subject, ReplaySubject, from, of, range, interval} from 'rxjs';
import {map, filter, switchMap, take} from 'rxjs/operators';
import Prefs from "../utils/Prefs";
import {List} from "native-base";


export default class Timer extends Component {

    state = {
        value: new ModelTimer(TYPE.WORK_TIME,
            0,
            0,
            0, 0)
    }

    constructor() {
        super();

        this.presenter = new TimerPresenter(this)
    }

    componentWillMount() {
        // this.subscription = Rx.Observable.presenter(0, 1000).timestamp().subscribe(::this.setState);


    }

    show(a: ModelTimer) {

        this.setState({
            value: a
        });

    }

    start() {
        this.presenter.start();
    }

    stop() {
        this.presenter.stop();
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.start.bind(this)}
                    title="Start"
                    color="#841584"
                />
                <Button
                    onPress={this.stop.bind(this)}
                    title="Stop"
                    color="#841584"
                />
                <Text>{this.state.value.cycleCount}</Text>
                <Text>{this.state.value.maxValue}</Text>
                <Text>{this.state.value.setCount}</Text>
                <Text>{this.state.value.timeSec}</Text>
                <Text>{this.state.value.type}</Text>

            </View>
        );
    }


}


class TimerPresenter {
    constructor(time: Timer) {
        this.timer = time;

    }


    async start() {
        var list =await this.getList();

        Alert.alert(" " + list.length);
        interval(1000)
            .pipe(take(list.length))
            .subscribe(a => {

                this.timer.show(list[a])


            })
    }

    stop() {

    }


    async getList(): Array {
        prefs = new Prefs();

        var preparationTime = await prefs.get(PREFS_ENUM.PREPARATION_TIME);


        var workTime = await prefs.get(PREFS_ENUM.WORK_TIME);
        var restTime = await prefs.get(PREFS_ENUM.REST_TIME);
        var restBetweenSetsCount = await prefs.get(PREFS_ENUM.REST_BETWEEN_SETS_COUNT);
        var setCount = await  prefs.get(PREFS_ENUM.SET_COUNT);
        var cycleCount = await prefs.get(PREFS_ENUM.CYCLE_COUNT);

        var trainList = [];

        for (let currentPreparationTime = 1;
             currentPreparationTime <= preparationTime;
             currentPreparationTime++) {


            modelPreparationTime = new ModelTimer(
                TYPE.PREPARATION_TIME,
                preparationTime,
                preparationTime + 1 - currentPreparationTime,
                0, 0
            );

            trainList.push(modelPreparationTime);

        }


        for (let curSetCount = 1; curSetCount <= setCount; curSetCount++) {
            for (let curCycleCount = 1; curCycleCount <= cycleCount; curCycleCount++) {
                for (let curWorkTime = 1; curWorkTime <= workTime; curWorkTime++) {

                    modelTimerWorkTime = new ModelTimer(TYPE.WORK_TIME,
                        workTime,
                        workTime + 1 - curWorkTime,
                        curSetCount, curCycleCount);

                    trainList.push(modelTimerWorkTime);
                }

                for (let curRestTime = 1; curRestTime <= restTime; curRestTime++) {
                    modelTimerRestTime = new ModelTimer(TYPE.REST_TIME,
                        restTime,
                        restTime + 1 - curRestTime,
                        curSetCount, curCycleCount);
                    trainList.push(modelTimerRestTime);
                }
            }

            for (let curBetweenTime = 1;
                 curBetweenTime <= restBetweenSetsCount;
                 curBetweenTime++) {

                modelTimerBettwenSets = new ModelTimer(TYPE.REST_BETWEEN_SETS_COUNT,
                    restBetweenSetsCount,
                    restBetweenSetsCount + 1 - curBetweenTime,
                    curSetCount, 0);

                trainList.push(modelTimerBettwenSets);
            }
        }


        return trainList;
    }


}

class ModelTimer {
    constructor(type: TYPE,
                maxValue: Int,
                timeSec: Int,
                setCount: Int,
                cycleCount: Int) {

        this.type = type;
        this.maxValue = maxValue;
        this.timeSec = timeSec;
        this.setCount = setCount;
        this.cycleCount = cycleCount;
    }


}

TYPE = {
    EMPTY: "EMPTY",
    PREPARATION_TIME: "PREPARATION_TIME",
    WORK_TIME: "WORK_TIME",
    REST_TIME: "REST_TIME",
    REST_BETWEEN_SETS_COUNT: "REST_BETWEEN_SETS_COUNT"
}
