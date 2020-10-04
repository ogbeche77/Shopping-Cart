import React, { Component } from 'react';
import style from './Filter.module.css';
import { filterProducts, sortProducts } from '../actions/productActions';
import { connect } from 'react-redux';

class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (<div>Loading.....</div>
        ) : (
                <div className={style.filter}>
                    <div className="filter-result">{this.props.filteredProducts.length} Products</div>
                    <div className="filter-sort">
                        Order {" "}
                        <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                            <option value="Latest">Latest</option>
                            <option value="Price Descending">Price Descending</option>
                            <option value="Price Ascending">Price Ascending</option>
                        </select>
                    </div>

                    <div className={style.filterSize}>
                        Filter
                <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                            <option value="">ALL</option>
                            <option value="Simple">Simple</option>
                            <option value="Elegant">Elegant</option>
                            <option value="Safari">Safari</option>
                            <option value="Splendid">Splendid</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Queens">Queens</option>
                        </select>
                    </div>

                </div>)

    }
}

export default connect((state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
}),
    {
        filterProducts,
        sortProducts,
    })(Filter);