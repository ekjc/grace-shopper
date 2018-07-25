import React, {Component} from 'react'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import getProductById from './store/singleProduct'

class SingleProductView extends Component {

   componentDidMount() {
       this.props.getProductById(this.props.match.params.id)
  }
  
    render () {
      return (
        <div>
            <h3>Name: {this.props.name}</h3>
            <br/>
            <h3>Price: {this.props.price}</h3>
            <br/>
            <h3>Desciption: {this.props.description}</h3>
            <br/>
            <h3>SKU: {this.props.SKU}</h3>
            <br/>
            <h3>Units In Stock: {this.props.unitsInStock}</h3>
            <br/>
            <h3>Quantity Per Unit: {this.props.quantityPerUnit}</h3>            
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      selectedProduct: state.selectedProduct
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
     getProductById: () => {
        dispatch(getProductById(this.props.match.params.id))
     }
  }
}

const ConnectedSingleProductView = connect(mapStateToProps, mapDispatchToProps)(SingleProductView)

export default ConnectedSingleProductView