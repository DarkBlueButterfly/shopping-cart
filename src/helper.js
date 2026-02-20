export const processedData = (result) => {
  let id = result.id;
  let title = result.title;
  let image = result.image;
  let price = result.price;

  return {
    id,
    title,
    image,
    price,
  };
};
