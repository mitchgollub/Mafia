import React, { Component } from 'react'
import RoleField from '../components/roleField'
import Roles from '../configuration/roles.json'
import Layout from '../components/layout'

export default class Mafia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: {
                code: "",
                players: []
            },
            roles: Roles,
            started: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
    }

    handleChange(event) {
        const update = this.state.roles;
        const targetIndex = update.findIndex(role => role.role === event.target.name);
        update[targetIndex].startingValue = event.target.value;
        this.setState({ roles: update });
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
            <Layout>
                <div className={'flex-item'}>
                    <form onSubmit={this.handleSubmit} className={'container-column container__align-center'}>
                        <span className={'margin'}>
                            You are the Narrator.  You understand the rules of the game and will direct players as they play.
                        </span>
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
                <div className={'flex-item container-column margin-top-2'} style={!this.state.started ? { display: 'none' } : {}}>
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
            </Layout>
        );
    }
}