import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { slugify } from '../utils'

const CategoryMenu = props => {
  const { categories, handleClick, isLoading } = props
  if (!categories.length) return null

  return (
    <div>
      <div>
        <h4 className="title is-5">Categories</h4>
        {!isLoading && categories.map(x => (
          <div key={x.id}>
            <Link
              to={`/products/${slugify(x.name)}`}
              onClick={event => handleClick(event, x)}
            >
              {x.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryMenu
