import { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

const CarouselBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselDiv = styled.div`
  //   width: 500px;
  width: 100vh;
`;

const Dots = styled.span`
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
  &.active {
    background-color: hotpink;
  }
  &:hover {
    background-color: #717171;
  }
`;

const Carousel = ({ featured }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <CarouselBody>
        <button onClick={prevSlide} title="Previous Item">
          &#10094;
        </button>
        <Link
          to={`/products/${featured[currentIndex]?.id}`}
          title={`Check out ${featured[currentIndex]?.title}`}
        >
          <CarouselDiv>
            <img
              src={featured[currentIndex]?.image}
              alt={featured[currentIndex]?.title}
            />
          </CarouselDiv>
        </Link>
        <button onClick={nextSlide} title="Next Item">
          &#10095;
        </button>
      </CarouselBody>
      <div>
        {featured.map((_, index) => (
          <Dots
            key={index}
            className={currentIndex === index ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
