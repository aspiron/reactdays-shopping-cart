import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const HomePageComponent = ({ items }) => {
  return (
    <div>
      {items.map(item =>
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.itemImg}</p>
          <p>{item.price}</p>
        </div>
      )}
    </div>
  );
}

HomePageComponent.propTypes = {
  items: PropTypes.array
}

const mapStateToProps = (state) => ({
  items: state.items
});

const mapDispatchToProps = (dispatch) => {

}

const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);

export default HomePage;


