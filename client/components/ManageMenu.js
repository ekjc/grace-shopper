import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ManageMenu = ({ path, handleClick }) => {
return (
  <div className="tabs">
    <ul>
      <li data-target-tab="myTab" onClick={handleClick}>
        <Link to="/manage/users">
          Users
        </Link>
      </li>
      <li data-target-tab="myTab" onClick={handleClick}>
        <Link to="/manage/products">
          Products
        </Link>
      </li>
      <li data-target-tab="myTab" onClick={handleClick}>
        <Link to="/manage/categories">
          Categories
        </Link>
      </li>
      <li data-target-tab="myTab" onClick={handleClick}>
        <Link to="/manage/reviews">
          Reviews
        </Link>
      </li>
      <li data-target-tab="myTab" onClick={handleClick}>
        <Link to="/manage/orders">
          Orders
        </Link>
      </li>
    </ul>
  </div>
)
}

export default connect(null, null)(ManageMenu)
