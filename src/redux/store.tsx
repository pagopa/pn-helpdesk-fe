import { combineReducers, configureStore, EnhancedStore, PreloadedState } from '@reduxjs/toolkit';
import snackbarReducer from "./snackbarSlice";
import responseReducer from "./responseSlice";
import spinnerReducer from "./spinnerSlice";
import aggregateReducer from './aggregateSlice';

const rootReducer = combineReducers({
  response: responseReducer,
  snackbar: snackbarReducer,
  spinner: spinnerReducer,
  aggregate: aggregateReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) : EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = setupStore()


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch