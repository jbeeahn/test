import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import MediaQuery from "react-responsive"

import * as _ from "lodash"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import AppActions from "../../Actions/AppAction"

import "./style.scss"

class Story extends Component {
  constructor() {
    super()
    this.tableRef = React.createRef()
  }

  componentDidMount() {
    const { requestTopStoryURL } = this.props
    requestTopStoryURL()
  }

  componentDidUpdate() {
    const { topStoryURL, fetchURL, fetchStory, requestStory } = this.props

    fetchURL && !fetchStory && requestStory(topStoryURL)
  }

  clickHandler(story) {
    const { switchStoryDetail } = this.props
    switchStoryDetail(story)
  }

  render() {
    const { fetchStory, story } = this.props
    const sortedStory = _.sortBy(story, item => {
      return item.score
    })

    return (
      <div>
        <div id="story-list-title">STORY LIST</div>

        <Paper id="story-paper" ref={this.tableRef}>
          <Table id="story-table">
            <MediaQuery query="(min-device-width:640px)">
              <TableHead>
                <TableRow key={`story-table-head-row`}>
                  <TableCell align="left">By</TableCell>
                  <TableCell align="left">Score</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Type</TableCell>
                </TableRow>
              </TableHead>
            </MediaQuery>
            <MediaQuery query="(max-device-width:639px)">
              <TableHead>
                <TableRow key={`story-table-head-row`}>
                  <TableCell align="left">By</TableCell>
                  <TableCell align="left">Title</TableCell>
                </TableRow>
              </TableHead>
            </MediaQuery>

            {fetchStory &&
              sortedStory.reverse().map(s => {
                return (
                  <TableBody key={s.id}>
                    <MediaQuery query="(max-device-width: 639px)">
                      <TableRow
                        key={s.id}
                        hover={true}
                        onClick={this.clickHandler.bind(this, s)}
                      >
                        <TableCell align="left">{s.by}</TableCell>
                        <TableCell align="left">{s.title}</TableCell>
                      </TableRow>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width:640px)">
                      <TableRow
                        key={s.id}
                        hover={true}
                        onClick={this.clickHandler.bind(this, s)}
                      >
                        <TableCell align="left">{s.by}</TableCell>
                        <TableCell align="left">{s.score}</TableCell>
                        <TableCell align="left">{s.title}</TableCell>
                        <TableCell align="left">{s.type}</TableCell>
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
  fetchURL: state.appReducer.fetchURL,
  fetchStory: state.appReducer.fetchStory,
  topStoryURL: state.appReducer.topStoryURL,
  story: state.appReducer.story,
  currentStory: state.appReducer.currentStory,
  maximumStory: state.appReducer.maximumStory,
  showList: state.appReducer.showList,
  showDetail: state.appReducer.showDetail
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestTopStoryURL: AppActions.requestTopStoryURL,
      requestStory: AppActions.requestStory,
      switchStoryDetail: AppActions.switchStoryDetail
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Story)
