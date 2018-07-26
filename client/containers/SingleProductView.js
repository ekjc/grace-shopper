import React, { Component } from 'react'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProductById } from '../store'
import Reviews from './Reviews'

class SingleProductView extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProductById(productId)
  }
  
    render () {
      const product = this.props.singleProduct
      return (
        <div>
            <h1>Name: {product.name}</h1>
            <h3>Price: {product.price}</h3>
            <h3>Desciption: {product.description}</h3>
            <h3>SKU: {product.SKU}</h3>
            <h3>Units In Stock: {product.unitsInStock}</h3>
            <h3>Quantity Per Unit: {product.quantityPerUnit}</h3>
            <Reviews productId={this.props.match.params.productId}/> 
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
    return {
      singleProduct: state.singleProduct
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductById: id => {
      dispatch(getProductById(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
