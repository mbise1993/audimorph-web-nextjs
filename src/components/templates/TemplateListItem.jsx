import PropTypes from 'prop-types';
import React from 'react';

import { EditorState } from '../../state/editorState';
import { ListItem } from '../common';
import { useConfirmation } from '../../hooks/useConfirmation';

export const TemplateListItem = ({ template }) => {
  const editorState = EditorState.useContainer();
  const confirmationDialog = useConfirmation({
    headerText: `Use Template "${template.name}"?`,
    bodyText: `Are you sure you want to use this template? All your current changes will be lost.`,
    onConfirm: () => {
      editorState.setCurrentTemplate(template);
    },
  });

  return (
    <>
      <ListItem
        primaryText={template.name}
        secondaryText={template.description}
        onClick={() => confirmationDialog.setOpen(true)}
      />

      <confirmationDialog.Component />
    </>
  );
};

TemplateListItem.propTypes = {
  template: PropTypes.object,
};
