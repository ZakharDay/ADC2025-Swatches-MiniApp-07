import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Text extends PureComponent {
  constructor(props) {
    super(props)
  }

  createMarkup = () => {
    const { text } = this.props
    return { __html: text }
  }

  render() {
    const { type, text } = this.props

    const classes = classnames({
      A_Text: true,
      [type]: true
    })

    return (
      <div className={classes} dangerouslySetInnerHTML={this.createMarkup()} />
    )
  }
}
