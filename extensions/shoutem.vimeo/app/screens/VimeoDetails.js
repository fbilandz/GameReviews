import React, {
  Component,
} from 'react';
import moment from 'moment';
import _ from 'lodash';

import {
  ScrollView,
  Title,
  Video,
  Screen,
  Caption,
  Tile,
  View,
  Html,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import { NavigationBar } from '@shoutem/ui/navigation';

import { ext } from '../extension';

export class VimeoDetails extends Component {
  static propTypes = {
    // The video article to display
    video: React.PropTypes.object.isRequired,
  };

  render() {
    const { video } = this.props;
    const VideoAttachment = video.videoAttachments.length > 0 ? video.videoAttachments[0] : undefined;
    const getVideoComponent =
      VideoAttachment ? <Video source={{ uri: VideoAttachment.src }} /> : null;

    return (
      <Screen styleName="paper">
        <NavigationBar
          share={{
            title: video.title,
            link: VideoAttachment ? _.get(VideoAttachment, 'src') : undefined,
          }}
          animationName="boxing"
          title={video.title}
        />

        <ScrollView>
          {getVideoComponent}

          <Tile styleName="text-centric">
            <Title styleName="md-gutter-bottom">{video.title}</Title>
            <Caption>{moment(video.timeCreated).fromNow()}</Caption>
          </Tile>

          <View styleName="solid">
            <Html body={video.summary} />
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

export default connectStyle(ext('VimeoDetails'))(VimeoDetails);
