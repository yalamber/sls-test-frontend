import actions from './actions';

const initState = {
    [actions.FORM_DATA_AGENCY_KEY]: {
        [actions.FORM_DATA_SELECTED_AGENCY]: {},
        [actions.FORM_DATA_SELECTED_TEAM_OF_AGENCY]: {}
    }
};

export default function appReducer(state = initState, action) {
    switch (action.type) {
        case actions.UPDATE_FORM_DATA_AGENCY:
            return ({
                ...state,
                [actions.FORM_DATA_AGENCY_KEY]: Object.assign({}, action.payload)
            });
        default:
            return state;
    }
}
