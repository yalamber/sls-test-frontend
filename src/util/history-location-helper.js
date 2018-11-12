import _ from 'lodash';

export const updateLastUserRowData = (history, newValueObj) => {
  if (
    history.location &&
    history.location.state/* &&
    history.location.state.from*/
  ) {
    const state = { ...history.location.state };
    // delete state.from;
    // console.log("new state to be", { ...history.location, ...state, state: { ...newValueObj } })
    history.replace({ ...history.location, ...state, state: { ...newValueObj } });
  }
};
