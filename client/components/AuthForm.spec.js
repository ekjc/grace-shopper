/* global describe beforeEach it */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import { AuthForm } from './AuthForm'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('AuthForm', () => {
  let authForm, submitSpy

  beforeEach(() => {
    submitSpy = sinon.spy()
    authForm = shallow(
      <AuthForm displayName="Login" name="Test Name" handleSubmit={submitSpy} />
//       <AuthForm
//         displayName="Sign in"
//         name="Test Name"
//         handleSubmit={submitSpy}
//       />
    )
  })

  it('submits the form with the proper handleSubmit function', () => {
    const handleSubmit = sinon.spy()
    console.log('handleSubmit', handleSubmit)
  })

  it('submits the form with .......? ', () => {
    const form = authForm.find('form')
    form.simulate('submit')
    expect(submitSpy.called).to.be.true
  })
})
