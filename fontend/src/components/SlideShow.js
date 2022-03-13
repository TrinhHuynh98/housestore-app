import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import { useSelector } from 'react-redux';
import MessageBox from '../components/Messagebox';

function SlideShow(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      {loading ? (
        <></>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Carousel
          responsive={responsive}
          //autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {products
            .filter((item) => item.rating >= 4)
            .map((item, i) => (
              <Item key={i} item={item} />
            ))}
        </Carousel>
      )}
    </>
  );
}

export default SlideShow;
