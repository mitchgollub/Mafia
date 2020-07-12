import { Router, withRouter } from 'next/router';
import React from 'react';
import Layout from '../components/layout';
import * as uuid from 'uuid';
import PlayerRequest from '../models/playerRequest';

class Join extends React.Component<{ router: Router }> {
  state = { name: '', code: '' } as PlayerRequest;

  constructor(props: { router: Router }) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ name: event.target.value, code: this.state.code });
  }

  handleCodeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ name: this.state.name, code: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.props.router.push(
      `/mafia?code=${this.state.code}&name=${
        this.state.name
      }&session=${uuid.v4()}`,
    );
  }

  render(): JSX.Element {
    return (
      <Layout>
        <form
          className="flex-item container-column container__align-center"
          onSubmit={this.handleSubmit}
        >
          <div className="flex-item margin">
            <label>
              <span>Enter Name</span>
              <input
                className="margin"
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
          </div>
          <div className="flex-item margin">
            <label>
              <span>Enter Game Code</span>
              <input
                className="margin"
                type="text"
                value={this.state.code}
                onChange={this.handleCodeChange}
              />
            </label>
          </div>
          <input className="flex-item button" type="submit" value="Submit" />
        </form>
      </Layout>
    );
  }
}

export default withRouter(Join);
