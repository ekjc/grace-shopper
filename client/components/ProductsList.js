import React from 'react'
import {connect} from 'react-redux'
import fetchProductsDB from '../store/products'

const mapStateToProps = state => ({
  products: state.products.products,
});

const mapDispatchToProps = dispatch => ({
  fetchProductsDB: () => dispatch(fetchProductsDB()),
});

class ProductsList extends React.Component {
  async componentDidMount() {
    await this.props.fetchProductsDB();
  }

  render() {
    return (
      <div>
        <h1>All Products</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
