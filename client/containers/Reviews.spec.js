/* global describe beforeEach it */

const chai = require('chai')
const expect = chai.expect
const chaiSpies = require('chai-spies')
const sinon = require('sinon')

// Components
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Reviews from './Reviews'

const adapter = new Adapter()
enzyme.configure({ adapter })

const reviewData = [
  {
    id: 4,
    rating: 1,
    subject: 'BAD',
    content: 'Forget it'
  },
  {
    id: 9,
    rating: 2,
    subject: `It's fine`,
    content: 'Whatever'
  },
  {
    id: 21,
    rating: 5,
    subject: 'LOVED IT!',
    content: 'Buy this!'
  },
]

describe('<Reviews /> component', () => {
  let renderedReviews

  beforeEach(() => {
    renderedReviews = shallow(<Reviews productId={10} />)
  })

  xit('should render the review rating in a <p> tag', () => {
    expect(renderedReviews.find('p.subtitle').node).to.exist // eslint-disable-line no-unused-expressions
  })
})
