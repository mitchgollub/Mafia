import React, { Component } from 'react'
// import io from 'socket.io-client'

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

        const update = this.state.config;


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
            <div>
                You are the Narrator.  You understand the rules of the game and will direct players as they play.
                <br />
                <br />
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Cops
                        <input type="number" size="2" min="1" max="10"
                                name="Cop" value={this.state.config.Cop} onChange={this.handleChange}
                                disabled={this.state.started} required />
                        </label>
                        <label>
                            Mafia
                        <input type="number" size="2" min="1" max="10"
                                name="Mafia" value={this.state.config.Mafia} onChange={this.handleChange}
                                disabled={this.state.started} required />
                        </label>
                        <label>
                            Townsfolk
                        <input type="number" size="2" min="1" max="10"
                                name="Townsfolk" value={this.state.config.Townsfolk} onChange={this.handleChange}
                                disabled={this.state.started} required />
                        </label>
                        <input type="submit" value="Submit" disabled={this.state.started} />
                    </form>
                </div>
                <br />
                <br />
                <div style={!this.state.started ? { display: 'none' } : {}}>
                    <span>Others can join your game using this code: <b>{this.state.game.code}</b></span>
                    <br />
                    <br />
                    <button onClick={this.checkGameStatus}>Refresh</button>
                    <span>Players are listed below:</span>
                    {this.state.game.players.map(player => (
                        <div key={player.id}>{player.role}: {player.name}</div>
                    ))}
                </div>
            </div>
        );
    }
}