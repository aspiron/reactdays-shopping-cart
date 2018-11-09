import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actions } from '../actions/actions';
import { items } from '../reducers/initialState';


const Item = ({ item, cart }) => {
  const cartItem = cart.find(cartItem => cartItem.itemId === item.id);

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.itemImg}</p>
      <p>{item.price}</p>
      <p>{cartItem ? cartItem.count : 0}</p>
    </div>
  );
}

const CartItem = ({cartItem, items}) => {
  const item = items.find(item => item.id === cartItem.itemId);

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.price}</p>
      <p>{cartItem ? cartItem.count : 0}</p>
    </div>
  );
}

const Cart = ({items, cart}) => {
  const hasItems = cart.length > 0
  const itemsInCart = hasItems ? (
    cart.map(cartItem =>
      <div key={cartItem.itemId}>
        <CartItem 
          cartItem={cartItem}
          items={items}
        />
      </div>
    )
  ) : (
    <p>Please add some produts to cart</p>
  )

  return (
    <div>
      <p>Shopping Cart</p>
      <div>{itemsInCart}</div>
    </div>
  );
}

const HomePageComponent = ({ items, addItemToShoppingCart, cart, removeItemFromShoppingCart }) => {
  console.log(cart);

  return (
    <div>
      {items.map(item =>
        <div key={item.id}>
          <Item item={item} cart={cart} />
          <button onClick={() => addItemToShoppingCart(item)}>Add to Cart</button>
          <button onClick={() => removeItemFromShoppingCart(item)}>Remove from Cart</button>
        </div>
      )}
      <Cart items={items} cart={cart}/>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  }),
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    itemId: PropTypes.number,
    count: PropTypes.number
  }))
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  }),
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    itemId: PropTypes.number,
    count: PropTypes.number
  }))
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  })),
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    itemId: PropTypes.number,
    count: PropTypes.number
  })),
}

HomePageComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  })),
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    itemId: PropTypes.number,
    count: PropTypes.number
  })),
  addItemToShoppingCart: PropTypes.func,
  removeItemFromShoppingCart: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: state.items,
  cart: state.shoppingCart.cart
});

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToShoppingCart: id => dispatch(actions.addItemToShoppingCart(id)),
    removeItemFromShoppingCart: id => dispatch(actions.removeItemFromShoppingCart(id))
  }
}

const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);

export default HomePage;


