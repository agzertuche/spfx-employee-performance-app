import * as React from 'react';
import { ICardsListProps } from './ICardsListProps';
import Placeholder from '../../Common/Placeholder';
import Card from '../../Common/Card';

const CardsList: React.StatelessComponent<ICardsListProps> = props => {
  const { employees } = props;

  CardsList.defaultProps = {
    employees: employees || [],
  };

  const cards = employees.map((e, index) => {
    if (!e) {
      return (
        <Placeholder
          key={index}
          icon="ContactCard"
          title="Employee not found"
          description="No employee information found for this user..."
        />
      );
    }

    return <Card key={index} employee={e} />;
  });

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-u-sm12">
        {cards.length > 0 ? (
          cards
        ) : (
          <Placeholder
            icon="Search"
            title="No employees selected"
            description="Please search for employees and select at least one..."
          />
        )}
      </div>
    </div>
  );
};

export default CardsList;
