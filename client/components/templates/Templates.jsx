import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';

import { FlexRow, HorizontalSpacer, Text } from '../common';
import { TemplateListItem } from './TemplateListItem';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchTemplates } from '../../hooks/useSearchTemplates';

const Header = styled.div`
  padding: 0.5em 0.75em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.span`
  width: 100%;
`;

const SearchInput = styled(InputText)`
  width: 100%;
`;

export function Templates() {
  const [isOnlyMineChecked, setOnlyMineChecked] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const templateResults = useSearchTemplates(
    debouncedSearchTerm,
    isOnlyMineChecked,
  );

  const handleOnlyMineChange = React.useCallback((e) => {
    setOnlyMineChecked(e.value);
  }, []);

  const handleSearchTextChange = React.useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const headerActions = (
    <FlexRow align="center">
      <Text size="sm" color="secondary">
        Only Mine
      </Text>
      <HorizontalSpacer size="0.5em" />
      <InputSwitch
        checked={isOnlyMineChecked}
        onChange={handleOnlyMineChange}
      />
    </FlexRow>
  );

  return (
    <div>
      <Header title="Templates" actions={headerActions}>
        <div>
          <Text>Templates</Text>
          <HorizontalSpacer size="0.5em" />
          {templateResults.isLoading && <i className="pi pi-spin pi-spinner" />}
        </div>
        <FlexRow align="center">
          <Text size="sm" color="secondary">
            Only Mine
          </Text>
          <HorizontalSpacer size="0.5em" />
          <InputSwitch
            checked={isOnlyMineChecked}
            onChange={handleOnlyMineChange}
          />
        </FlexRow>
      </Header>

      <SearchContainer className="p-input-icon-left">
        <i className="pi pi-search" />
        <SearchInput
          className="p-inputtext-sm"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchTextChange}
        />
      </SearchContainer>

      {templateResults.templates.map((template) => (
        <TemplateListItem key={template._id} template={template} />
      ))}
    </div>
  );
}