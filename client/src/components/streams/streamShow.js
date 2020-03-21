import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef(); // To get the reference to actual video element in DOM
    }

    // Component fetching its own data in case we go to the link directly
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    // Comment added for testing in test1 branch
    componentWillUnmount() {
        this.player.destroy();
    }
    // Comment added for testing in test2 branch
    buildPlayer = () => {
        if (this.player || !this.props.stream) return;

        const { id } = this.props.match.params;
        // Video Player
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    };

    render() {
        if (!this.props.stream) return <div>Loading...</div>;

        const { title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
