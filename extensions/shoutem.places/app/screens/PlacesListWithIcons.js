import React from 'react';
import { connect } from 'react-redux';
import { connectStyle } from '@shoutem/theme';
import { ext } from '../const';
import { PlacesList } from '../screens/PlacesList';
import { mapStateToProps, mapDispatchToProps } from './PlacesList/PlacesListBase';
import PlaceIconView from '../components/PlaceIconView';

class PlacesListWithIcons extends PlacesList {
  static propTypes = {
    ...PlacesList.propTypes,
  }

  renderRow(place) {
    return <PlaceIconView place={place} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('PlacesListWithIcons'))(PlacesListWithIcons),
);
