import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
export function MiradorMenuButton(props) {
  const { 'aria-label': ariaLabel } = props;
  const { children, wrapperClassName, ...iconButtonProps } = props;

  return (
    <Tooltip title={ariaLabel}>
      <IconButton {...iconButtonProps}>{children}</IconButton>
    </Tooltip>
  );
}

MiradorMenuButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  wrapperClassName: PropTypes.string,
};

MiradorMenuButton.defaultProps = {
  wrapperClassName: null,
};
