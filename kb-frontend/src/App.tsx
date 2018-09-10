import * as React from 'react';
import { KidboxTwitter } from './twitter/KidboxTwitter';

import './App.css';
import { GetStarted } from './twitter/GetStarted';
import { Authorization } from './twitter/Models';

interface IState {
  twitterAccessList: any[];
  authenticated: string;
  twitterName: string;
}

class App extends React.Component<{}, IState> {
  public twitterButton: HTMLElement;
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      authenticated: Authorization[Authorization.UnAuthorized],
      twitterAccessList: [],
      twitterName: ''
    };
    const queryParams = window.location.search;
    if(queryParams) {
      this.getOAuthDetails(queryParams);
    }
  }

  public render() {
    let isLoggedIn;
    if (this.state.authenticated === Authorization[Authorization.UnAuthorized]) {
      isLoggedIn = <div>
                    <GetStarted display={this.getStarted}/>
                    {this.state.twitterAccessList}
                </div>
    } else if (this.state.authenticated === Authorization[Authorization.InProgress]) {
      isLoggedIn = <h4>LOADING</h4>
    } else if (this.state.authenticated === Authorization[Authorization.Authorized]) {
      isLoggedIn = <h1>Successfully posted on your account @{this.state.twitterName}. Thanks and visit us again!!</h1>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://cdn.kidbox.me/v/images/facelift/home/kb-logo-new.519e77bba.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome KIDS</h1>
        </header>
        {isLoggedIn}
      </div>
    );
  }

  public getStarted = (value: boolean) => {
    if (value) {
      const twitterAccountAccess: any[] = [];
      this.setState({
        twitterAccessList: twitterAccountAccess.concat(<KidboxTwitter key={twitterAccountAccess.length} resourceKeys={this.storeKeys} />)
      }); 
    }
  }

  public getOAuthDetails = (searchParams: string) => {
    const queryParams = searchParams.replace(/\?/, '').split('&').reduce((accumulator, singleQueryParam) => {
      const [key, value] = singleQueryParam.split('=');
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
    setTimeout(() => {
      this.setState({
        authenticated: ''.concat(Authorization[Authorization.InProgress])
      });
    }, 0);
    this.getUserData(queryParams);
  }

  public storeKeys = (data: any) => {
    window.localStorage.clear();
    window.localStorage.setItem('roKeys', data);
  }

  public async getUserData(authTokens: any) {
    const baseUrl = 'http://localhost:5000/kb/fetchUserData';
    const roKeys = window.localStorage.getItem('roKeys')
    const roKeysArr = roKeys ? roKeys.split(',') : [];
    const userDataUrl = `${baseUrl}?roKey=${roKeysArr[0]}&roSecret=${roKeysArr[1]}&verifier=${authTokens.oauth_verifier}`
    const userData = await fetch(userDataUrl).then(response => response.json());
    // tslint:disable-next-line:no-console
    console.log(userData);
    setTimeout(() => {
      this.setState({
        authenticated: ''.concat(Authorization[Authorization.Authorized]),
        twitterName: userData.screen_name
      });
    }, 1000);
  }
}

export default App;
