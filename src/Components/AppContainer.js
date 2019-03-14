import React, { Component } from "react"
import { connect } from "react-redux"

import Story from "./Story"
import Status from "./Status"
import StoryDetail from "./StoryDetail"

import "./style.scss"
// const theme = createMuiTheme()

class AppContainer extends Component {
  render() {
    const { showList, showDetail } = this.props
    return (
      <div id="app-container">
        <Status />
        {showList && <Story />}
        {showDetail && <StoryDetail />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showList: state.appReducer.showList,
  showDetail: state.appReducer.showDetail
})

export default connect(
  mapStateToProps,
  null
)(AppContainer)
