export const getDefaultPageSize = () => 5;

export const getDefaultPaginationOptions = () =>
  Object.assign(
    {},
    {
      paginationOptions: {
        current: 1,
        pageSize: getDefaultPageSize(),
        total: 1
      }
    }
  );
