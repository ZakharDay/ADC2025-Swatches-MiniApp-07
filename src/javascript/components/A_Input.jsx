import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Input extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  handleInput = () => {
    const { handleInput } = this.props
    const value = this.input.current.value
    handleInput(value)
  }

  render() {
    const { value } = this.props

    return (
      <input
        ref={this.input}
        className="A_Input"
        type="text"
        placeholder={this.props.placeholder}
        value={value}
        onInput={this.handleInput}
      />
    )
  }
}
