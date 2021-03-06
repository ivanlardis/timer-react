import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SettingView from './presentation/setting/Setting';
import Tabbar from 'react-native-tabbar-bottom'
import Timer from "./presentation/timer/Timer";
import HistoryView from "./presentation/history/History";

export default class HelloWorldApp extends Component {
    constructor() {
        super()
        this.state = {
            page: "HomeScreen",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    // if you are using react-navigation just pass the navigation object in your components like this:
                    // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
                }
                {this.state.page === "HomeScreen" && <Timer/>}
                {this.state.page === "NotificationScreen" && <HistoryView/>}
                {this.state.page === "ProfileScreen" && <SettingView/>}

                <Tabbar
                    stateFunc={(tab) => {
                        this.setState({page: tab.page})
                        //this.props.navigation.setParams({tabTitle: tab.title})
                    }}
                    activePage={this.state.page}
                    tabs={[
                        {
                            page: "HomeScreen",
                            icon: "home",
                        },
                        {
                            page: "NotificationScreen",
                            icon: "notifications",
                        },
                        {
                            page: "ProfileScreen",
                            icon: "person",
                        },

                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});