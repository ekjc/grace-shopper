import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { slugify } from '../utils'

const CategoryMenu = props => {
  const { category, categories, handleClick, isLoading } = props
  if (isLoading) return null

  // console.log('category', category)

  return (
    <aside className="menu">
      <p className="menu-label">Categories</p>
      <ul className="menu-list">

        {!isLoading && categories.map(x => (
          <li key={x.id}>
            <Link
              to={`/products/${slugify(x.name)}`}
              onClick={event => handleClick(event, x)}
            >
              {x.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategoryMenu
