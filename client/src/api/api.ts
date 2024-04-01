import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskList } from "../data/TaskList";
import { Task } from "../data/Task";
import { TaskActivity } from "../data/TaskActivity";

type moveTaskToListArgs = {
  taskId: number;
  newListId: number;
  oldListId: number;
};

export const taskApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Tasks", "Tasks/List", "Tasks/Activity", "TaskLists"],
  endpoints: (builder) => ({
    getTaskLists: builder.query<TaskList[], null>({
      query: () => "/task-lists/",
      providesTags: ["TaskLists"],
    }),
    getTaskListById: builder.query<TaskList, number>({
      query: (id) => `/task-lists/${id}`,
    }),
    createTaskList: builder.mutation<TaskList, { name: string }>({
      query: ({ name }) => ({
        url: "/task-lists/",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["TaskLists"],
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
      invalidatesTags: ["TaskLists"],
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
  useGetTaskListsQuery,
  useGetTaskListByIdQuery,
  useCreateTaskListMutation,
  useUpdateTaskListMutation,
  useDeleteTaskListMutation,
  useGetTasksQuery,
  useGetTasksByListIdQuery,
  useGetTaskByIdQuery,
  useGetActivityQuery,
  useGetActivityByTaskIdQuery,
  useMoveTaskToListMutation,
  useAddNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
