import _ from 'lodash';

/**
 * Returns the lead image URL from the provided RSS resource
 *
 * @param resource The RSS resource.
 * @returns {string} The image URL or undefined.
 */
export function getLeadImageUrl(resource) {
  return _.get(resource, 'imageAttachments[0].src');
}
