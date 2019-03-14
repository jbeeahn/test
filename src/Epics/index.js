import { combineEpics } from "redux-observable"

import requestTopStoryURL from "./requestTopStoryURL"
import requestStory from "./requestStory"
import requestComments from "./requestComments"

export default combineEpics(requestTopStoryURL, requestStory, requestComments)
