import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getExtensionInstallation } from 'environment';
import { EditableTable } from '@shoutem/react-web-ui';
import {
  getExtensionSettings,
  updateExtensionSettings,
} from '../builder-sdk';
import './style.scss';

export class TrackersPage extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateTrackers = this.handleUpdateTrackers.bind(this);
  }

  handleUpdateTrackers(trackers) {
    const { extensionInstallation, updateSettings } = this.props;
    return updateSettings(extensionInstallation, { trackers });
  }

  render() {
    const { extensionInstallation } = this.props;
    const settings = getExtensionSettings(extensionInstallation);

    const headers = ['Tracker ID*', 'View ID', 'Sampling rate', ''];
    const rowDescriptors = [
      { property: 'trackerId', isRequired: true },
      { property: 'viewId', isRequired: false },
      { property: 'samplingRate', isRequired: false },
    ];

    return (
      <EditableTable
        className="trackers-page"
        buttonLabel="Add tracker"
        tableHeader="Google Analytics Trackers"
        headers={headers}
        rows={settings.trackers}
        updateRows={this.handleUpdateTrackers}
        rowDescriptors={rowDescriptors}
      />
    );
  }
}

TrackersPage.propTypes = {
  extensionInstallation: PropTypes.object,
  updateSettings: PropTypes.func,
};

function mapStateToProps() {
  return {
    extensionInstallation: getExtensionInstallation(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSettings: (extension, settings) => dispatch(updateExtensionSettings(extension, settings)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackersPage);
