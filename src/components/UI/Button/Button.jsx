import React from 'react';

const Button = ( { classNames = [], children, handler} ) => {
  return (
    <button className={ classNames.join( ' ' ) } onClick={ handler }>
      { children }
    </button>
  );
};

export default Button;
