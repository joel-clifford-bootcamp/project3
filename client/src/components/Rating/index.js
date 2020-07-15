import React, { Component } from "react";
import "./style.css";
import StarRatings from './react-star-ratings';
 
class Foo extends Component {
    changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
    }
 
    render() {
      // rating = 2;
      return (
        <StarRatings
          rating={this.state.rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
      );
    }
}
  
class Bar extends Component {
  render() {
    // aggregateRating = 2.35;
    return (
      <StarRatings
        rating={2.403}
        starDimension="40px"
        starSpacing="15px"
      />
    );
  }
}

export { Bar, Foo }

