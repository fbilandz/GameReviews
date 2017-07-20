import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ext } from '../const';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Screen, Button, Title } from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';
import { openInModal, closeModal } from '@shoutem/core/navigation';


export class FullReview extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    editReview(x) {
        console.log(this.props);
        const { openInModal, closeModal, value, id } = this.props;
        const route = {
            screen: ext('AddAReviewScreen'),
            props: {
                id: value,
                name: id,
                review: x.text,
                rating: x.rating,
                onClose: closeModal,
                type: 'EDIT',
            },
        };

        openInModal(route);
    }

    render() {
        const { reviews, value, id, userId, user } = this.props;
        const f = reviews[value][id];
        console.log(f);
        return (
            <Screen styleName="full-screen paper">
                <NavigationBar
                    title="Review"
                />
                <View style={[styles.row, styles.space, styles.margina]}>
                    <Title>{f.username}</Title>
                    <View style={styles.row}>
                        <Title>{f.rating}</Title>
                        <StarRating
                            disable
                            rating={1}
                            maxStars={1}
                            starColor="#fdbc50"
                            starSize={25}
                        />
                    </View>
                </View>
                <Text style={styles.margina}>{f.text}</Text>
                {
                    (user === userId) ?
                        (<Button styleName="lg-gutter-horizontal lg-gutter-vertical" onPress={() => this.editReview(f)}>
                            <Text style={styles.marginText}>Edit</Text>
                        </Button>) : (<View />)
                }
            </Screen>
        );
    }
}

const mapStateToProps = (state) => {
    const { reviews } = state[ext()];
    const userId = _.get(state, ['shoutem.auth', 'user', 'id']);
    return {
        reviews,
        userId,
    };
};

const mapDispatchToProps = {
    openInModal,
    closeModal,
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    space: {
        justifyContent: 'space-between',
    },
    margina: {
        marginVertical: 15,
        marginHorizontal: 10,
    },
    marginText: {
        marginVertical: 5,
    },
    button: {
        width: Dimensions.get('window').width * 0.8,
        height: 10,
        alignSelf: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FullReview);
