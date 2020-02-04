import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamShow extends Component {
    // Component fetching its own data in case we go to the link directly
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        if (!this.props.stream) return <div>Loading...</div>;
        
        const {title, description} = this.props.stream;
        return (
            <div>
                {title}
                {description}
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
