import { from } from "rxjs"
import { ajax } from "rxjs/ajax"
import { mergeMap, map, takeUntil } from "rxjs/operators"
import { ofType } from "redux-observable"

import AppActionNames from "../ActionNames/app-action-names"

const {
  REQUEST_STORY,
  REQUEST_STORY_SUCCESS,
  REQUEST_STORY_FAIL,
  REQUEST_STORY_DONE
} = AppActionNames

const requestStory = (action$, state$) =>
  action$.pipe(
    ofType(REQUEST_STORY),
    mergeMap((action, state) => {
      const observableObj = from(action.payload)
      return observableObj.pipe(
        mergeMap((url, index) => {
          try {
            return ajax.get(url).pipe(
              map(response => {
                const { currentStory, maximumStory } = state$.value.appReducer

                if (currentStory + 1 < maximumStory) {
                  return {
                    type: REQUEST_STORY_SUCCESS,
                    payload: response.response
                  }
                } else {
                  return {
                    type: REQUEST_STORY_DONE,
                    payload: response.response
                  }
                }
              })
            )
          } catch (err) {
            return {
              type: REQUEST_STORY_FAIL
            }
          }
        }),
        takeUntil(action$.pipe(ofType("REQUEST_STORY_DONE")))
      )
    })
  )
export default requestStory
