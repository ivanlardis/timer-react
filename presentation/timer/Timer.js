import React, {Component} from 'react';
import {AppRegistry, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

import {Observable, Subject, ReplaySubject, from, of, range, interval} from 'rxjs';
import {map, filter, switchMap, take} from 'rxjs/operators';

export default class Timer extends Component {

    state = {
        value: 0
    }

    componentWillMount() {
        // this.subscription = Rx.Observable.timer(0, 1000).timestamp().subscribe(::this.setState);

       timer= new TimerPresenter(this )

    }

    show(a: Int) {

        this.setState({
            value: a
        });

    }

    render() {
        return (
            <View>

                <Text>{this.state.value}</Text>
            </View>
        );
    }

    // componentWillUnmount() {
    //     this.subscription.dispose();
    // }
}


class TimerPresenter {
    constructor( time:Timer) {
        this.timer = time;
        interval(1000)
            .pipe(take(2))
            .subscribe(a => {

               this.timer.show(a)


            })
    }


}