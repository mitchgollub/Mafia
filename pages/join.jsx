import { withRouter } from 'next/router';
import React from 'react';
import Layout from '../components/layout';

const uuidv4 = require('uuid/v4');

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', code: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value, code: this.state.code });
  }

  handleCodeChange(event) {
    this.setState({ name: this.state.name, code: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.router.push(
      `/mafia?id=${this.state.code}&name=${
        this.state.name
      }&session=${uuidv4()}`,
    );
  }

  render() {
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
