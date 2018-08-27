import * as React from 'react';
import { ICardsProps } from './ICardsProps';
import { ICardsState } from './ICardsState';
import IUser from '../../models/IUser';
import CardsSearch from './CardsSearch';
import CardsList from './CardsList';
import IEmployee from '../../models/IEmployee';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import Placeholder from '../Common/Placeholder';

export default class Cards extends React.Component<ICardsProps, ICardsState> {
  constructor(props: ICardsProps) {
    super(props);

    debugger;

    this._updateSelectedEmployees = this._updateSelectedEmployees.bind(this);

    this.state = {
      selectedEmployees: [],
    };
  }

  public static defaultProps: Partial<ICardsProps> = {
    users: [],
    employeeInformation: [],
    earnedAchievements: [],
    achievements: [],
    performanceSkills: [],
  };

  private _getEmployeeAchievements(userPrincipalName: string): IAchievement[] {
    const { earnedAchievements, achievements } = this.props;

    const employeeAchievements = earnedAchievements.filter(
      a => a.userPrincipalName === userPrincipalName,
    );

    return achievements.filter(a => {
      return employeeAchievements.some(x => x.id === a.id);
    });
  }

  private _getEmployeePerformanceSkills(
    userPrincipalName: string,
  ): IPerformanceSkills[] {
    const { performanceSkills } = this.props;

    return performanceSkills.filter(
      ps => ps.userPrincipalName === userPrincipalName,
    );
  }

  private _getEmployees(users: IUser[]): IEmployee[] {
    const { employeeInformation } = this.props;

    return users.map(user => {
      const employeeInfo = employeeInformation
        .filter(e => {
          return e.userPrincipalName === user.userPrincipalName;
        })
        .pop();

      if (employeeInfo) {
        return {
          ...employeeInfo,
          ...user,
          achievements: this._getEmployeeAchievements(user.userPrincipalName),
          performanceSkills: this._getEmployeePerformanceSkills(
            user.userPrincipalName,
          ),
        };
      }
    });
  }

  private _updateSelectedEmployees(users: IUser[]) {
    this.setState({
      selectedEmployees: this._getEmployees(users),
    });
  }

  public render(): React.ReactElement<ICardsProps> {
    const { users } = this.props;

    if (users.length === 0) {
      return (
        <Placeholder
          displaySpinner
          spinnerText={'Loading employees data... please wait.'}
        />
      );
    }

    return (
      <div className={`ms-Grid-row ms-u-slideDownIn20`}>
        <div className="ms-Grid-col ms-u-sm12">
          <div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12">
                <CardsSearch
                  onChangeSelectedUsers={this._updateSelectedEmployees}
                  users={users}
                />
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12">
                <CardsList employees={this.state.selectedEmployees} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
