import React, { Component } from 'react'
import Header from '../components/header'
import RoleField from '../components/roleField'

export default class Mafia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: {
                code: "",
                players: []
            },
            config: {
                Cop: 1,
                Mafia: 2,
                Doctor: 1,
                TownWatch: 1,
                Townsfolk: 3
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
    }

    handleChange(event) {
        const update = this.state.config;
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
            body: JSON.stringify(this.state.config)
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
            <div className={'margin'} style={{textAlign: 'center'}}>
                <Header />
                You are the Narrator.  You understand the rules of the game and will direct players as they play.
                <br />
                <br />
                <div>
                    <form onSubmit={this.handleSubmit} className={'container-column container__align-center'}>
                        <RoleField
                            role={'Cops'}
                            roleName={'Cop'}
                            value={this.state.config.Cop}
                            started={this.state.started}
                            handleChange={this.handleChange}>
                        </RoleField>
                        <RoleField
                            role={'Mafia'}
                            roleName={'Mafia'}
                            value={this.state.config.Mafia}
                            started={this.state.started}
                            handleChange={this.handleChange}>
                        </RoleField>
                        <RoleField
                            role={'Doctors'}
                            roleName={'Doctor'}
                            value={this.state.config.Doctor}
                            started={this.state.started}
                            handleChange={this.handleChange}>
                        </RoleField>
                        <RoleField
                            role={'Town Watch'}
                            roleName={'TownWatch'}
                            value={this.state.config.TownWatch}
                            started={this.state.started}
                            handleChange={this.handleChange}>
                        </RoleField>
                        <RoleField
                            role={'Townsfolk'}
                            roleName={'Townsfolk'}
                            value={this.state.config.Townsfolk}
                            started={this.state.started}
                            handleChange={this.handleChange}>
                        </RoleField>
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