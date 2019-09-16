import React, { Component } from 'react'
import Header from '../components/header'
import RoleField from '../components/roleField'
import Roles from '../configuration/roles.json'

export default class Mafia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: {
                code: "",
                players: []
            },
            roles: Roles
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
    }

    handleChange(event) {
        const update = this.state.roles;
        update[event.target.name] = event.target.value;
        this.setState({ config: update });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ started: true });

        fetch('/api/game', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.roles)
        })
            .then(res => res.json()
                .then((game) => {
                    this.setState(game);
                }))
    }

    checkGameStatus = () =>
        fetch(`/api/game/${this.state.game.code}`)
            .then(res => res.json()
                .then((game) => {
                    this.setState(game)
                })
            )

    render() {
        return (
            <div className={'margin'} style={{ textAlign: 'center' }}>
                <Header />
                You are the Narrator.  You understand the rules of the game and will direct players as they play.
                <br />
                <br />
                <div>
                    <form onSubmit={this.handleSubmit} className={'container-column container__align-center'}>
                        {this.state.roles.map(role => (
                            <RoleField
                                key={role.role}
                                role={role.role}
                                roleName={role.roleName}
                                value={role.startingValue}
                                started={this.state.started}
                                handleChange={this.handleChange}>
                            </RoleField>
                        ))}
                        <input className={'button'} type="submit" value="Submit" disabled={this.state.started} />
                    </form>
                </div>
                <br />
                <br />
                <div className={'container-column'} style={!this.state.started ? { display: 'none' } : {}}>
                    <div className={'flex-item container-column container__align-center'}>
                        <span className={'flex-item'}>Others can join your game using this code: <b>{this.state.game.code}</b></span>
                        <div className={'flex-item'}>
                            <span>Players are listed below:</span>
                            {this.state.game.players.map(player => (
                                <div key={player.id}>{player.role}: {player.name}</div>
                            ))}
                        </div>
                        <button className={'button flex-item'} onClick={this.checkGameStatus}>Refresh</button>
                    </div>
                </div>
            </div>
        );
    }
}