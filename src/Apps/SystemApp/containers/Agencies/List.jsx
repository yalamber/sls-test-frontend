import React, { Component } from "react";
import { Icon, message } from "antd";
import IntlMessages from "@components/utility/intlMessages";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import PageHeader from "@components/utility/pageHeader";
import TableListing from "@commons/table/tableListing";
import { deleteAgency } from "@helpers/http-api-client";
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from "./TestManager/partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle
} from "@utils/crud.style";
import * as agenciesListActions from "@redux/agencies/actions";
import { getDefaultPaginationOptions } from "@utils/default-objects";

class List extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
        title: <IntlMessages id="client.testManagerActions"/>,
        key: "testManagerActions",
        render: row => <TestManagerActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentAgency={props.setCurrentAgency} />
      },
      {
        title: <IntlMessages id="actions"/>,
        key: "actions",
        render: row => <ActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentAgency={props.setCurrentAgency} />
      }
    ];
    this.state = {
      paginationOptions: getDefaultPaginationOptions().paginationOptions
    };
    // this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.agenciesListDidMount();
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      },
      () => {
        const { paginationOptions } = this.state;
        this.props.actions.agenciesListFetch({ paginationOptions });
      }
    );
  }

  handleDelete(row) {
    deleteAgency(row.agencyId).then(res => {
      message.success("Successfully Deleted.");
      // this.fetchData();
    });
  }

  getPaginationOptions() {
    const { count } = this.props.Agencies;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const { history, Agencies: { loading, rows }  } = this.props;

    const params = {
      history,
      loading: loading,
      components: {
        TitleWrapperWithContents: () => (
          <TitleWrapper>
            <ComponentTitle>
              <IntlMessages id="agencies" />
            </ComponentTitle>
            <ButtonHolders>
              <ActionBtn
                type="primary"
                onClick={() => {
                  history.push("agency/create");
                }}
              >
                <Icon type="plus" />
                <IntlMessages id="agency.add" />
              </ActionBtn>
            </ButtonHolders>
          </TitleWrapper>
        )
      },
      tableOptions: {
        pagination: {
          ...this.getPaginationOptions(),
          onChange: this.onTablePaginationChange
        },
        rowKey: "agencyId",
        columns: this.columns,
        dataSource: rows,
        onRow: row => ({
          onDoubleClick: () => {
            history.push(`client/${row.agencyId}/details`);
          }
        })
      }
    };

    return <TableListing {...params} />;
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(agenciesListActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
