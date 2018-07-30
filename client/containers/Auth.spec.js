/* global describe beforeEach it */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import { default as Auth } from './Auth'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Auth', () => {
  let myAuth, submitSpy

  beforeEach(() => {
    submitSpy = sinon.spy()
    myAuth = shallow(
      <Auth displayName="Login" name="Test Name" handleSubmit={submitSpy} />
//       <Auth
//         displayName="Sign in"
//         name="Test Name"
//         handleSubmit={submitSpy}
//       />
    )
  })

  xit('submits the form with the proper handleSubmit function', () => {
    const handleSubmit = sinon.spy()
    console.log('handleSubmit', handleSubmit)
  })

  xit('submits the form with .......? ', () => {
    const form = myAuth.find('form')
    form.simulate('submit')
    expect(submitSpy.called).to.be.true
  })
})
