const actions = {
  UPDATE_FORM_DATA_AGENCY: 'update_form_data_agency',
  FORM_DATA_AGENCY_KEY: 'form_data_agency_key',
  FORM_DATA_SELECTED_AGENCY: 'form_data_selected_agency',
  FORM_DATA_SELECTED_TEAM_OF_AGENCY: 'form_data_selected_team_of_agency',
  _updateForm: (value) => ({
    type: actions.UPDATE_FORM_DATA_AGENCY,
    payload: Object.assign({}, value)
  })
};
export default actions;
