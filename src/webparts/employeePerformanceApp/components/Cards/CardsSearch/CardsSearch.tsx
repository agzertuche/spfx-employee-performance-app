import * as React from 'react';
import {
  IBasePickerSuggestionsProps,
  NormalPeoplePicker,
} from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ICardsSearchProps } from './ICardsSearchProps';
import IUser from '../../../models/IUser';

export default class CardsSearch extends React.Component<
  ICardsSearchProps,
  {}
> {
  constructor(props: ICardsSearchProps) {
    super(props);

    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);

    this.peopleList = this.convertUsersToPersonas(props.users);
  }

  private peopleList: IPersonaProps[];
  private suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested Employees',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading...',
  };

  private convertUsersToPersonas(users: IUser[]): IPersonaProps[] {
    return users.map(u => {
      return {
        ...u,
        primaryText: u.displayName || '',
        secondaryText: u.jobTitle || '',
        tertiaryText: u.officeLocation || '',
        optionalText: u.department || '',
      };
    });
  }

  private onFilterChanged(
    filterText: string,
    currentPersonas: IPersonaProps[],
  ) {
    if (!filterText || filterText.length === 0) {
      return [];
    }

    return this.removeDuplicates(
      this.filterPersonasByText(filterText),
      currentPersonas,
    );
  }

  private filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.peopleList.filter(u => {
      return (
        u.primaryText.toUpperCase().indexOf(filterText.toUpperCase()) > -1 ||
        u.secondaryText.toUpperCase().indexOf(filterText.toUpperCase()) > -1
      );
    });
  }

  private removeDuplicates(
    personas: IPersonaProps[],
    possibleDupes: IPersonaProps[],
  ) {
    return personas.filter(
      persona => !this.listContainsPersona(persona, possibleDupes),
    );
  }

  private listContainsPersona(
    persona: IPersonaProps,
    personas: IPersonaProps[],
  ) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }

    return personas
      .filter(
        item =>
          item.primaryText.toUpperCase() === persona.primaryText.toUpperCase(),
      )
      .pop();
  }

  private onChangeSelection(items) {
    this.props.onChangeSelectedUsers(items);
  }

  public render(): React.ReactElement<ICardsSearchProps> {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={this.onFilterChanged}
        getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
        pickerSuggestionsProps={this.suggestionProps}
        className={'ms-PeoplePicker'}
        onChange={this.onChangeSelection}
      />
    );
  }
}
