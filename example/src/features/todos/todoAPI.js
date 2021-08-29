// A mock function to mimic making an async request for data
export function fetchTodoList(params) {
  return new Promise((resolve) =>
    setTimeout(() => {
      const data = [
        { id: 1, message: "Hello" },
        { id: 2, message: "World" },
        { id: 3, message: "World" },
        { id: 4, message: "World" },
        { id: 5, message: "World" },
        { id: 6, message: "World" },
        { id: 7, message: "World" },
        { id: 8, message: "World" },
        { id: 9, message: "World" },
        { id: 10, message: "World" },
        // { id: 11, message: "World" },
        // { id: 12, message: "World" },
      ];

      const pagination = {
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(data.length / params.limit),
      };

      return resolve({
        pagination: pagination,
        data:
          params.sort.order === "asc"
            ? data
                .sort((i) => i[params.sort.field])
                .slice(
                  (params.page - 1) * params.limit,
                  params.page * params.limit
                )
            : data
                .reverse((i) => i[params.sort.field])
                .slice(
                  (params.page - 1) * params.limit,
                  params.page * params.limit
                ),
      });
    }, 500)
  );
}
