import React, { Component } from 'react';
import style from './Products.module.css';
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }
    componentDidMount() {
        this.props.fetchProducts();
    }
    openModal = (product) => {
        this.setState({ product });
    };
    closeModal = () => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                    {
                        !this.props.products ? (<div>Loading......</div>
                        ) : (
                                <ul className={style.products}>
                                    {this.props.products.map(product => (
                                        <li key={product._id}>
                                            <div className={style.product}>
                                                <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                                    <img src={product.image} alt={product.title}></img>
                                                    <p>
                                                        {product.title}
                                                    </p>
                                                </a>
                                                <div className={style.productPrice}>
                                                    <div>{formatCurrency(product.price)}</div>


                                                    <button onClick={() => this.props.addToCart(product)} className={style.button}>
                                                        Add to Cart
                                </button>
                                                </div>
                                            </div>


                                        </li>
                                    ))}
                                </ul>
                            )
                    }

                </Fade>
                {product && (<Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className={style.closeModal} onClick={this.closeModal}> x </button>
                        <div className={style.productDetails}>
                            <img src={product.image} alt={product.title}></img>
                            <div className={style.productDetailsDescription}>
                                <p>
                                    <strong>{product.title}</strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Available Sizes:{" "}
                                    {product.availableSizes.map(x => (
                                        <span>

                                            {" "} <button className={style.button}> {x} </button>

                                        </span>
                                    ))}
                                </p>
                                <div className={style.productPrice}>

                                    <div>{formatCurrency(product.price)}</div>
                                    <button className={style.button} onClick={() => {
                                        this.props.addToCart(product)
                                        this.closeModal();
                                    }}> Add To Cart</button>
                                </div>
                            </div>
                        </div>

                    </Zoom>

                </Modal>
                )}
            </div>
        );
    }
}

export default connect((state) => ({ products: state.products.filteredItems }), { fetchProducts, addToCart })(Products);
