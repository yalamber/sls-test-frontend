import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Input } from 'antd';
import { withRouter } from 'react-router-dom'

export default class Description extends Component {

    static propTypes = {
        header: PropTypes.string,
        images: PropTypes.string
    }

    render() {
        const { header, images } = this.props;
        return (
            <fieldset>
                <legend>{header}</legend>
                <div style={{ overflow: 'scroll', overflowY: 'scroll', maxHeight: 150 }}>
                    {
                        images && images.length ?
                            images.map(ele => <img src={ele} alt="" height="96" style={{ margin: 10 }} />)
                            : null
                    }
                </div>
            </fieldset>
        )
    }
}
