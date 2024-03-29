import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import { LoaderContainer } from '@shoutem/react-web-ui';
import './style.scss';

const MAX_VISIBLE_CATEGORIES = 2;

function getCategoryName(resource) {
  const categories = _.filter(resource.categories, { autoCreated: false });
  const categoryNames = _.map(categories, 'name');

  const visibleCategories = categoryNames.slice(0, MAX_VISIBLE_CATEGORIES);
  if (categories.length > MAX_VISIBLE_CATEGORIES) {
    visibleCategories.push(`+ ${(categoryNames.length - MAX_VISIBLE_CATEGORIES)} more`);
  }

  return visibleCategories.join(', ');
}

export default function ContentPreview({ resources, titleProp, hasContent, inProgress }) {
  return (
    <div className="content-preview">
      {hasContent && <span className="content-preview__overlay" />}
      <LoaderContainer isLoading={inProgress} isOverlay>
        <Table className="content-preview__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
          {!hasContent &&
            <tr>
              <td colSpan="2">No content yet.</td>
            </tr>
          }
          {hasContent && resources.map(resource =>
            <tr key={resource.id}>
              <td>{resource[titleProp] || ''}</td>
              <td>{getCategoryName(resource)}</td>
            </tr>
          )}
          </tbody>
        </Table>
      </LoaderContainer>
    </div>
  );
}

ContentPreview.propTypes = {
  resources: PropTypes.object.isRequired,
  titleProp: PropTypes.string.isRequired,
  hasContent: PropTypes.bool,
  inProgress: PropTypes.bool,
};
