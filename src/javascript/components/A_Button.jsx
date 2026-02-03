import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Button extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className="A_Button"
        onClick={() => {
          this.props.handleClick(this.props.text)
        }}
      >
        {this.props.text}
      </div>
    )
  }
}
