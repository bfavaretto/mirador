import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { ErrorDialog } from '../components/ErrorDialog';
import * as actions from '../state/actions';

/**
 * mapStateToProps - to hook up connect
 * @memberof ErrorDialog
 * @private
 */
const mapStateToProps = state => ({
  errors: state.errors,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  addError: actions.addError,
  removeError: actions.removeError,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ErrorDialog);
