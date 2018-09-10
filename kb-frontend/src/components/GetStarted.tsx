import * as React from 'react';
import { Button } from 'react-bootstrap';

interface IGSState {
    showContent: boolean;
}

interface IGSProps {
    display: any;
}

export class GetStarted extends React.Component<IGSProps, IGSState> {
    constructor(props: any, context: any) {
     super(props, context);
     this.openTwitter = this.openTwitter.bind(this);
     this.state = {
        showContent: true
      };
    }

    public render() {
        if (this.state.showContent) {
            return (
                <div className="App-intro">
                    <h4>Welcome!! You are all set with order. Please click here to get into twitter.</h4>
                    <Button bsStyle="success" onClick={this.openTwitter}>TAKE ME IN</Button>
              </div>
            );
        } 
        return null;        
    }

    public openTwitter() {
        this.props.display(true);
        this.setState({
          showContent: false
        });
      }
  }
 