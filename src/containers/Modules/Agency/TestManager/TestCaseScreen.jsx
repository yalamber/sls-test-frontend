import React, { Component } from 'react';
import { Row, Col, Select, Spin, Checckbox, Radio, Divider } from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import TestCaseWrapper from './partials/TestCase.style';
import Description from './partials/Description';
import StatusAndUpdate from './partials/StatusAndUpdate';
import FieldSet from './partials/FieldSet';

import {
    TitleWrapper,
    ComponentTitle,
    TableClickable as Table
} from '../../crud.style';

const Option = Select.Option;
const RadioGroup = Radio.Group;


export default class extends Component {

    render() {
        const margin = {
            margin: '5px 5px 10px 0px'
        };
        const { rowStyle, colStyle, gutter } = basicStyle;
        //Top header
        const topHeader = { fontSize: 14, fontWeight: '300' };

        return (
            <TestCaseWrapper>
                <LayoutWrapper>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Box>
                                <TitleWrapper>
                                    <ComponentTitle style={topHeader}>Company: iXod.com L.L.C</ComponentTitle>
                                    <ComponentTitle style={topHeader}>Team: Protocols</ComponentTitle>
                                    <ComponentTitle style={topHeader}>Suit Name: Countdown</ComponentTitle>
                                </TitleWrapper>

                                <Description
                                    header={"Description"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <Description
                                    header={"Developer Comments"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <Description
                                    header={"Analysis Comments"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <FieldSet
                                    header={"Artifacts"}
                                    images={[
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png",
                                        "/images/icons/icon-96x96.png"
                                    ]}
                                    />

                                <Description
                                    header={"Step #1"}
                                    isInput={true}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <Description
                                    isInput={true}
                                    header={"Step #2"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <Description
                                    isInput={true}
                                    header={"Step #3"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <Description
                                    isInput={true}
                                    header={"Step #4"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <Description
                                    isInput={true}
                                    header={"Step #5"}
                                    data={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo."}
                                />

                                <StatusAndUpdate
                                    header={"Final Test Case Status and Update"}
                                />
                            </Box>
                        </Col>
                    </Row>
                </LayoutWrapper>
            </TestCaseWrapper>
        );
    }
}
