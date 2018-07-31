import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductRow = ({ product, deleteProduct }) => (
  <tr>
    <td>{product.id}</td>
    <td>
      <Link to={`/product/${product.id}`}>
        {product.name}
        {!!product.isFeatured && (
          <span className="tag is-rounded is-secondary" style={{ fontSize: '.75rem', marginLeft: '.5rem' }}>Featured</span>
        )}
      </Link>
    </td>
    <td className="is-size-7 has-text-grey-dark">${product.price}</td>
    <td className="is-size-7 has-text-grey-dark">{product.SKU}</td>
    <td className={`is-size-7 ${product.unitsInStock > 0 ? 'has-text-success' : 'has-text-danger'}`}>
      <span className="icon">
        <i className={`fas ${product.unitsInStock > 0 ? 'fa-check-circle' : 'fa-exclamation-circle'}`} />
      </span>
      <span>
        {product.unitsInStock > 0 ? 'In Stock' : 'Out of Stock'}
      </span>
    </td>
    <td>
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Link
            to={`/manage/product/${product.id}`}
            className="button is-link is-small"
          >
            Edit
          </Link>
        </p>
        <p className="control">
          <a
            href="#"
            onClick={event => deleteProduct(event, product)}
            className="button is-danger is-small"
          >
            Delete
          </a>
        </p>
      </div>
    </td>
  </tr>
)

export default ProductRow

ProductRow.propTypes = {
  product: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired
}
