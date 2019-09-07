import React, { Component } from 'react'
import MafiaPresentation from '../components/mafiaPresentation';

export default class MafiaContainer extends Component {
    static getInitialProps = ({ query }) => {
        return ({ id: query.id, name: query.name, character: '' });
    }

    async componentDidMount() {
        const res = await fetch(`/api/mafia/${this.props.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.id,
                name: this.props.name
            })
        });
        const state = await res.json()
        console.log(state)
        this.setState(state);
    }

    render = () => <MafiaPresentation {...this.state}></MafiaPresentation>;
}
