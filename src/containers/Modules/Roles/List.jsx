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
import {
    deleteRole,
    getRoles
} from "../../../helpers/http-api-client";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
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
            data: [],
            paginationOptions: {
                defaultCurrent: 1,
                current: 1,
                pageSize: 5,
                total: 1
            },
            loading: false
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({ loading: true });
        getRoles({
            paginationOptions: this.state.paginationOptions
        })
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data.rows,
                    paginationOptions: {
                        ...this.state.paginationOptions,
                        total: res.data.count
                    }
                });
            })
            .catch(err => {
                message.error("Problem occured.");
                this.setState({ loading: false });
            });
    }

    onTablePaginationChange(page, pageSize) {
        this.setState(
            {
                loading: true,
                paginationOptions: {
                    ...this.state.paginationOptions,
                    current: page,
                    pageSize
                }
            },
            () => {
                getRoles({
                    paginationOptions: this.state.paginationOptions
                })
                    .then(roles => {
                        this.setState({
                            loading: false,
                            data: roles.data.rows,
                            paginationOptions: {
                                ...this.state.paginationOptions,
                                total: roles.data.count
                            }
                        });
                    })
                    .catch(e => {
                        this.setState({ loading: false, data: [] });
                    });
            }
        );
    }

    handleDelete(row) {
        deleteRole(row.roleId).then(res => {
            message.success("Successfully Deleted.");
            this.fetchData();
        });
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        return (
            <LayoutWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <TitleWrapper>
                                <ComponentTitle>Roles</ComponentTitle>
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
                                pagination={{
                                    ...this.state.paginationOptions,
                                    onChange: this.onTablePaginationChange
                                }}
                                rowKey="roleId"
                                columns={this.state.columns}
                                dataSource={this.state.data}
                                onRow={row => ({
                                    onDoubleClick: () => {
                                        // this.props.history.push('details/' + row.clientId)
                                        this.props.history.push(`details/${row.roleId}`);
                                    }
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
