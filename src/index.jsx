import './index.css'

import Cookies from 'js-cookie'
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

const urls = {
  signIn: 'http://localhost:3000/api/v1/sign_in.json',
  signUp: 'http://localhost:3000/api/v1/sign_up.json',
  createSubscription: 'http://localhost:3000/api/v1/subscriptions.json',
  getFills: 'http://localhost:3000/api/v1/fills.json',
  createSwatch: 'http://localhost:3000/api/v1/swatches.json',
  showSwatch: 'http://localhost:8080/swatches/show.html',
  indexSwatches: 'http://localhost:3000/api/v1/swatches.json'
}

const pages = {
  subscription: {
    name: 'subscription',
    layout: 'L_CenteredForm',
    template: 'T_SubscriptionForm',
    header: {
      heading: 'Наше супер приложение',
      description: 'Здесь будет вовлекающий текст для миниаппа'
    },
    form: {
      visible: true,
      url: 'http://localhost:3000/api/v1/subscriptions.json',
      entity: 'subscription',
      callback: 'handleSubscriptionFormResponse',
      fields: [
        {
          label: 'Электронная почта',
          name: 'subscription_email',
          param: 'email',
          type: 'email',
          placeholder: 'Введите ваш email'
        }
      ],
      buttons: [
        {
          type: 'primary',
          text: 'Подписаться'
        }
      ]
    }
  },
  signIn: {
    name: 'signIn',
    layout: 'L_CenteredForm',
    template: 'T_SignInForm',
    header: {
      heading: 'Войдите в&nbsp;приложение',
      description: 'Если у вас уже есть аккаунт, введите данные'
    },
    form: {
      visible: true,
      url: 'http://localhost:3000/api/v1/sign_in.json',
      entity: 'user',
      callback: 'handleSignInFormResponse',
      fields: [
        {
          label: 'Электронная почта',
          name: 'user_email',
          param: 'email',
          type: 'email',
          placeholder: 'Введите ваш email'
        },
        {
          label: 'Пароль',
          name: 'user_password',
          param: 'password',
          type: 'password',
          placeholder: 'Введите ваш пароль'
        }
      ],
      buttons: [
        {
          type: 'primary',
          text: 'Войти'
        }
      ]
    }
  },
  swatches: {
    name: 'signIn',
    layout: 'L_CenteredForm',
    template: 'T_Swatches'
  }
}

const selectMenuClasses = ['W_FillCardsDefault']

// Cookies.remove('jwt')

const jwt = Cookies.get('jwt')

const props = {
  urls,
  selectMenuClasses,
  jwt,
  pages
}

const root = createRoot(document.body)

root.render(<App {...props} />)
