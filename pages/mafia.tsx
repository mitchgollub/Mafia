import React from 'react';
import ky from 'ky/umd';
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
    this.setState(
      await ky
        .post(`/api/mafia/${this.props.code}`, {
          json: new PlayerRequest({
            code: this.props.code,
            name: this.props.name,
            session: this.props.session,
          }),
        })
        .json(),
    );
  }

  render = (): JSX.Element => (
    <MafiaPresentation {...this.state}></MafiaPresentation>
  );
}
