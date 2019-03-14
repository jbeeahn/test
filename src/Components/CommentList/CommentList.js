import React, { Component } from "react"
import { connect } from "react-redux"

import MediaQuery from "react-responsive"

import * as _ from "lodash"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import "./style.scss"

class CommentList extends Component {
  commentListBuilder() {
    const { comments } = this.props

    const commentList = _.compact(comments).map(comment => {
      return (
        <TableBody>
          <MediaQuery query="(max-device-width: 639px)">
            <TableRow key={comment.id} hover={true}>
              <TableCell align="left">{comment.by}</TableCell>
              <TableCell align="left">{comment.text}</TableCell>
            </TableRow>
          </MediaQuery>
          <MediaQuery query="(min-device-width:640px)">
            <TableRow key={comment.id} hover={true}>
              <TableCell align="left">{comment.by}</TableCell>

              <TableCell align="left">{comment.text}</TableCell>
            </TableRow>
          </MediaQuery>
        </TableBody>
      )
    })

    return commentList
  }

  render() {
    const { comments } = this.props

    return (
      <div id="story-detail-comments-container">
        <div id="story-detail-comments-title">COMMENTS</div>
        <Paper id="story-detail-comments-paper">
          <Table padding="dense">
            <MediaQuery query="(min-device-width:640px)">
              <TableHead>
                <TableRow key={`comment-table-head-row`}>
                  <TableCell align="left">By</TableCell>

                  <TableCell align="left">Text</TableCell>
                </TableRow>
              </TableHead>
            </MediaQuery>
            <MediaQuery query="(max-device-width:639px)">
              <TableHead>
                <TableRow key={`comment-table-head-row`}>
                  <TableCell align="left">By</TableCell>
                  <TableCell align="left">Text</TableCell>
                </TableRow>
              </TableHead>
            </MediaQuery>

            {comments.map(comment => {
              return (
                <TableBody key={comment.id}>
                  <MediaQuery query="(max-device-width: 639px)">
                    <TableRow key={comment.id} hover={true}>
                      <TableCell align="left">{comment.by}</TableCell>
                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: "normal",
                          wordBreak: "break-word"
                        }}
                        component="th"
                        scope="row"
                      >
                        {comment.text}
                      </TableCell>
                    </TableRow>
                  </MediaQuery>
                  <MediaQuery query="(min-device-width:640px)">
                    <TableRow key={comment.id} hover={true}>
                      <TableCell align="left">{comment.by}</TableCell>

                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: "normal",
                          wordBreak: "break-word"
                        }}
                        component="th"
                      >
                        {comment.text}
                      </TableCell>
                    </TableRow>
                  </MediaQuery>
                </TableBody>
              )
            })}
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showList: state.appReducer.showList,
  showDetail: state.appReducer.showDetail,
  comments: state.appReducer.comments
})

export default connect(
  mapStateToProps,
  null
)(CommentList)
