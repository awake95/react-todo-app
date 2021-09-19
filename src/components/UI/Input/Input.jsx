import React from 'react';

const Input = ( { type, value, placeholder, classNames = [], handler, checked, onKeyPress } ) => {
  return (
    <input type={ type } value={ value } placeholder={ placeholder }
           className={ [ 'focus:outline-none', classNames.join( ' ' ) ].join( ' ' ) } onChange={ handler }
           checked={ checked } onKeyPress={ onKeyPress }/>
  );
};

export default Input;
