import * as React from 'react';

import { IMainProps } from './IMainProps';
import { IMainState } from './IMainState';
import { ComponentStatus, MenuItem } from '../../models/Enums';
import { Fabric } from 'office-ui-fabric-react';
import IUser from '../../models/IUser';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import styles from './styles.module.scss';
import Nav from '../Nav';
import Placeholder from '../Common/Placeholder';
import Cards from '../Cards';
import Achievements from '../Achievements';
import Performance from '../Performance';
import Information from '../Information';

export default class Main extends React.Component<IMainProps, IMainState> {
  private menuItems: any[];

  constructor(props: IMainProps) {
    super(props);

    this._updateSelectedComponent = this._updateSelectedComponent.bind(this);

    this.state = {
      users: [],
      componentStatus: ComponentStatus.Loading,
      selectedComponent: MenuItem.Cards,
    };
  }

  public componentDidMount(): void {
    this._loadAllData();
  }

  private _loadAllData() {
    const users = this.props.dataProvider
      .getUsers()
      .then((usersArray: IUser[]) => {
        this.setState({
          users: usersArray,
        });
      });

    const empInfo = this.props.dataProvider
      .getEmployeeInformation()
      .then((empInfoArray: IEmployeeInformation[]) => {
        this.setState({
          employeeInformation: empInfoArray,
        });
      });

    const achievements = this.props.dataProvider
      .getAchievements()
      .then((achievementsArray: IAchievement[]) => {
        this.setState({
          achievements: achievementsArray,
        });
      });

    const earnedAchievements = this.props.dataProvider
      .getEarnedAchievements()
      .then((items: any[]) => {
        this.setState({
          earnedAchievements: items,
        });
      });

    const performanceSkills = this.props.dataProvider
      .getPerformanceSkills()
      .then((skills: IPerformanceSkills[]) => {
        this.setState({
          performanceSkills: skills,
        });
      });
    const promises = [
      users,
      empInfo,
      achievements,
      earnedAchievements,
      performanceSkills,
    ];

    return Promise.all(promises)
      .then(() => {
        this.setState({
          componentStatus: ComponentStatus.Completed,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          componentStatus: ComponentStatus.Error,
        });
      });
  }

  private _handleRenderMode() {
    switch (this.state.componentStatus) {
      case ComponentStatus.Loading:
        return this._renderLoading();
      case ComponentStatus.Completed:
        return this._renderApp();
      case ComponentStatus.Error:
        return this._renderError();
      default:
        return this._renderError();
    }
  }

  private _renderLoading() {
    return (
      <Placeholder
        displaySpinner
        spinnerText={'Loading employees data... please wait.'}
      />
    );
  }

  private _renderError() {
    return (
      <Placeholder
        title={'Ooops! something went wrong...'}
        description={"We couldn't start the app. Please try starting it again."}
      />
    );
  }

  private _updateSelectedComponent(item) {
    this.setState({
      selectedComponent: parseInt(item.props.itemKey, 10),
    });
  }

  private _renderSelectedComponent() {
    switch (this.state.selectedComponent) {
      case MenuItem.Information:
        return <Information users={this.state.users} />;
      case MenuItem.Achievements:
        return (
          <Achievements
            achievements={this.state.achievements}
            earnedAchievements={this.state.earnedAchievements}
            users={this.state.users}
          />
        );
      case MenuItem.Performance:
        return (
          <Performance
            performanceSkills={this.state.performanceSkills}
            usersCount={this.state.users.length}
          />
        );
      case MenuItem.Cards:
      default:
        return (
          <Cards
            users={this.state.users}
            employeeInformation={this.state.employeeInformation}
            earnedAchievements={this.state.earnedAchievements}
            achievements={this.state.achievements}
            performanceSkills={this.state.performanceSkills}
          />
        );
    }
  }

  private _renderApp() {
    return (
      <div>
        <div>
          <Nav onNavegationItemChange={this._updateSelectedComponent} />
        </div>
        <div className={styles.componentSection}>
          {this._renderSelectedComponent()}
        </div>
      </div>
    );
  }

  public render(): React.ReactElement<IMainProps> {
    return (
      <Fabric className={styles.main}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12">
              {this._handleRenderMode()}
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}
