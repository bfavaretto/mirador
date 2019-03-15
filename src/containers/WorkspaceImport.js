import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { WorkspaceImport } from '../components/WorkspaceImport';
import * as actions from '../state/actions';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  addError: actions.addError,
  importConfig: actions.importWorkspace,
};

const enhance = compose(
  withTranslation(),
  connect(null, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WorkspaceImport);
