import { useEffect, useState } from "react";
import { processedData } from "../helper";
import Carousel from "../components/Carousel";

const Home = () => {
  const [array, setArray] = useState([]); // array of random numbers
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const randomize = () => {
      const num = new Set();
      while (num.size < 5) {
        num.add(Math.floor(Math.random() * 20) + 1);
      }

      const array = [...num]; // convert to array
      setArray(array);
    };
    randomize();
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      const response = await Promise.all(
        array.map((num) =>
          fetch(`https://fakestoreapi.com/products/${num}`).then((res) =>
            res.json(),
          ),
        ),
      );

      const processed = response.map(processedData);
      setFeatured(processed);
    };

    fetchFeatured();
  }, [array]);

  return (
    <>
      <h1>Shop Here, Shop Now!</h1>
      <p>Find what you need here!</p>
      <h2>Featured Items</h2>
      <Carousel featured={featured} />
    </>
  );
};

export default Home;
