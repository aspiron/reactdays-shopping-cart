import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actions } from '../actions/actions';


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

const HomePageComponent = ({ items, addItemToShoppingCart, cart }) => {
  console.log(cart);

  return (
    <div>
      {items.map(item =>
        <div key={item.id}>
          <Item item={item} cart={cart} />
          <button onClick={() => addItemToShoppingCart(item)}>Add to Cart</button>
        </div>
      )}
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
  addItemToShoppingCart: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: state.items,
  cart: state.shoppingCart.cart
});

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToShoppingCart: id => dispatch(actions.addItemToShoppingCart(id))
  }
}

const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);

export default HomePage;


