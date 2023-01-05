import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_HEALTH_POST_BEGIN,
  CREATE_HEALTH_POST_SUCCESS,
  CREATE_HEALTH_POST_ERROR,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_BEGIN,
  GET_POST_BEGIN,
  GET_POST_SUCCESS,
  GET_HEALTH_POST_BEGIN,
  GET_HEALTH_POST_SUCCESS,
  DELETE_POST_BEGIN,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  SET_EDIT_HEALTH_POST,
  DELETE_HEALTH_POST_BEGIN,
  EDIT_HEALTH_POST_BEGIN,
  EDIT_HEALTH_POST_SUCCESS,
  EDIT_HEALTH_POST_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CREATE_REQUEST_BEGIN,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
  GET_REQUEST_BEGIN,
  GET_REQUEST_SUCCESS,
  DELETE_REQUEST_BEGIN,
  GET_EVENTS_BEGIN,
  GET_EVENTS_SUCCESS,
  DELETE_EVENT_BEGIN,
  EDIT_EVENT_BEGIN,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_ERROR,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION_BEGIN,
  CREATE_POSITION_ERROR,
  GET_PHOTOS_BEGIN,
  GET_PHOTOS_SUCCESS,
  CREATE_PDF_BEGIN,
  CREATE_PDF_SUCCESS,
  CREATE_PDF_ERROR,
  UPLOAD_IMAGE_BEGIN,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CREATE_PASTOR_BEGIN,
  CREATE_PASTOR_SUCCESS,
  CREATE_PASTOR_ERROR,
  CREATE_WORKER_BEGIN,
  CREATE_WORKER_SUCCESS,
  CREATE_WORKER_ERROR,
  GET_WORKER_BEGIN,
  GET_WORKER_SUCCESS,
  GET_PASTOR_BEGIN,
  GET_PASTOR_SUCCESS,
  GET_POSITION_BEGIN,
  GET_POSITION_SUCCESS,
  CREATE_ELDER_BEGIN,
  CREATE_ELDER_SUCCESS,
  CREATE_ELDER_ERROR,
  GET_ELDER_BEGIN,
  GET_ELDER_SUCCESS,
  CREATE_REVIEW_BEGIN,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  GET_REVIEW_BEGIN,
  GET_REVIEW_SUCCESS,
  CREATE_RESOURCE_BEGIN,
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_ERROR,
  GET_RESOURCE_BEGIN,
  GET_RESOURCE_SUCCESS,
  GET_CURRENT_USER_BEGINS,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userPosition: action.payload.position,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userPosition: action.payload.position,
      showAlert: true,
      alertType: "success",
      alertText: "Login successful! Redirecting...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlertL: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userPosition: action.payload.position,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      name: "",
      phone: "",
      email: "",
      message: "",
      purpose: "prayer",
      department: "all",
    };
    return { ...state, ...initialState };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      userLoading: false,
    };
  }
  /**********************************************POSTS********************************************************** */
  if (action.type === CREATE_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Post Created",
    };
  }
  if (action.type === CREATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
      totalPost: action.payload.totalPost,
      numOfpages: action.payload.numOfpages,
    };
  }

  if (action.type === DELETE_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Post Updated",
    };
  }
  if (action.type === EDIT_POST_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === CREATE_HEALTH_POST_BEGIN) {
    return {
      ...state,
      isEditing: true,
    };
  }
  if (action.type === CREATE_HEALTH_POST_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "New Health Tip Created",
    };
  }
  if (action.type === CREATE_HEALTH_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_HEALTH_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_HEALTH_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      healthPosts: action.payload.healthPosts,
      totalHealthPost: action.payload.totalHealthPost,
      numOfHealthPages: action.payload.numOfHealthPages,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      sort: "latest",
      searchPurpose: "all",
      searchDepartment: "all",
    };
  }
  if (action.type === SET_EDIT_HEALTH_POST) {
    const healthtip = state.healthPosts.find(
      (tip) => tip._id === action.payload.id
    );
    const { _id, healthTitle, healthDesc } = healthtip;
    return {
      ...state,
      isEditing: true,
      editHealthId: _id,
      healthTitle,
      healthDesc,
    };
  }
  if (action.type === DELETE_HEALTH_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_HEALTH_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_HEALTH_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Health Tip Updated",
    };
  }
  if (action.type === EDIT_HEALTH_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CREATE_EVENT_BEGIN) {
    return {
      ...state,
      isEditing: true,
    };
  }
  if (action.type === CREATE_EVENT_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "New Event Created",
    };
  }
  if (action.type === CREATE_EVENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CREATE_REQUEST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_REQUEST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Form submitted",
    };
  }
  if (action.type === CREATE_REQUEST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_REQUEST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_REQUEST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      requests: action.payload.requests,
      totalRequests: action.payload.totalRequests,
      numOfRequestPages: action.payload.numOfRequestPages,
    };
  }
  if (action.type === DELETE_REQUEST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_EVENTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_EVENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      events: action.payload.events,
      totalEvents: action.payload.totalEvents,
      numOfEventsPages: action.payload.numOfEventsPages,
    };
  }

  if (action.type === DELETE_EVENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_EVENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_EVENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "event Updated",
    };
  }
  if (action.type === EDIT_EVENT_ERROR) {
    return {
      ...state,
      showAlert: true,
      isLoading: false,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CREATE_POSITION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_POSITION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "position created",
    };
  }
  if (action.type === CREATE_POSITION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_POSITION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_POSITION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      leaders: action.payload.leaders,
      totalLeaders: action.payload.totalLeaders,
      numOfLeaderPages: action.payload.numOfLeaderPages,
    };
  }
  /*************************************************************PHOTOS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  if (action.type === UPLOAD_IMAGE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPLOAD_IMAGE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Image Added",
    };
  }
  if (action.type === UPLOAD_IMAGE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_PHOTOS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_PHOTOS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      images: action.payload.images,
    };
  }
  /**********************************************PDF*********************************************************/
  if (action.type === CREATE_PDF_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_PDF_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New bulleting Created",
    };
  }
  if (action.type === CREATE_PDF_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  /************************************************PASTOR START************************************************************  */
  if (action.type === CREATE_PASTOR_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_PASTOR_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pastor created",
    };
  }
  if (action.type === CREATE_PASTOR_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_PASTOR_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_PASTOR_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      pastors: action.payload.pastors,
    };
  }
  /************************************************PASTOR END************************************************************  */
  /************************************************REVIEW START************************************************************  */
  if (action.type === CREATE_REVIEW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_REVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Review created",
    };
  }
  if (action.type === CREATE_REVIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_REVIEW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_REVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reviews: action.payload.reviews,
    };
  }
  /************************************************PASTOR END************************************************************  */
  /************************************************WORKER START************************************************************  */
  if (action.type === CREATE_WORKER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_WORKER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Worker created",
    };
  }
  if (action.type === CREATE_WORKER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_WORKER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_WORKER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      workers: action.payload.workers,
    };
  }
  /************************************************RESOURCE START************************************************************  */
  if (action.type === CREATE_RESOURCE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_RESOURCE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Resource created",
    };
  }
  if (action.type === CREATE_RESOURCE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_RESOURCE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_RESOURCE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      resources: action.payload.resources,
    };
  }
  /************************************************ELDER START************************************************************  */
  if (action.type === CREATE_ELDER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_ELDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Elder created",
    };
  }
  if (action.type === CREATE_ELDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_ELDER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_ELDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      elders: action.payload.elders,
    };
  }
  if (action.type === GET_CURRENT_USER_BEGINS) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userPosition: action.payload.position,
    };
  } else {
    /************************************************WORKER END************************************************************  */
    return { ...state };
  }
};

export default reducer;
