import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Subtitle, Divider } from '@shoutem/ui';

export class Review extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        console.log(this.props);
        return(
                <Divider styleName="section-header" style={{ backgroundColor: 'white'}}>
                    <Text>{this.props.data.text}</Text>
                    <Subtitle>{"by "}{this.props.data.username}</Subtitle>
                </Divider>

        );
    }
}