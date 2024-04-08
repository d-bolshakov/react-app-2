import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../../api/api";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

const mockStore: EnhancedStore = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

const mockData = {
  [taskApi.endpoints.getTaskById.name]: {
    id: 1,
    name: "Task 1",
    description: "Task 1 description",
    dueDate: "2024-04-08T11:06:22.449Z",
    listId: 1,
    priority: 3,
  },
  [taskApi.endpoints.getTaskLists.name]: [
    {
      id: 1,
      name: "Task list 1",
      boardId: 1,
    },
    {
      id: 2,
      name: "Task list 2",
      boardId: 1,
    },
  ],
};

mockStore.dispatch({
  type: "taskApi/executeQuery/pending",
  meta: {
    startedTimeStamp: new Date().getTime(),
    requestId: "r1",
    arg: {
      subscribe: true,
      endpointName: taskApi.endpoints.getTaskById.name,
      queryCacheKey: `${taskApi.endpoints.getTaskById.name}(1)`,
    },
  },
});

mockStore.dispatch({
  type: "taskApi/executeQuery/fulfilled",
  payload: mockData[taskApi.endpoints.getTaskById.name],
  meta: {
    fulfilledTimeStamp: new Date().getTime(),
    arg: {
      endpointName: taskApi.endpoints.getTaskById.name,
      queryCacheKey: `${taskApi.endpoints.getTaskById.name}(1)`,
    },
    requestId: "r1",
  },
});

mockStore.dispatch({
  type: "taskApi/executeQuery/pending",
  meta: {
    startedTimeStamp: new Date().getTime(),
    requestId: "r2",
    arg: {
      subscribe: true,
      endpointName: taskApi.endpoints.getTaskLists.name,
      queryCacheKey: `${taskApi.endpoints.getTaskLists.name}(null)`,
    },
  },
});

mockStore.dispatch({
  type: "taskApi/executeQuery/fulfilled",
  payload: mockData[taskApi.endpoints.getTaskLists.name],
  meta: {
    fulfilledTimeStamp: new Date().getTime(),
    arg: {
      endpointName: taskApi.endpoints.getTaskLists.name,
      queryCacheKey: `${taskApi.endpoints.getTaskLists.name}(null)`,
    },
    requestId: "r2",
  },
});

export const Mockstore = ({ children }: PropsWithChildren) => (
  <Provider store={mockStore}>{children}</Provider>
);
