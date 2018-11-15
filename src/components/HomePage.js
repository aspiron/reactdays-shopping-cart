import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actions } from '../actions/actions';
import { createItem, getItem, createCartItem, getCartItems, deleteAllCartItems, updateCartItem, deleteCartItem } from './api';
import { exampleItems } from '../reducers/initialState';

const Item = ({ item, cart, getCartItemsSuccess }) => {
  const cartItem = cart.find(cartItem => cartItem.itemId === item.id);

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.itemImg}</p>
      <p>{item.price}</p>
      <p>{cartItem ? cartItem.count : 0}</p>
      <button onClick={() => addItemToShoppingCart(item, getCartItemsSuccess, cart)}>Add to Cart</button>
      <button onClick={() => removeItemFromShoppingCart(item, getCartItemsSuccess, cart)}>Remove from Cart</button>
    </div>
  );
}

const addItemToShoppingCart = (item, getCartItemsSuccess, cart) => {
  const currentCartItem = cart.find(cartItem => cartItem.itemId === item.id);
  if (currentCartItem) {
    updateCartItem({ ...currentCartItem, count: currentCartItem.count + 1 })
      .then(() => getCartItems())
      .then(response => getCartItemsSuccess(response.data))
  } else {
    createCartItem({
      itemId: item.id,
      count: 1
    })
      .then(() => getCartItems())
      .then(response => getCartItemsSuccess(response.data));
  }
}

const removeItemFromShoppingCart = (item, getCartItemsSuccess, cart) => {
  const currentCartItem = cart.find(cartItem => cartItem.itemId === item.id);
  if (currentCartItem) {
    if (currentCartItem.count > 1) {
      updateCartItem({ ...currentCartItem, count: currentCartItem.count - 1 })
      .then(() => getCartItems())
      .then(response => getCartItemsSuccess(response.data))
    } else {
      deleteCartItem(currentCartItem)
      .then(() => getCartItems())
      .then(response => getCartItemsSuccess(response.data));
    }
  }
}

const CartItem = ({ cartItem, items, getCartItemsSuccess, cart }) => {
  const item = items.find(item => item.id === cartItem.itemId);


  return (
    <div>
      <p>{item.title}</p>
      <p>{item.price}</p>
      <p>{cartItem ? cartItem.count : 0}</p>
      <button onClick={() => addItemToShoppingCart(item, getCartItemsSuccess, cart)}>Add to Cart</button>
      <button onClick={() => removeItemFromShoppingCart(item, getCartItemsSuccess, cart)}>Remove from Cart</button>
    </div>
  );
}

const Cart = ({ items, cart, getCartItemsSuccess }) => {

  let sum = 0;
  cart.forEach(cartItem => {
    const item = items.find(item => item.id === cartItem.itemId);
    sum += parseFloat(item.price) * cartItem.count;
  })

  const hasItems = cart.length > 0
  const itemsInCart = hasItems ? (
    cart.map(cartItem =>
      <div key={cartItem.itemId}>
        <CartItem
          cartItem={cartItem}
          items={items}
          getCartItemsSuccess={getCartItemsSuccess}
          cart={cart}
        />
      </div>
    )
  ) : (
      <div>Please add some products to cart</div>
    )
  return (
    <div>
      <p>Shopping Cart</p>
      <div>{itemsInCart}</div>
      <div>{sum}</div>
    </div>
  );
}



class HomePageComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    getItem()
      .then(response => this.props.itemsLoaded(response.data))
      .then(() => getCartItems())
      .then(response => this.props.getCartItemsSuccess(response.data));
  }

  render() {
    const { items, cart, selectCategory, selectedCategory, getCartItemsSuccess } = this.props
    const filteredItems = items.filter(item => item.category === selectedCategory)

    return (
      <div>
        <button onClick={() => deleteAllCartItems()}>Clear Shopping Cart</button>
        <button onClick={() => exampleItems.forEach(item => createItem(item))}>Create Item</button>
        <button onClick={() => selectCategory("food")}>Food</button>
        <button onClick={() => selectCategory("fashion")}>Fashion</button>
        {filteredItems.map(item =>
          <div key={item.id}>
            <Item item={item} cart={cart} getCartItemsSuccess={getCartItemsSuccess} />
          </div>
        )}
        <Cart items={items} cart={cart} getCartItemsSuccess={getCartItemsSuccess} />
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title,
    itemImg: PropTypes.string,
    price: PropTypes.string
  }).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    itemId: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  removeItemFromShoppingCart: PropTypes.func.isRequired,
  getCartItemsSuccess: PropTypes.func.isRequired
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
  selectedCategory: PropTypes.string,
  addItemToShoppingCart: PropTypes.func,
  removeItemFromShoppingCart: PropTypes.func,
  selectCategory: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: state.items,
  cart: state.shoppingCart.cart,
  selectedCategory: state.categories.selectedCategory
});

const mapDispatchToProps = (dispatch) => {
  return {
    itemsLoaded: items => dispatch(actions.getItemsSuccess(items)),
    getCartItemsSuccess: items => dispatch(actions.getCartItemsSuccess(items))
  }
}

const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);

export default HomePage;