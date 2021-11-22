const formatNumber = (number, maxDigits = 4) => {
  return number ? parseFloat(parseFloat(number).toFixed(maxDigits)) : 0;
};

export default formatNumber;
