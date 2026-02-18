import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Input extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  handleInput = () => {
    const { param, handleInput } = this.props
    const value = this.input.current.value
    handleInput(param, value)
  }

  render() {
    const { type, placeholder, value } = this.props

    return (
      <input
        ref={this.input}
        className="A_Input"
        type={type}
        placeholder={placeholder}
        value={value}
        onInput={this.handleInput}
      />
    )
  }
}
