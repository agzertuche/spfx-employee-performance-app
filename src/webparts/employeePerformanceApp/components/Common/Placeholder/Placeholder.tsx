import * as React from 'react';
import styles from './styles.module.scss';
import { IPlaceholderProps } from './IPlaceholderProps';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react';

const Placeholder: React.StatelessComponent<IPlaceholderProps> = props => {
  const { title, description, icon, spinnerText, displaySpinner } = props;

  Placeholder.defaultProps = {
    icon: 'Error',
    displaySpinner: false,
    spinnerText: ' Loading...',
  };

  const displayTitleRow = title || description;
  return (
    <div className={styles.placeholder}>
      <div className={`ms-Grid-row ${styles.container}`}>
        <div className="ms-Grid-col ms-u-sm12">
          {displayTitleRow && (
            <div className={`ms-Grid-row ${styles.title}`}>
              <div className={`${styles.icon} ms-Grid-col ms-u-sm12 ms-u-md4`}>
                <Icon iconName={icon} />
              </div>
              <div className={`ms-Grid-col ms-u-sm12 ms-u-md8`}>
                <h2>{title}</h2>
                <div>{description}</div>
              </div>
            </div>
          )}
          {displaySpinner && (
            <div className="ms-Grid-row">
              <Spinner
                className={styles.spinner}
                size={SpinnerSize.large}
                label={spinnerText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
