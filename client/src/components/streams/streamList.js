import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    // To render the edit/delete button
    renderAdmin = stream => {
        if (stream.userId === this.props.currentUserId) {
            // console.log(stream.id)
            return (
                <div className='right floated content'>
                    <Link to={`streams/edit/${stream.id}`} className='ui primary button'>
                        Edit
                    </Link>
                    <Link to={`streams/delete/${stream.id}`} className='negative ui button'>
                        Delete
                    </Link>
                </div>
            );
        }
    };

    // To show the 'create new stream' link if user is signd in
    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <Link to='/streams/new' className='ui primary button right floated content'>
                    Create New Stream
                </Link>
            );
        }
    };

    // To render the list of the available streams
    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className='item' key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className='large middle aligned icon camera'></i>
                    <div className='content'>
                        <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                        <div className='description'>{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    render() {
        // console.log(this.props);
        return (
            <div>
                <div>Streams</div>
                <div className='ui celled list'>{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
