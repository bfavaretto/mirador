import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


/**
 * Provide a locale picker
 */
export class LocalePicker extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      locale,
      availableLocales,
      setLocale,
    } = this.props;

    if (!setLocale || availableLocales.length < 2) return <></>;

    return (
      <FormControl>
        <Select
          displayEmpty
          value={locale}
          onChange={(e) => { setLocale(e.target.value); }}
          name="locale"
        >
          {
            availableLocales.map(l => (
              <MenuItem key={l} value={l}><Typography variant="body2">{ l }</Typography></MenuItem>
            ))
          }
        </Select>
      </FormControl>
    );
  }
}


LocalePicker.propTypes = {
  setLocale: PropTypes.func,
  locale: PropTypes.string,
  availableLocales: PropTypes.arrayOf(PropTypes.string),
};

LocalePicker.defaultProps = {
  setLocale: undefined,
  locale: '',
  availableLocales: [],
};
