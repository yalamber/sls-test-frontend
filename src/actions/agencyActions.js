import { post, get, put, deleteRecord } from "../helpers/http";

export const createAgency = (company) => {
    return post('client', company)
};

export const getAgencyTeams = (query) => {
  return get(`agency-team`, query);
};

export const getUsers = (agencyId, teamId) => {
  return getAgencyTeamMembers(teamId)
};

export const getAgencyTeamMembers = (teamId) => {
  if (teamId) {
    return get(`agency-team/${teamId}/member`);
  } else {
    // return get('user?clientId=' + companyId);
  }
};

export const getAgency = (objOrAgencyId) => {
  const option = objOrAgencyId;
  if (typeof option === 'object') {
    const { tablePaginationOptions } = option;
    return get(`agency`, {
      limit: tablePaginationOptions.pageSize,
      offset: tablePaginationOptions.pageSize * (tablePaginationOptions.current-1)
    })
  } else if (option) {
    return get(`agency/${option}`)
  }

  return get(`agency`)
};
