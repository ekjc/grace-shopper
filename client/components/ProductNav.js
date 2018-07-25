import React from 'react'
import { connect } from 'react-redux'
import { fetchProductsByCategory } from '../store'


const ProductNav = (props) => {
  console.log(props);
    return (
      <div>
        <a style={{ margin: '15px', color: 'blue' }}
           onClick={() => props.fetchLocalProducts(1)}>BEER</a>
        <a style={{ margin: '15px', color: 'blue' }}
          onClick={() => props.fetchLocalProducts(2)}>WINE</a>
        <a style={{ margin: '15px', color: 'blue' }}
          onClick={() => props.fetchLocalProducts(3)}>SPIRITS</a>
      </div>
    )
  }

  const mapStateToProps = state => ({
    products: state.products.products
  })

  const mapDispatchToProps = dispatch => ({
    fetchLocalProducts: (categoryId) => dispatch(fetchProductsByCategory(categoryId))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(ProductNav)
