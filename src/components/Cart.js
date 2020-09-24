import React, { Component } from 'react';
import style from './Cart.module.css';
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        };
    };
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };
        this.props.createOrder(order);
    };
    closeModal = () => {
        this.props.clearOrder();
    }
    render() {
        const { cartItems, order } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className={style.cart}>Cart is empty</div>
                ) : (
                        <div className={style.cart}>You have {cartItems.length} in the cart {" "}
                        </div>
                    )}
                {order && <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className={style.closeModal} onClick={this.closeModal}>x</button>
                        <div className={style.orderDetails}>
                            <h3 className={style.successMessage}> Your order has been placed</h3>
                            <h2>Order {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{order.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{order.address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{order.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(order.total)}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>{order.cartItems.map(x => (
                                        <div> {x.count} * {x.title}</div>
                                    ))}</div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>


                </Modal>}
                <div>
                    <div className={style.cart}>
                        <Fade left cascade>
                            <ul className={style.cartItems}>
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className={style.right}>
                                                {formatCurrency(item.price)} x {item.count}{"  "}
                                                <button className={style.button} onClick={() => this.props.removeFromCart(item)}>
                                                    Remove
                                            </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className={style.cart}>
                                <div className={style.total}>
                                    <div>
                                        Total: {" "}
                                        {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    <button onClick={() => {
                                        this.setState({ showCheckout: true });
                                    }} className={style.button}>
                                        Proceed
                            </button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div className={style.cart}>
                                        <form onSubmit={this.createOrder}>
                                            <ul className={style.formContainer}>
                                                <li>
                                                    <label>Email</label>
                                                    <input name="email" type="email" required onChange={this.handleInput}>

                                                    </input>

                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input name="name" type="text" required onChange={this.handleInput}>

                                                    </input>

                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input name="address" type="text" required onChange={this.handleInput}>

                                                    </input>
                                                </li>
                                                <li>
                                                    <button className={style.button} type="submit">Checkout</button>
                                                </li>

                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}


                </div>
            </div>

        );
    }
}

export default connect((state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
}),
    { removeFromCart, createOrder, clearOrder }
)(Cart);
