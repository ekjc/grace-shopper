import React, {Component} from 'react'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { getProductById } from '../store'

class SingleProductView extends Component {

   componentDidMount() {
       const productId = this.props.match.params.productId
       this.props.getProductById(productId)
  }
  
    render () {
      console.log('this.props.singleProduct', this.props.singleProduct)
      const product = this.props.singleProduct
      return (
        <div>
            <h3>Name: {product.name}</h3>
            <br/>
            <h3>Price: {product.price}</h3>
            <br/>
            <h3>Desciption: {product.description}</h3>
            <br/>
            <h3>SKU: {product.SKU}</h3>
            <br/>
            <h3>Units In Stock: {product.unitsInStock}</h3>
            <br/>
            <h3>Quantity Per Unit: {product.quantityPerUnit}</h3>            
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log('from inside mapStateToProps', state.singleProduct)
    return {
      singleProduct: state.singleProduct
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
     getProductById: (id) => {
        dispatch(getProductById(id))
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
