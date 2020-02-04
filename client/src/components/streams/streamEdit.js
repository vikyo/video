import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'

import { fetchStream, editStream } from '../../actions';
import StreamForm from '../streams/streamForm';

class StreamEdit extends Component {
    // L265:Component isolation: Every component needs to fetch its own data
    // the router does not provide the data
    // Component fetching its own data in case we go to the link directly
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onEdit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        const { stream } = this.props;
        if (!stream) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm initialValues={_.pick(this.props.stream,'title','description')} onSubmit={this.onEdit} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
