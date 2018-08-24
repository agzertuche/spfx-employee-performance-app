import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import styles from './styles.module.scss';
import { IIconComponentProps } from './IIconComponentProps';
import { Size } from '../../../models/Enums';

const IconComponent: React.StatelessComponent<IIconComponentProps> = props => {
  const { title, description, iconName, size } = props;

  const renderTitle = () => {
    if (!title) {
      return;
    }

    return <div className={styles.iconTitle}>{title}</div>;
  };

  let iconSize: any = {
    fontSize: 'xx-large',
  };

  let fontSize: any = {
    fontSize: 'small',
  };

  switch (size) {
    case Size.XXSmall:
      iconSize = { fontSize: '.7em' };
      fontSize = { fontSize: '.7em' };
      break;
    case Size.XSmall:
      iconSize = { fontSize: '.9em' };
      fontSize = { fontSize: '.8em' };
      break;
    case Size.Small:
      iconSize = { fontSize: '1.2em' };
      fontSize = { fontSize: '.8em' };
      break;
    case Size.Medium:
      iconSize = { fontSize: '1.4em' };
      fontSize = { fontSize: '.9em' };
      break;
    case Size.Large:
      iconSize = { fontSize: '2em' };
      fontSize = { fontSize: '.9em' };
      break;
    case Size.XLarge:
      iconSize = { fontSize: '2.4em' };
      fontSize = { fontSize: '1em' };
      break;
    case Size.XXLarge:
      iconSize = { fontSize: '3em' };
      fontSize = { fontSize: '1em' };
      break;
    default:
      iconSize = { fontSize: '1.4em' };
      fontSize = { fontSize: '.9em' };
  }

  return (
    <div className={styles.iconComponent}>
      <div className="ms-Grid-row">
        <div className={`${styles.icon} ms-Grid-col ms-u-sm3`}>
          <Icon iconName={iconName} style={iconSize} />
        </div>
        <div className={`ms-Grid-col ms-u-sm9`} style={fontSize}>
          {renderTitle()}
          <div className={styles.iconDescription}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default IconComponent;
