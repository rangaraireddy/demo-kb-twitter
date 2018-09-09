import * as React from 'react';
import { Button } from 'react-bootstrap';
import { KidboxTwitter } from './twitter/KidboxTwitter';

import './App.css';

interface IState {
  twitterAccessList: any[];
}

class App extends React.Component<{}, IState> {
  public twitterButton: HTMLElement;
  constructor(props: any, context: any) {
    super(props, context)
    this.openTwitter = this.openTwitter.bind(this);
    this.state = {
      twitterAccessList: []
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://cdn.kidbox.me/v/images/facelift/home/kb-logo-new.519e77bba.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome KIDS</h1>
        </header>
        <div ref={ (el) => { if (el) { this.twitterButton = el; } }} className="App-intro">
          <h4>Congratulations!! You are all set. Click here to get into twitter.</h4>
          <Button bsStyle="success" onClick={this.openTwitter}>TAKE ME IN</Button>
        </div>
        {this.state.twitterAccessList}
      </div>
    );
  }

  public openTwitter(ev: any) {
    this.twitterButton.remove();
    const twitterAccountAccess: any[] = [];
    this.setState({
      twitterAccessList: twitterAccountAccess.concat(<KidboxTwitter key={twitterAccountAccess.length} />)
    });
  }
}

export default App;
