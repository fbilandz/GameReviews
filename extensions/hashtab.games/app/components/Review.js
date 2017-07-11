import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Subtitle } from '@shoutem/ui';

export class Review extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        console.log(this.props);
        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text>{this.props.data.text}</Text>
                <Subtitle>{"by "}{this.props.data.username}</Subtitle>
            </View>
        );
    }
}