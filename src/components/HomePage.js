import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actions } from '../actions/actions';


const Item = ({ item, cart, addItemToShoppingCart, removeItemFromShoppingCart }) => {
  const cartItem = cart.find(cartItem => cartItem.itemId === item.id);

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.itemImg}</p>
      <p>{item.price}</p>
      <p>{cartItem ? cartItem.count : 0}</p>
      <button onClick={() => addItemToShoppingCart(item)}>Add to Cart</button>
      <button onClick={() => removeItemFromShoppingCart(item)}>Remove from Cart</button>
    </div>
  );
}

const CartItem = ({ cartItem, items, addItemToShoppingCart, removeItemFromShoppingCart }) => {
  const item = items.find(item => item.id === cartItem.itemId);

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.price}</p>
      <p>{cartItem ? cartItem.count : 0}</p>
      <button onClick={() => addItemToShoppingCart(item)}>Add to Cart</button>
      <button onClick={() => removeItemFromShoppingCart(item)}>Remove from Cart</button>
    </div>
  );
}

const Cart = ({ items, cart, addItemToShoppingCart, removeItemFromShoppingCart }) => {

  let sum = 0;
  cart.forEach(cartItem => {
    const item = items.find(item => item.id === cartItem.itemId);
    sum += parseFloat(item.price) * cartItem.count;
    console.log(sum);
  })

  const hasItems = cart.length > 0
  const itemsInCart = hasItems ? (
    cart.map(cartItem =>
      <div key={cartItem.itemId}>
        <CartItem
          cartItem={cartItem}
          items={items}
          addItemToShoppingCart={addItemToShoppingCart}
          removeItemFromShoppingCart={removeItemFromShoppingCart}
        />
      </div>
    )
  ) : (
      <div>Please add some produts to cart</div>
    )
  return (
    <div>
      <p>Shopping Cart</p>
      <div>{itemsInCart}</div>
      <div>{sum}</div>
    </div>
  );
}

const HomePageComponent = ({ items, addItemToShoppingCart, cart, removeItemFromShoppingCart }) => {

  return (
    <div>
      {items.map(item =>
        <div key={item.id}>
          <Item item={item} cart={cart} addItemToShoppingCart={addItemToShoppingCart} removeItemFromShoppingCart={removeItemFromShoppingCart} />
        </div>
      )}
      <Cart items={items} cart={cart} addItemToShoppingCart={addItemToShoppingCart} removeItemFromShoppingCart={removeItemFromShoppingCart} />
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
  })),
  addItemToShoppingCart: PropTypes.func,
  removeItemFromShoppingCart: PropTypes.func
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  })),
  addItemToShoppingCart: PropTypes.func,
  removeItemFromShoppingCart: PropTypes.func
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
  addItemToShoppingCart: PropTypes.func,
  removeItemFromShoppingCart: PropTypes.func
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


