import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../settings/basicStyle";
import Box from "../../../components/utility/box";
import { getAgency } from "../../../actions/agencyActions";
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../crud.style";
import {
  getTestingProviderTeams,
  deleteProviderTeam
} from "../../../actions/testingProviderActions";
import { message } from "antd/lib/index";
import actions from '../../../redux/agency/actions';
import { connect } from 'react-redux';
const { _updateForm } = actions;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Agency Name",
          dataIndex: "name",
          key: "name",
          sorter: true
        },
        {
          title: "Agency Admin",
          dataIndex: "owner.username",
          key: "owner.username",
          sorter: true
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          sorter: true
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} onPress={this.openPage.bind(this)} delete={this.handleDelete} />
        }
      ],
      data: [],
      loading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  openPage = ( path, key, row ) => {
    const { history } = this.props;
    this.updateForm(key, row);
    history.push(path);
  }

  updateForm = (key, value) => {
    const { _updateForm } = this.props;

    _updateForm(
        Object.assign(this.props[actions.FORM_DATA_AGENCY_KEY], { [key]: value })
    );
  }

  componentDidMount() {
    this.setState({ loading: true });
    getAgency()
      .then(agencies => {
        this.setState({ loading: false, data: agencies.data });
      })
      .catch(agencies => {
        this.setState({ loading: false, data: [] });
      });
  }

  handleDelete(row) {
    message.success("Successfully Deleted.");
  }

  onChange(pagination, filters, sorter) {
    const { data } = this.state;

    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === "ascend") {
        this.setState({
          data: data.sort(function(a, b) {
            return a[sorter.columnKey] < b[sorter.columnKey];
          })
        });
      } else {
        this.setState({
          data: data.sort(function(a, b) {
            return a[sorter.columnKey] > b[sorter.columnKey];
          })
        });
      }
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { data, columns } = this.state;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle />
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("/dashboard/agency/create");
                    }}
                  >
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
                  dataSource={data}
                  rowKey="providerTeamId"
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push(`/dashboard/agency/teams`)
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

export default connect(
  ({ Agency}) => {
    const { form_data_agency_key } = Agency;

    return({form_data_agency_key});
  },
  { _updateForm }
)(List);
