import * as React from 'react';
import { Button } from 'react-bootstrap';
import * as Modal from 'react-modal';

interface IDialogState {
    isDialogOpen: boolean;
    inputValue: string;
}

const customStyles = {
    content : {
        bottom                : 'auto',
        left                  : '50%',
        marginRight           : '-50%',
        right                 : 'auto',
        top                   : '50%',
        transform             : 'translate(-50%, -50%)'
    }
  };

const footerStyle: any = {
    'textAlign': 'center'
};

export class FooterDialog extends React.Component<{}, IDialogState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            inputValue: '',
            isDialogOpen: false
        }
        this.openDialog = this.openDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }
    public render() {
        return (
        <footer style={footerStyle}>
            <Button className="kb-button" bsStyle="primary" onClick={this.openDialog}>Post on Kidbox's twitter</Button>
            <Modal
                ariaHideApp={false}
                isOpen={this.state.isDialogOpen}
                onRequestClose={this.handleClose}
                style={customStyles}
                contentLabel="Post on Kidbox's twitter">

                <h2>Tweet in Kidbox</h2>
                <div>Post your message here</div>
                <form>
                    <input value={this.state.inputValue} onChange={this.updateInputValue}/>                    
                    <Button className="kb-button kb-close-button" onClick={this.handleClose}>TWEET</Button>
                </form>
            </Modal>
         </footer>
        );
    }

    public updateInputValue(evt: any) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    public openDialog = () => this.setState({ isDialogOpen: true })
 
    public handleClose = () => {
        if (this.state.inputValue) {           
            fetch(`http://localhost:5000/kb/tweetToApplication`, {
                body: JSON.stringify({
                  message: this.state.inputValue
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'POST'
            }).then(() => {
                alert('Successfully tweeted.')
                this.setState({ isDialogOpen: false });
            }).catch(() => {
                alert('Something went wrong. Please try again')
                this.setState({ isDialogOpen: false });
            });
        } else {
            this.setState({ isDialogOpen: false });
        }
    }
  }
    