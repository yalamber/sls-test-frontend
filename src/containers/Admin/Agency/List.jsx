import React, { Component } from 'react';
import { Row, Col, Icon, Rate, Spin } from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import Box from '../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";

import {
    ActionBtn,
    TitleWrapper,
    ButtonHolders,
    ComponentTitle,
    TableClickable as Table
} from '../crud.style';
import { getTestingProviderTeams, deleteProviderTeam } from "../../../actions/testingProviderActions";
import { message } from "antd/lib/index";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Agency Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true
                },
                {
                    title: 'Agency Owner',
                    dataIndex: 'agencyOwner',
                    key: 'agencyOwner',
                    sorter: true
                },
                {
                    title: 'Rating',
                    dataIndex: 'rating',
                    key: 'rating',
                    render: (value) => <Rate defaultValue={value} disabled />
                },
                {
                    title: '',
                    key: 'actions',
                    render: (row) => <ActionButtons row={row} delete={this.handleDelete} />
                }
            ],
            dummyData: [
                {
                    name: "agency 1",
                    agencyId: 1,
                    agencyOwner: "ABC 1",
                    rating: 5
                },
                {
                    name: "agency 2",
                    agencyId: 2,
                    agencyOwner: "zyx 2",
                    rating: 2
                },
                {
                    name: "agency 3",
                    agencyId: 3,
                    agencyOwner: "xyz 3",
                    rating: 4
                }
            ],
            loading: false
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(row) {
        message.success('Successfully Deleted.');
    }

    onChange(pagination, filters, sorter) {
        const { dummyData } = this.state;
        console.log(sorter);

        if (sorter && sorter.columnKey && sorter.order) {
            if (sorter.order === 'ascend') {
                this.setState({ dummyData: dummyData.sort(function (a, b) { return (a[sorter.columnKey] < b[sorter.columnKey]) }) });
            } else {
                this.setState({ dummyData: dummyData.sort(function (a, b) { return (a[sorter.columnKey] > b[sorter.columnKey]) }) });
            }
        }
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        const { dummyData, columns } = this.state;

        return (
            <LayoutWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <TitleWrapper>
                                <ComponentTitle></ComponentTitle>
                                <ButtonHolders>
                                    <ActionBtn type="primary" onClick={() => {
                                        this.props.history.push('/dashboard/agency/create')
                                    }}>
                                        + Create Agency
                                    </ActionBtn>
                                </ButtonHolders>
                            </TitleWrapper>
                            <Spin spinning={this.state.loading}>
                                <Table
                                    size="middle"
                                    bordered
                                    pagination={true}
                                    columns={columns}
                                    onChange={this.onChange.bind(this)}
                                    dataSource={dummyData}
                                    rowKey="providerTeamId"
                                    onRow={(row) => ({
                                        onDoubleClick: () => {
                                            alert("clicked")
                                        },
                                    })}
                                />
                            </Spin>
                        </Box>
                    </Col>
                </Row>
            </LayoutWrapper>
        );
    }
}
