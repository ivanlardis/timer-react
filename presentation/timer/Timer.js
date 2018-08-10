import React, {Component} from 'react';
import {AppRegistry, Text, Button, View, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

import {Observable, Subject, ReplaySubject, from, of, range, interval} from 'rxjs';
import {map, filter, switchMap, take} from 'rxjs/operators';
import Prefs from "../utils/Prefs";
import HistoryModel from "../history/HistoryModel";
import {List} from "native-base";
import Canvas from 'react-native-canvas';

export default class Timer extends Component {

    state = {
        value: new ModelTimer(TYPE.EMPTY,
            1,
            1,
            0, 0)
    }

    constructor() {
        super();


    }

    componentWillMount() {
        // this.subscription = Rx.Observable.presenter(0, 1000).timestamp().subscribe(::this.setState);

        this.presenter = new TimerPresenter(this)
    }

    componentWillUnmount() {
        this.presenter.stop()


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


            <View style={{
                flex: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'stretch',
            }}>
                <View style={{height: 100}}>

                    <Toolbar
                        centerElement="Таймер"

                        rightElement={

                            {
                                actions: ['search', 'reply'],

                            }


                        }

                        onRightElementPress={(label) => {
                            if (label.action == 'search') {

                                this.start()
                            }
                            if (label.action == 'reply') {
                                this.stop()
                            }

                        }}
                    />


                    <Text style={{textAlign: 'center', fontSize: 24}}>{this.state.value.type}</Text>
                </View>


                <View
                    style={styles.container}>


                    <CanvasTest data={this.state.value} style={styles.center}/>


                </View>
                <View style={{height: 120}}>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1,  padding: 20,}}>
                            <Text style={{fontSize: 24}}>Сет {this.state.value.setCount} </Text>

                        </View>
                        <View style={{flex: 1,  padding: 20,}}>
                            <Text style={{textAlign: 'right', fontSize: 24}}>Цикл {this.state.value.cycleCount}</Text>

                        </View>
                    </View>

                </View>
            </View>


        );
    }


}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    topLeft: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    topRight: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    bottomLeft: {
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    bottomRight: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    center: {
        position: 'absolute',
        right: 75,
        bottom: 75
    }
});

class CanvasTest extends Component {
    state = {
        value: new ModelTimer(TYPE.WORK_TIME,
            0,
            0,
            0, 0)
    }


    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render

        this.setState({value: nextProps.data});
        this.forceUpdate()

    }

    handleCanvas = (canvas) => {

        if (canvas) {
            var modelTimer = this.state.value;
            canvas.width = 150;
            canvas.height = 150;

            const context = canvas.getContext('2d');

            context.strokeStyle = '#3D9CF5';
            context.lineWidth = 4;

            context.arc(75, 75, 70, -Math.PI / 2, -Math.PI / 2 - 0.000001 - (Math.PI * 2) * (modelTimer.timeSec / modelTimer.maxValue), false);
            context.stroke();
            context.textAlign = "center";
            context.font = "40px Arial";
            context.fillText(modelTimer.timeSec, 75, 85);
            //
            //
            // context1.moveTo(0, 50);
            // context1.arc(50, 50, 22, Math.PI / 2, Math.PI / 2 + Math.PI * 2 / 4, true);
            //
            // context1.stroke();
        }
    }

    render() {

        return (
            <Canvas ref={this.handleCanvas.bind(this)} data={this.props.data}/>
        )
    }
}


class TimerPresenter {
    constructor(time: Timer) {
        this.timer = time;
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
        this.subscription
    }


    async start() {
        this.clear();
        var list = await this.getList();

        this.subscription = interval(1000)
            .pipe(take(list.length))
            .subscribe(a => {

                this.timer.show(list[a])


            })
    }

    stop() {
        this.clear();
        this.timer.show(new ModelTimer(TYPE.EMPTY,
            1,
            1,
            0, 0)
        )
    }

    clear() {
        if (this.subscription != null) {
            this.subscription.unsubscribe()
        }
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

    async getList(): Array {
        prefs = new Prefs();

        var preparationTime = await prefs.get(PREFS_ENUM.PREPARATION_TIME);


        var workTime = await prefs.get(PREFS_ENUM.WORK_TIME);
        var restTime = await prefs.get(PREFS_ENUM.REST_TIME);
        var restBetweenSetsCount = await prefs.get(PREFS_ENUM.REST_BETWEEN_SETS_COUNT);
        var setCount = await  prefs.get(PREFS_ENUM.SET_COUNT);
        var cycleCount = await prefs.get(PREFS_ENUM.CYCLE_COUNT);

        var trainList = [];


        this.saveDataDB(new HistoryModel(
            cycleCount,
            restTime,
            setCount,
            workTime,
            new Date().getTime(),
            "ReactNative"
        ))

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
    EMPTY: "Начать?",
    PREPARATION_TIME: "ПОДГОТОВКА",
    WORK_TIME: "РОБОТА",
    REST_TIME: "ОТДЫХ",
    REST_BETWEEN_SETS_COUNT: "ОТДЫХ МЕЖДУ ПОДХОДАМИ"
}
