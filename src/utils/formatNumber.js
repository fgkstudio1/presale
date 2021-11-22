const formatNumber = (number) => {
  return number ? parseFloat(parseFloat(number).toFixed(4)) : 0;
};

export default formatNumber;
