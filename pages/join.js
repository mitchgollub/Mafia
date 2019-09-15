import { withRouter } from 'next/router'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', code: '' };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value, code: this.state.code });
    }

    handleCodeChange(event) {
        this.setState({ name: this.state.name, code: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.router.push(`/mafia?id=${this.state.code}&name=${this.state.name}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter Name
                <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <br />
                <label>
                    Enter Game Code
                <input type="text" value={this.state.code} onChange={this.handleCodeChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default withRouter(Join);