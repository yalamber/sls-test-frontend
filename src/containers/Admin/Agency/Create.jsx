import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import { withRouter } from 'react-router-dom'
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import {
    TitleWrapper,
    ComponentTitle,
} from '../crud.style';

import Box from '../../../components/utility/box';
import AgencyForm from "./partials/AgencyForm";
import { message } from "antd/lib/index";
import Errors from "../../Errors";

class Create extends Component {
    constructor() {
        super();
        this.state = {
            errors: {
                details: []
            },
            loading: false
        };
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        return (

            <LayoutWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <Row gutter={24}>
                                <Col span={24}>
                                    {this.state.errors.details.length ? <Errors errors={this.state.errors} /> : ''}
                                </Col>
                            </Row>
                            <Spin spinning={this.state.loading}>
                                <AgencyForm submit={() => { }} />
                            </Spin>
                        </Box>
                    </Col>
                </Row>
            </LayoutWrapper>
        );
    }
}

export default withRouter(Create);
