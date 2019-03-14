import AppActionNames from "../ActionNames/app-action-names"

const {
  REQUEST_TOP_STORY_URL_SUCCESS,
  REQUEST_TOP_STORY_URL_FAIL,
  REQUEST_STORY_SUCCESS,
  REQUEST_STORY_DONE,
  REQUEST_COMMENT_SUCCESS,
  REQUEST_COMMENT_DONE,
  SWITCH_STORY_DETAIL,
  SWITCH_STORY_LIST
} = AppActionNames

const initialState = {
  fetchURL: false,
  fetchStory: false,
  fetchComment: false,
  topStoryURL: null,
  maximumStory: 10,
  currentStory: 0,
  maximumComment: 20,
  currentComment: 0,
  story: [],
  comments: [],
  showList: true,
  showDetail: false,
  selectedStory: null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TOP_STORY_URL_SUCCESS:
      return {
        ...state,
        fetchURL: true,
        topStoryURL: action.payload
      }

    case REQUEST_TOP_STORY_URL_FAIL:
      return

    case REQUEST_STORY_SUCCESS:
      return {
        ...state,
        currentStory: state.currentStory + 1,
        story: state.story.concat(action.payload)
      }

    case REQUEST_STORY_DONE:
      return {
        ...state,
        currentStory: state.currentStory + 1,
        fetchStory: true,
        story: state.story.concat(action.payload)
      }

    case REQUEST_COMMENT_SUCCESS:
      return {
        ...state,
        currentComment: state.currentComment + 1,
        comments: state.comments.concat(action.payload)
      }

    case REQUEST_COMMENT_DONE:
      return {
        ...state,
        currentComment: state.currentComment + 1,
        fetchComment: true,
        comments: state.comments.concat(action.payload)
      }

    case SWITCH_STORY_DETAIL:
      return {
        ...state,
        showList: false,
        showDetail: true,
        selectedStory: action.payload
      }

    case SWITCH_STORY_LIST:
      return {
        ...state,
        showList: true,
        showDetail: false,
        selectedStory: null,
        fetchComment: false,
        comments: [],
        currentComment: 0
      }

    default:
      return state
  }
}
