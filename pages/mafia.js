import React, { Component } from 'react'
import MafiaPresentation from '../components/mafiaPresentation';
import PlayerRequest from '../models/playerRequest';

export default class MafiaContainer extends Component {
    static getInitialProps = ({ query }) => {
        return ({ id: query.id, name: query.name, session: query.session });
    }

    async componentDidMount() {
        const res = await fetch(`/api/mafia/${this.props.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new PlayerRequest(
                this.props.id,
                this.props.name,
                this.props.session
            ))
        });
        const state = await res.json()
        this.setState(state);
    }

    render = () => <MafiaPresentation {...this.state}></MafiaPresentation>;
}
