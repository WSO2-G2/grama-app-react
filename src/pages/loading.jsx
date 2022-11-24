import React, { Component } from 'react'
import Page from 'react-page-loading-v2'

export default class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Page loader={"bar"} color={"#A9A9A9"} size={4}>
          <h1>Title</h1>
          <p>content goes here</p>
        </Page>
      </div>
    )
  }
}