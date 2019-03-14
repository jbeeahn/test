import { from } from "rxjs"
import { ajax } from "rxjs/ajax"
import { mergeMap, map, takeUntil } from "rxjs/operators"
import { ofType } from "redux-observable"

import AppActionNames from "../ActionNames/app-action-names"

const {
  REQUEST_COMMENT,
  REQUEST_COMMENT_SUCCESS,
  REQUEST_COMMENT_DONE
} = AppActionNames

const commentURL = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`

const requestComments = (action$, state$) =>
  action$.pipe(
    ofType(REQUEST_COMMENT),
    mergeMap((action, state) => {
      const listURL = action.payload.map(commentURL)
      const observableObj = from(listURL)
      return observableObj.pipe(
        mergeMap((url, index) => {
          return ajax.get(url).pipe(
            map(response => {
              const { currentComment, maximumComment } = state$.value.appReducer

              if (currentComment + 1 < maximumComment) {
                return {
                  type: REQUEST_COMMENT_SUCCESS,
                  payload: response.response
                }
              } else {
                return {
                  type: REQUEST_COMMENT_DONE,
                  payload: response.response
                }
              }
            })
          )
        }),
        takeUntil(action$.pipe(ofType(REQUEST_COMMENT_DONE)))
      )
    })
  )
export default requestComments
