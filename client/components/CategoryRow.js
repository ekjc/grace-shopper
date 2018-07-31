import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CategoryRow = ({ category, deleteCategory }) => (
  <tr>
    <td>{category.id}</td>
    <td>
      <Link to={`/manage/category/${category.id}`}>{category.name}</Link>
    </td>
    <td>
      {category.parent ? (
        category.parent.name
      ) : (
        <span className="is-size-7 has-text-grey-light">N/A</span>
      )}
    </td>
    <td>
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Link
            to={`/manage/category/${category.id}`}
            className="button is-link is-small"
          >
            Edit
          </Link>
        </p>
        <p className="control">
          <a
            href="#"
            onClick={event => deleteCategory(event, category)}
            className="button is-danger is-small"
          >
            Delete
          </a>
        </p>
      </div>
    </td>
  </tr>
)

export default CategoryRow

CategoryRow.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired
}
