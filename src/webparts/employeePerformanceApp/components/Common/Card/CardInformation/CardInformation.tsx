import * as React from 'react';
import { ICardInformationProps } from './ICardInformationProps';
import { ICardInformationState } from './ICardInformationState';
import styles from './styles.module.scss';
import IconComponent from '../../IconComponent';
import { Size } from '../../../../models/Enums';
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import Placeholder from '../../Placeholder';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export default class CardInformation extends React.Component<
  ICardInformationProps,
  ICardInformationState
> {
  private calloutButton: any;
  constructor(props: ICardInformationProps) {
    super(props);

    this._onCalloutClicked = this._onCalloutClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);

    this.state = {
      isCalloutVisible: false
    };
  }

  private _onCalloutDismiss() {
    this.setState({
      isCalloutVisible: false
    });
  }

  private _onCalloutClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
    return (
      <IconComponent
        iconName={'Suitcase'}
        description={props.secondaryText}
        size={Size.Medium}
      />
    );
  }

  private _renderEmployeeInformation() {
    return (
      <div>
        <div className={`${styles.summarySection} ms-Grid-row`}>
          <div className="ms-Grid-col ms-u-sm12 ms-u-hiddenMdUp">
            <Persona
              {...this.props.employee}
              primaryText={this.props.employee.displayName}
              secondaryText={this.props.employee.jobTitle}
              tertiaryText={`${this.props.employee.city}, ${
                this.props.employee.country
              }`}
              size={PersonaSize.small}
              presence={PersonaPresence.online}
              onRenderSecondaryText={this._onRenderSecondaryText}
            />
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-hiddenSm">
            <Persona
              {...this.props.employee}
              primaryText={this.props.employee.displayName}
              secondaryText={this.props.employee.jobTitle}
              tertiaryText={`${this.props.employee.city}, ${
                this.props.employee.country
              }`}
              size={PersonaSize.extraLarge}
              presence={PersonaPresence.online}
              onRenderSecondaryText={this._onRenderSecondaryText}
            />
          </div>
        </div>
        <div className={`${styles.dataSection} ms-Grid-row`}>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
            <IconComponent
              iconName={'Mail'}
              description={this.props.employee.mail}
              size={Size.Small}
            />
            <IconComponent
              iconName={'Phone'}
              description={this.props.employee.mobilePhone}
              size={Size.Small}
            />
            <IconComponent
              iconName={'Cake'}
              description={this.props.employee.birthday}
              size={Size.Small}
            />
            {this.props.employee.rewardPoints && (
              <IconComponent
                iconName={'Ribbon'}
                description={this.props.employee.rewardPoints.toString()}
                size={Size.Small}
              />
            )}
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
            <IconComponent
              iconName={'CellPhone'}
              description={this.props.employee.mobilePhone}
              size={Size.Small}
            />
            <IconComponent
              iconName={'Hospital'}
              description={this.props.employee.emergencyContacts}
              size={Size.Small}
            />
            {this.props.employee.vehicule && (
              <IconComponent
                iconName={'Car'}
                description={this.props.employee.vehicule}
                size={Size.Small}
              />
            )}
            {this.props.employee.isHomeOffice ? (
              <IconComponent
                iconName={'OutOfOffice'}
                description={'Home Office'}
                size={Size.Small}
              />
            ) : (
              <div>
                <IconComponent
                  iconName={'DeveloperTools'}
                  description={`
                  Cubicule: ${this.props.employee.officeCubicle},
                  Office: ${this.props.employee.officeLocation}
                  `}
                  size={Size.Small}
                />
              </div>
            )}
            <div
              className={styles.calloutButton}
              ref={calloutButton => (this.calloutButton = calloutButton)}
            >
              <IconButton
                style={{
                  width: 12,
                  height: 12,
                  padding: 0
                }}
                iconProps={{ iconName: 'ChevronDown' }}
                title="More information"
                onClick={this._onCalloutClicked.bind(this)}
              />
            </div>
            {this.state.isCalloutVisible && (
              <Callout
                gapSpace={1}
                target={this.calloutButton.firstChild}
                isBeakVisible
                beakWidth={12}
                onDismiss={this._onCalloutDismiss}
                directionalHint={DirectionalHint.bottomAutoEdge}
              >
                <div className={styles.calloutText}>
                  <IconComponent
                    iconName={'MoreSports'}
                    description={this.props.employee.hobbies}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'MusicInCollectionFill'}
                    description={this.props.employee.music}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'PhotoCollection'}
                    description={this.props.employee.interests}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'EatDrink'}
                    description={this.props.employee.food}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'News'}
                    description={this.props.employee.blogs}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'FacebookLogo'}
                    description={this.props.employee.facebook}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'YammerLogo'}
                    description={this.props.employee.twitter}
                    size={Size.Small}
                  />
                  <IconComponent
                    iconName={'Teamwork'}
                    description={this.props.employee.linkedIn}
                    size={Size.Small}
                  />
                </div>
              </Callout>
            )}
          </div>
        </div>
      </div>
    );
  }

  private _employeeNotFound() {
    return (
      <Placeholder
        icon="ContactCard"
        description="No information found for this user..."
      />
    );
  }

  public render(): React.ReactElement<ICardInformationProps> {
    return (
      <div className={styles.cardInformation}>
        <div className={`${styles.title} ms-font-m`}>Information</div>
        <div className={`${styles.container}`}>
          {this.props.employee
            ? this._renderEmployeeInformation()
            : this._employeeNotFound()}
        </div>
      </div>
    );
  }
}
