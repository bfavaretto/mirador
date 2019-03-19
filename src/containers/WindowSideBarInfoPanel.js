import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import {
  getDestructuredMetadata,
  getCanvasLabel,
  getManifestDescription,
  getManifestTitle,
  getMetadataLocales,
  getSelectedCanvas,
  getWindowManifest,
  getCanvasDescription,
  getWindowLocale,
} from '../state/selectors';
import { WindowSideBarInfoPanel } from '../components/WindowSideBarInfoPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  canvasLabel: getCanvasLabel(
    getSelectedCanvas(state, windowId),
    state.windows[windowId].canvasIndex,
  ),
  canvasDescription: getCanvasDescription(getSelectedCanvas(state, windowId)),
  canvasMetadata: getDestructuredMetadata(
    getSelectedCanvas(state, windowId), state.companionWindows[id].locale,
  ),
  manifestLabel: getManifestTitle(getWindowManifest(state, windowId)),
  manifestDescription: getManifestDescription(getWindowManifest(state, windowId)),
  manifestMetadata: getDestructuredMetadata(
    getWindowManifest(state, windowId).manifestation, state.companionWindows[id].locale,
  ),
  availableLocales: getMetadataLocales(state, windowId),
  locale: state.companionWindows[id].locale
    || getWindowLocale(state, windowId),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId, id }) => ({
  setLocale: locale => dispatch(actions.updateCompanionWindow(windowId, id, { locale })),
});

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarInfoPanel'),
);

export default enhance(WindowSideBarInfoPanel);
