const actions = {
    REQUEST_MY_AGENCIES: 'REQUEST_MY_AGENCIES',
    RECEIVE_MY_AGENCIES: 'RECEIVE_MY_AGENCIES',
    requestMyAgencies: () => ({
      type: actions.REQUEST_MY_AGENCIES
    }),
    receiveMyAgencies: payload => ({
      type: actions.RECEIVE_MY_AGENCIES,
      payload
    })
  };
  export default actions;
  