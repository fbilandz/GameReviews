import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Subtitle,
    Divider,
    Card,
    Image,
    Caption
} from '@shoutem/ui';
import { StyleProvider, connectStyle } from '@shoutem/theme';
import StarRating from 'react-native-star-rating';
import {ext} from '../const';

export class Review extends Component {
    constructor(props) {
        super(props);
        console.log(props);

    }


    render() {
        console.log(this.props);
        return (
            <StyleProvider style={theme}>
                <Card styleName="card-content">
                    <View styleName="content">
                        <View style={styles.wrapper}>
                            <Subtitle>{this.props.data.username}</Subtitle>
                            <StarRating
                                disable={true}
                                rating={this.props.data.rating}
                                maxStars={10}
                                starSize={20}
                                starColor={'red'}
                                selectedStar={(star) => console.log(star)}
                            />
                        </View>
                        <Text>{this.props.data.text}</Text>
                        <Divider styleName="empty" />
                        <Divider />
                    </View>
                </Card>
            </StyleProvider>
        );
    }
}

const theme = {
    'shoutem.ui.Card': {
        // card component variants
        '.dark': {
            backgroundColor: '#000'
        },

        '.light': {
            backgroundColor: '#fff'
        },

        // style variant available to child components of any type
        '*.card-content': {
            padding: 15
        },

        // style that will be applied to all child image components
        'shoutem.ui.Image': {
            flex: 1,
            resizeMode: 'cover',
        },

        // style variant available to child image comoponents
        'shoutem.ui.Image.banner': {
            height: 85
        },

        // default card style, we usually place these rules at the bottom
        backgroundColor: '#fff',
        borderRadius: 2,

        // card shadow style
        shadowColor: 'black',
        shadowRadius: 9,
        shadowOpacity: 0.3,
        shadowOffset: { width: 5, height: 7 }
    },
    wrapper: {
        flexWrap: 'wrap', 
        alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
}


const styles = StyleSheet.create({
    wrapper:  {
        flexWrap: 'wrap', 
        //alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
})