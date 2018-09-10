import * as React from 'react';
import { KidboxTwitter } from './twitter/KidboxTwitter';

import './App.css';
import { GetStarted } from './twitter/GetStarted';
import { Authorization } from './twitter/Models';

interface IState {
  twitterAccessList: any[];
  authenticated: string;
}

class App extends React.Component<{}, IState> {
  public twitterButton: HTMLElement;
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      authenticated: Authorization[Authorization.UnAuthorized],
      twitterAccessList: []
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
    } else if (this.state.authenticated === Authorization[Authorization.InProgress]) {
      isLoggedIn = <div>Successfully posted on your twitter. Thanks again!!</div>
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
        twitterAccessList: twitterAccountAccess.concat(<KidboxTwitter key={twitterAccountAccess.length} resourceKeys={this.useKeys} />)
      }); 
    }
  }

  public getOAuthDetails = (searchParams: string) => {
    const queryParams = searchParams.replace(/\?/, '').split('&').reduce((accumulator, singleQueryParam) => {
      const [key, value] = singleQueryParam.split('=');
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
    setInterval(() => {
      this.setState({
        authenticated: ''.concat(Authorization[Authorization.InProgress])
      });
      
    }, 0);
    
    // tslint:disable-next-line:no-console
    console.log(queryParams);
    
  }

  public useKeys = (data: any) => {
    window.localStorage.setItem('roKeys', data);
  }
}

export default App;
