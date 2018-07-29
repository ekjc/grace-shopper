import React from 'react'
import { connect } from 'react-redux'

const beer = 'beer'
const wine = 'wine'
const spirits = 'spirits'

const categories = {
  beer: ['Wheat Ales', 'IPAs', 'Pilsners', 'Saisons'],
  wine: ['Reds', 'Whites'],
  spirits: ['Gin', 'Vodka', 'Tequila', 'Bourbon', 'Whiskey', 'Scotch']
}

export const NavTabs = ({ props }) => {
  return (
    <div style={{ marginTop: '15px' }}>
      {props === beer
        ? categories.beer.map(cat => <a style={{ margin: '15px' }}>{cat}</a>)
        : null}
      {props === wine
        ? categories.wine.map(cat => <a style={{ margin: '15px' }}>{cat}</a>)
        : null}
      {props === spirits
        ? categories.spirits.map(cat => <a style={{ margin: '15px' }}>{cat}</a>)
        : null}
    </div>
  )
}
