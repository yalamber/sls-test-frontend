export const getDefaultPageSize = () => 5;

export const getDefaultPaginationOptions = () =>
  Object.assign(
    {},
    {
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: getDefaultPageSize(),
        total: 1
      }
    }
  );
