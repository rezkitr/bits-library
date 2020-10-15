export const priceFormatter = (price) => {
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedPrice;
};
