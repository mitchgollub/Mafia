import React, { Component } from 'react'
import MafiaPresentation from '../components/mafiaPresentation';

export default class MafiaContainer extends Component {
    static getInitialProps = ({ query }) => {
        return ({ id: query.id, character: '' });
    }

    async componentDidMount() {
        const res = await fetch(`/api/mafia/${this.props.id}`);
        const state = await res.json()
        console.log(state)
        this.setState(state);
    }

    render = () => <MafiaPresentation {...this.state}></MafiaPresentation>;
}
