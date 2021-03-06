import { NAVIGATION_VIEW, CONTENT_VIEW, LANDING_PAGE } from './body-constants';
import * as ACTIONTYPES from './body-actions-type';
import { HYDRATE_STORE } from '../path-navigation/nv-actions-type';

const initialState = {
  view: LANDING_PAGE,
  listCount: 0,
};

const contentBodyReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONTYPES.SHOW_LANDING_PAGE:
    return {
      ...state,
      view: LANDING_PAGE,
      nav: { data: [], title: undefined, loading: false }
    };
  case ACTIONTYPES.SHOW_NAVIGATION_VIEW:
    return {
      ...state,
      view: NAVIGATION_VIEW
    };
  case ACTIONTYPES.SHOW_CONTENT_VIEW:
    return {
      ...state,
      view: CONTENT_VIEW
    };
  case ACTIONTYPES.SET_LIST_COUNT:
    return {
      ...state,
      listCount: action.payload.count
    };
  case HYDRATE_STORE:
    return {
      listCount: action.payload.data.bsl ? 2 : 1,
      view: action.payload.navView ? NAVIGATION_VIEW : CONTENT_VIEW
    };
  default:
    return state;
  }
};

export default contentBodyReducer;