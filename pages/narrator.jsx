import React, { Component } from 'react';
import Layout from '../components/layout';
import Loading from '../components/loading';
import RoleField from '../components/roleField';
import Roles from '../configuration/roles.json';
import Game from '../models/game';

export default class Mafia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Game(),
      roles: Roles,
      started: false,
      refresh: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkGameStatus = this.checkGameStatus.bind(this);
  }

  handleChange(event) {
    const update = this.state.roles;
    const targetIndex = update.findIndex((role) => role.role === event.target.name);
    update[targetIndex].startingValue = event.target.value;
    this.setState({ roles: update });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ started: true });

    fetch('/api/game', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.roles),
    })
      .then((res) => res.json()
        .then((game) => {
          console.log(game);
          this.setState({ game });
        }));
  }

  checkGameStatus() {
    this.setState({ refresh: true });
    fetch(`/api/game/${this.state.game.code}`)
      .then((res) => res.json()
        .then((game) => {
          this.setState({ game });
          this.setState({ refresh: false });
        }));
  }

  render() {
    return (
      <Layout>
        <div className="flex-item">
          <form onSubmit={this.handleSubmit} className="container-column container__align-center">
            <span className="margin">
              You are the Narrator.  You understand the rules of the game and will direct players as they play.
            </span>
            {this.state.roles.map((role) => (
              <RoleField
                key={role.role}
                role={role.role}
                roleName={role.roleName}
                value={role.startingValue}
                started={this.state.started}
                handleChange={this.handleChange}
              />
            ))}
            <input className="button" type="submit" value="Submit" disabled={this.state.started} />
          </form>
        </div>
        <div className="flex-item container-column margin-top-2" style={!this.state.started ? { display: 'none' } : {}}>
          <div className="flex-item container-column container__align-center" style={this.state.error ? { display: 'none' } : {}}>
            <span className="flex-item">
              Others can join your game using this code:
              <b>{this.state.game.code}</b>
            </span>
            <div className="flex-item">
              <span>Players are listed below:</span>
              {this.state.game.players.map((player) => (
                <div key={player.id}>
                  {player.role}
                  :
                  {' '}
                  {player.name}
                </div>
              ))}
            </div>
            <button
              className="button flex-item"
              onClick={this.checkGameStatus}
              disabled={this.state.refresh}
            >
              {this.state.refresh ? <Loading /> : 'Refresh'}
            </button>
          </div>
          <div className="flex-item container-column container__align-center" style={!this.state.error ? { display: 'none' } : {}}>
            <span className="flex-item">Error occurred.  Please refresh and try again.</span>
          </div>
        </div>
      </Layout>
    );
  }
}
