import React from 'react';
import { connect } from 'react-redux';

import { Screen } from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';

import { actions } from 'shoutem.application';

import {
  mapIsRootScreenToProps,
  shortcutChildrenRequired,
} from './index';

const { bool, shape, string } = React.PropTypes;

export default function createSubNavigationScreen(Component) {
  class FolderBaseScreen extends React.Component {
    static propTypes = {
      isRootScreen: bool,
      shortcut: shape({
        title: string,
      }),
    };

    resolveNavBarProps() {
      const { shortcut: { title }, isRootScreen } = this.props;
      return {
        styleName: isRootScreen ? 'clear none' : '',
        title,
      };
    }

    resolveScreenProps() {
      const { isRootScreen } = this.props;
      return {
        // Main Navigation Screens does not have NavigationBar, so when Folder screen is Main
        // navigation screen (and has no NavigationBar) stretch screen.
        onLayout: this.layoutChanged,
        styleName: isRootScreen ? 'full-screen' : '',
      };
    }

    render() {
      return (
        <Screen {...this.resolveScreenProps()} >
          <NavigationBar {...this.resolveNavBarProps()} />
          <Component {...this.props} />
        </Screen>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    ...mapIsRootScreenToProps(state, ownProps),
  });

  return shortcutChildrenRequired(
    connect(mapStateToProps, { executeShortcut: actions.executeShortcut })(FolderBaseScreen),
  );
}
