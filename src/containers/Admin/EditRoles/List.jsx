import React, { Component } from 'react';
import { Row, Col, Icon, message, Spin } from 'antd';
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
import { deleteCompany, getCompanies } from "../../../actions/companyActions";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Role',
                    dataIndex: 'role',
                    key: 'role',
                    sorter: true
                },
                {
                    title: 'Key',
                    dataIndex: 'key',
                    key: 'key',
                    sorter: true
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    sorter: true
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: true
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (row) => <ActionButtons row={row} delete={this.handleDelete} />
                }
            ],
            dataSource: [
                {
                    role: "System Administrator",
                    key: "S-ADMIN",
                    description: "Super User Rights for the entire system",
                    type: "System",
                },
                {
                    role: "Company Owner",
                    key: "C-OWNER",
                    description: "All rights for a company",
                    type: "Company",
                },
                {
                    role: "Agency Owner",
                    key: "A-ADMIN",
                    description: "All rights for an company",
                    type: "Agency",
                }
            ],
            loading: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
    }

    onChange(pagination, filters, sorter) {
        const { dataSource } = this.state;
        console.log(sorter);

        if (sorter && sorter.columnKey && sorter.order) {
            if (sorter.order === "ascend") {
                this.setState({
                    dadataSourceta: dataSource.sort(function(a, b) {
                        return a[sorter.columnKey] < b[sorter.columnKey];
                    })
                });
            } else {
                this.setState({
                    ddataSourceata: dataSource.sort(function(a, b) {
                        return a[sorter.columnKey] > b[sorter.columnKey];
                    })
                });
            }
        }
    }

    handleDelete() {
        alert('Delete')
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        return (

            <LayoutWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <TitleWrapper>
                                <ComponentTitle></ComponentTitle>

                                <ButtonHolders>
                                    <ActionBtn type="primary" onClick={() => {
                                        console.log(this.props.history.push('create'))
                                    }}>
                                        <Icon type="plus" />
                                        Add Role
                  </ActionBtn>
                                </ButtonHolders>
                            </TitleWrapper>
                            <Spin spinning={this.state.loading}>
                                <Table
                                    size="middle"
                                    bordered
                                    pagination={true}
                                    rowKey="roleId"
                                    columns={this.state.columns}
                                    onChange={this.onChange.bind(this)}
                                    dataSource={this.state.dataSource}
                                    onRow={(row) => ({
                                        onDoubleClick: () => {
                                            // this.props.history.push('details/' + row.clientId)
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
