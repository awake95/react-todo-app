import React from 'react';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';

const TodoMessage = ( { inputHandler, keyPressHandler, val, clickHandler, buttonText } ) => {
  return (
    <div className="mt-4">
      <Input type="text" placeholder="Type your name of todo here" value={ val }
             classNames={ [ 'w-3/5', 'rounded-l-lg', 'border-t', 'border-l', 'border-b', 'p-1', 'pl-3' ] }
             handler={ inputHandler } onKeyPress={ keyPressHandler }/>
      <Button
        classNames={ [ 'w-2/5', 'rounded-r-lg', 'border', 'border-green-500', 'p-1', 'bg-green-500', 'text-white' ] }
        handler={ clickHandler }>{buttonText}</Button>
    </div>
  );
};

export default TodoMessage;
