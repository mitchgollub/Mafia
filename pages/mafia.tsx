import React from 'react';
import MafiaPresentation from '../components/mafiaPresentation';
import PlayerRequest from '../models/playerRequest';
import PlayerView from '../views/playerView';

type MafiaQueryType<T> = {
  query: T;
};

export default class MafiaContainer extends React.Component<PlayerRequest> {
  static getInitialProps = ({
    query,
  }: MafiaQueryType<PlayerRequest>): PlayerRequest => {
    return { code: query.code, name: query.name, session: query.session };
  };

  state = {
    role: '',
    description: '',
  } as PlayerView;

  async componentDidMount(): Promise<void> {
    const res = await fetch(`/api/mafia/${this.props.code}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        new PlayerRequest({
          code: this.props.code,
          name: this.props.name,
          session: this.props.session,
        }),
      ),
    });
    const state = await res.json();
    console.warn('mafia state', JSON.stringify(state));
    this.setState(state);
  }

  render = (): JSX.Element => (
    <MafiaPresentation {...this.state}></MafiaPresentation>
  );
}
