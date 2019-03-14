import { ajax } from "rxjs/ajax"
import { mergeMap, map } from "rxjs/operators"
import { ofType } from "redux-observable"

import AppActionNames from "../ActionNames/app-action-names"

const {
  REQUEST_TOP_STORY_URL,
  REQUEST_TOP_STORY_URL_SUCCESS,
  REQUEST_TOP_STORY_URL_FAIL
} = AppActionNames

const topStories = `https://hacker-news.firebaseio.com/v0/beststories.json`
const story = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`

const requestTopStoryURL = action$ =>
  action$.pipe(
    ofType(REQUEST_TOP_STORY_URL),
    mergeMap(() => {
      try {
        return ajax.get(topStories).pipe(
          map(response => {
            const idFiltered = response.response.slice(0, 10)
            const urls = idFiltered.map(story)
            return {
              type: REQUEST_TOP_STORY_URL_SUCCESS,
              payload: urls
            }
          })
        )
      } catch (e) {
        return {
          type: REQUEST_TOP_STORY_URL_FAIL
        }
      }
    })
  )
export default requestTopStoryURL
