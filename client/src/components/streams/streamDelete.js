import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
    // Component fetching its own data in case we go to the link directly
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => (
        <React.Fragment>
            <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className='ui button negative'>
                Delete
            </button>
            <Link to='/' className='ui button'>
                Cancel
            </Link>
        </React.Fragment>
    );

    renderContent = () => {
        if (!this.props.stream) return <div>Do you want to delete the stream ?</div>;

        return <div>Do you want to delete the stream with title: {this.props.stream.title}</div>;
    };

    render() {
        // console.log(this.props.stream);
        return <Modal title='Delete Stream' content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push('/')} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
