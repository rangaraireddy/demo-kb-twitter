import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CancelFeed } from './CancelFeed';

import './KidboxTwitter.css';

interface IKBTwitterState {
    cancelFeed: any[]
}
  
interface IKBTwitterProps {
    resourceKeys: any;
}

export class KidboxTwitter extends React.Component<IKBTwitterProps, IKBTwitterState> {
    public buttons: HTMLDivElement;
    constructor(props: any, context: any) {
        super(props, context)
        this.closeTwitterFeed = this.closeTwitterFeed.bind(this);
        this.authorizeTwitterAccount = this.authorizeTwitterAccount.bind(this);
        this.state = {
            cancelFeed: []
        };
      }

    public render() {
        return (
            <div>
                <h4>
                    Thanks for shopping at Kidbox.
                    Please let us know if you are willing to authorize your twitter account to post about this purchase.
                </h4>
                <div ref={ (el) => { if (el) { this.buttons = el; } }}>
                    <Button className="kb-button" bsStyle="primary" bsSize="large" onClick={this.authorizeTwitterAccount}>Open my Twitter</Button> <br />
                    <Button className="kb-button kb-close-button" bsSize="large" onClick={this.closeTwitterFeed}>No I'm good.</Button>
                </div>
                {this.state.cancelFeed}
            </div>                  
        );
    }

    public async authorizeTwitterAccount() {
        const data = await fetch(`http://localhost:5000/kb/getTokens`).then(response => response.json());
         this.props.resourceKeys(data);
         window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${data[0]}`
    }

    private closeTwitterFeed = () => {
        this.buttons.remove();
        this.setState({
            cancelFeed: this.state.cancelFeed.concat(<CancelFeed key={this.state.cancelFeed.length} />)
        });
    }
  }
    