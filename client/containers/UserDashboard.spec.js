/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { default as UserDashboard } from './UserDashboard'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('UserDashboard', () => {
  let dashboard

  beforeEach(() => {
    dashboard = shallow(<UserDashboard email="cody@email.com" />)
  })

  xit('renders the email in an h3', () => {
    expect(dashboard.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
