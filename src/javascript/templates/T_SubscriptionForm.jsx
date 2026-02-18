import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../components/A_Text.jsx'
import A_Button from '../components/A_Button.jsx'
import M_TitleWithDescriptor from '../components/M_TitleWithDescriptor.jsx'
import O_Form from '../components/O_Form.jsx'

export default class T_SubscriptionForm extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { page, actions, formData, handlePageChange } = this.props
    const { header, form } = page

    return (
      <div className="T_SubscriptionForm">
        <div className="W_FlexGroup">
          <M_TitleWithDescriptor {...header} />

          {form.visible ? (
            <O_Form {...form} formData={formData} actions={actions} />
          ) : (
            <A_Text type="display-paragraph" text="Вы подписаны" />
          )}
        </div>

        <A_Button
          type="tertiary"
          text="У меня есть приглашение"
          handleClick={handlePageChange}
        />
      </div>
    )
  }
}
