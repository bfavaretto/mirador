import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import AnnotationSettings from '../containers/AnnotationSettings';
import CompanionWindow from '../containers/CompanionWindow';
import ns from '../config/css-ns';

/**
 * WindowSideBarAnnotationsPanel ~
*/
export class WindowSideBarAnnotationsPanel extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle click event of an annotation.
   * If the item is being selected, check modifying keys to determine if
   * it should be the new selection or add to the existing selections
   * If the item is already selected, remove it from the list
  */
  handleClick(event, annotation) {
    const {
      deselectAnnotation, selectAnnotation, selectedAnnotationIds, setAnnotations, windowId,
    } = this.props;

    if (selectedAnnotationIds.includes(annotation.id)) {
      deselectAnnotation(windowId, annotation.targetId, annotation.id);
    } else if (event.shiftKey || event.metaKey) {
      selectAnnotation(windowId, annotation.targetId, annotation.id);
    } else {
      setAnnotations(windowId, annotation.targetId, annotation.id);
    }
  }

  /**
   * Rreturn an array of sanitized annotation data
   */
  sanitizedAnnotations() {
    const {
      annotations,
      selectedAnnotationIds,
    } = this.props;

    return (
      <List>
        {
          annotations.map(annotation => (
            <ListItem
              key={annotation.id}
              selected={selectedAnnotationIds.includes(annotation.id)}
              onClick={e => this.handleClick(e, annotation)}
            >
              <Typography variant="body2">
                <SanitizedHtml ruleSet="iiif" htmlString={annotation.content} />
              </Typography>
            </ListItem>
          ))
        }
      </List>
    );
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotations, classes, t, windowId, id,
    } = this.props;
    return (
      <CompanionWindow title={t('annotations')} paperClassName={ns('window-sidebar-annotation-panel')} windowId={windowId} id={id}>
        <AnnotationSettings windowId={windowId} />
        <div className={classes.section}>
          <Typography variant="subtitle2">{t('showingNumAnnotations', { number: annotations.length })}</Typography>
        </div>
        {this.sanitizedAnnotations()}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  deselectAnnotation: PropTypes.func.isRequired,
  selectAnnotation: PropTypes.func.isRequired,
  selectedAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  setAnnotations: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  annotations: [],
  selectedAnnotationIds: [],
  t: key => key,
};
