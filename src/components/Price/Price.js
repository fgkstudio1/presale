import React from 'react';
import Root from './Price.style';
import PropTypes from "prop-types";

const Price = (props) => {
    const { name, price, ...rest } = props;

    return <Root {...rest}>
        <span>{name}</span>
        <strong>{price}</strong>
    </Root>
};

Price.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default Price;
