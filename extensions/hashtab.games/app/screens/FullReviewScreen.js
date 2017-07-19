import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ext } from '../const';
import {
    Text,
    View,
} from 'react-native';
import { Screen, Button } from '@shoutem/ui';
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
                <StarRating
                    disable
                    rating={f.rating}
                    maxStars={10}
                />
                <Text>{f.text}</Text>
                {
                    (user === userId) ?
                        (<Button onPress={() => this.editReview(f)}>
                            <Text>Edit</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FullReview);
