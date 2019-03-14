import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"

import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import CommentList from "../CommentList"

import AppActions from "../../Actions/AppAction"

import "./style.scss"

class StoryDetail extends Component {
  componentDidMount() {
    const { selectedStory, requestComments } = this.props

    requestComments(selectedStory.kids.slice(0, 20))
  }

  clickHandler() {
    const { switchStoryList } = this.props

    switchStoryList()
  }

  render() {
    const { selectedStory, fetchComment } = this.props

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.clickHandler.bind(this)}
          id="story-detail-back-to-list-btn"
        >
          BACK TO LIST
        </Button>
        <Paper id="story-detail-container">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">By</TableCell>
                <TableCell align="right">{selectedStory.by}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Score</TableCell>
                <TableCell align="right">{selectedStory.score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">title</TableCell>
                <TableCell align="right">{selectedStory.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">type</TableCell>
                <TableCell align="right">{selectedStory.type}</TableCell>
              </TableRow>
            </TableBody>
            {/* </MediaQuery> */}
          </Table>
        </Paper>
        {fetchComment && <CommentList />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showList: state.appReducer.showList,
  showDetail: state.appReducer.showDetail,
  selectedStory: state.appReducer.selectedStory,
  fetchComment: state.appReducer.fetchComment
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      switchStoryList: AppActions.switchStoryList,
      requestComments: AppActions.requestComments
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryDetail)
