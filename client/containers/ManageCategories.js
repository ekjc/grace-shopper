import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories, deleteCategory } from '../store'
import { CategoryRow } from '../components'

class ManageCategories extends Component {
  componentDidMount() {
    this.props.getCategories()
  }

  handleDelete = (event, category) => {
    event.preventDefault()
    this.props.deleteCategory(category)
  }

  render() {
    const { categories, isLoading, deleteCategory } = this.props

    if (isLoading) return null

    return (
      <div>
        <h1 className="title is-2">Manage Categories</h1>
        <table className="table is-fullwidth is-striped">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '20%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Parent</th>
              <th scope="col"></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <CategoryRow
                key={category.id}
                category={category}
                deleteCategory={this.handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoading: !!state.categories.isLoading,
  categories: state.categories.all
})

const mapDispatch = dispatch => ({
  getCategories: () => dispatch(fetchCategories()),
  deleteCategory: category => dispatch(deleteCategory(category))
})

export default connect(mapState, mapDispatch)(ManageCategories)

/**
 * PROP TYPES
 */
ManageCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}
