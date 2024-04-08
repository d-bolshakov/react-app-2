import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskList } from "../data/TaskList";
import { Task } from "../data/Task";
import { TaskActivity } from "../data/TaskActivity";
import { Board } from "../data/Board";

type moveTaskToListArgs = {
  taskId: number;
  newListId: number;
  oldListId: number;
};

export const taskApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: [
    "Boards",
    "Boards/Activity",
    "Tasks",
    "Tasks/List",
    "Tasks/Activity",
    "TaskLists",
    "TaskLists/Board",
  ],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], null>({
      query: () => "/boards/",
      providesTags: (result) =>
        result
          ? result.map((board) => ({
              type: "Boards" as const,
              id: board.id,
            }))
          : [],
    }),
    getBoardById: builder.query<Board, number>({
      query: (id) => `/boards/${id}`,
      providesTags: (result) =>
        result ? [{ type: "Boards", id: result.id }] : [],
    }),
    createBoard: builder.mutation<Board, Omit<Board, "id">>({
      query: (data) => ({
        url: "/boards/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Boards"],
    }),
    updateBoard: builder.mutation<
      Board,
      { id: number; data: Partial<Omit<Board, "id">> }
    >({
      query: ({ id, data }) => ({
        url: `/boards/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Boards", id: result.id }] : [],
    }),
    deleteBoard: builder.mutation<{ message: string }, number>({
      query: (id) => ({ url: `/boards/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: "Boards", id: args }] : [],
    }),
    getTaskListsByBoardId: builder.query<TaskList[], number>({
      query: (boardId: number) => ({
        url: "/task-lists/",
        params: { boardId },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((list) => ({
                type: "TaskLists" as const,
                id: list.id,
              })),
              { type: "TaskLists/Board", id: arg },
            ]
          : [],
    }),
    getTaskLists: builder.query<TaskList[], null>({
      query: () => "/task-lists/",
      providesTags: ["TaskLists"],
    }),
    getTaskListById: builder.query<TaskList, number>({
      query: (id) => `/task-lists/${id}`,
    }),
    createTaskList: builder.mutation<TaskList, Omit<TaskList, "id">>({
      query: (body) => ({
        url: "/task-lists/",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "TaskLists/Board", id: result.boardId }] : [],
    }),
    updateTaskList: builder.mutation<
      TaskList,
      { id: number; data: Partial<Omit<TaskList, "id">> }
    >({
      query: ({ id, data }) => ({
        url: `/task-lists/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "TaskLists/Board", id: result.boardId }] : [],
    }),
    deleteTaskList: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/task-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskLists"],
    }),
    getTasks: builder.query<Task[], null>({
      query: () => "/tasks/",
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({
                type: "Tasks" as const,
                id: task.id,
              })),
            ]
          : [],
    }),
    getTasksByListId: builder.query<
      Task[],
      { listId: number; params?: { sortBy?: string; order?: "ASC" | "DESC" } }
    >({
      query: ({ listId, params }) => ({
        url: `/tasks/?listId=${listId}`,
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((task) => ({
                type: "Tasks" as const,
                id: task.id,
              })),
              { type: "Tasks/List", id: arg.listId },
            ]
          : [{ type: "Tasks/List", id: arg.listId }],
    }),
    getTaskById: builder.query<Task[], number>({
      query: (id) => `/tasks/${id}`,
    }),
    getActivity: builder.query<TaskActivity[], null>({
      query: () => "/tasks/activity",
      providesTags: (result) =>
        result
          ? [
              ...result.map((activity) => ({
                type: "Tasks/Activity" as const,
                id: activity.taskId,
              })),
              { type: "Tasks/Activity", id: "LIST" },
            ]
          : [],
    }),
    getActivityByBoardId: builder.query<TaskActivity[], number>({
      query: (id) => ({ url: "/tasks/activity", params: { boardId: id } }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((activity) => ({
                type: "Tasks/Activity" as const,
                id: activity.taskId,
              })),
              { type: "Tasks/Activity", id: "LIST" },
              { type: "Boards/Activity", id: arg },
            ]
          : [],
    }),
    getActivityByTaskId: builder.query<TaskActivity[], number>({
      query: (id) => `/tasks/${id}/activity`,
      providesTags: (result) =>
        result
          ? result.map((activity) => ({
              type: "Tasks/Activity",
              id: activity.taskId,
            }))
          : [],
    }),
    moveTaskToList: builder.mutation<Task, moveTaskToListArgs>({
      query: ({ taskId, newListId }) => ({
        url: `/tasks/${taskId}`,
        method: "PATCH",
        body: { listId: newListId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Tasks", id: arg.taskId },
        { type: "Tasks/List", id: arg.oldListId },
        { type: "Tasks/List", id: arg.newListId },
        { type: "Tasks/Activity", id: "LIST" },
        { type: "Tasks/Activity", id: arg.taskId },
      ],
    }),
    addNewTask: builder.mutation<Task, Omit<Task, "id">>({
      query: (task) => ({
        url: "/tasks/",
        method: "POST",
        body: task,
      }),
      invalidatesTags: (result) => [
        { type: "Tasks/List", id: result?.listId },
        { type: "Tasks/Activity", id: "LIST" },
      ],
    }),
    updateTask: builder.mutation<
      Task,
      {
        id: number;
        data: Partial<Omit<Task, "id">>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Tasks", id: arg.id },
        { type: "Tasks/List", id: result?.listId },
        { type: "Tasks/Activity", id: "LIST" },
        { type: "Tasks/Activity", id: arg.id },
      ],
    }),
    deleteTask: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Tasks", id: arg },
        { type: "Tasks/Activity", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetTaskListsByBoardIdQuery,
  useGetTaskListsQuery,
  useGetTaskListByIdQuery,
  useCreateTaskListMutation,
  useUpdateTaskListMutation,
  useDeleteTaskListMutation,
  useGetTasksQuery,
  useGetTasksByListIdQuery,
  useGetTaskByIdQuery,
  useGetActivityQuery,
  useGetActivityByBoardIdQuery,
  useGetActivityByTaskIdQuery,
  useMoveTaskToListMutation,
  useAddNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
