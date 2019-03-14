import React, { Component } from "react"
import { connect } from "react-redux"

import Button from "@material-ui/core/Button"

import "./style.scss"

class Status extends Component {
  render() {
    const { fetchURL, fetchStory, fetchComment, showDetail } = this.props
    return (
      <div id="status-container">
        {!fetchURL ? (
          <Button className="status-btn" variant="contained" color="secondary">
            Fetching URLs...
          </Button>
        ) : (
          <Button className="status-btn" variant="contained" color="primary">
            URLs DONE
          </Button>
        )}

        {fetchURL && !fetchStory ? (
          <Button className="status-btn" variant="contained" color="secondary">
            Fetching Story...
          </Button>
        ) : (
          <Button className="status-btn" variant="contained" color="primary">
            Story DONE
          </Button>
        )}

        {showDetail ? (
          !fetchComment ? (
            <Button
              className="status-btn"
              variant="contained"
              color="secondary"
            >
              Fetching Comments...
            </Button>
          ) : (
            <Button className="status-btn" variant="contained" color="primary">
              Comments DONE
            </Button>
          )
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchURL: state.appReducer.fetchURL,
  fetchStory: state.appReducer.fetchStory,
  fetchComment: state.appReducer.fetchComment,
  showDetail: state.appReducer.showDetail
})

export default connect(
  mapStateToProps,
  null
)(Status)
