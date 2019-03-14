import AppActionNames from "../ActionNames/app-action-names"

const {
  REQUEST_TOP_STORY_URL,
  REQUEST_STORY,
  REQUEST_COMMENT,
  SWITCH_STORY_DETAIL,
  SWITCH_STORY_LIST
} = AppActionNames

const AppActions = {
  requestTopStoryURL() {
    return {
      type: REQUEST_TOP_STORY_URL
    }
  },
  requestStory(id) {
    return {
      type: REQUEST_STORY,
      payload: id
    }
  },
  switchStoryDetail(story) {
    return {
      type: SWITCH_STORY_DETAIL,
      payload: story
    }
  },
  switchStoryList() {
    return {
      type: SWITCH_STORY_LIST
    }
  },
  requestComments(ids) {
    return {
      type: REQUEST_COMMENT,
      payload: ids
    }
  }
}

export default AppActions
