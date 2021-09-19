import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem/TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addTodoAction, editTodoAction, removeTodoAction, sortTodoAction, doneTodoAction, getAllTodoAction } from '../../store/todoReducer'
import TodoAddPopup from './TodoItem/TodoAddPopup/TodoAddPopup';
import { useDispatch, useSelector } from 'react-redux';

const Todo = () => {

  const dispatch = useDispatch();
  const todos = useSelector( state => state.todo.todo );

  const [ initialValues, setInitialValues ] = useState( [] );
  const [ addPopupVisible, setAddPopupVisible ] = useState( false );
  const [ editData, setEditData ] = useState( '' );

  const date = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  const today = date.getDate();
  const day = weekDays[ date.getDay() ];
  const month = months[ date.getMonth() ];

  const addTodoPopupVisibleHandler = () => {
    setAddPopupVisible( addPopupVisible => !addPopupVisible );
  };

  return (
    <div className="max-w-sm w-full bg bg-white relative pb-8 rounded">
      <TransitionGroup component={ null }>
        {
          addPopupVisible &&
          <CSSTransition timeout={ 300 } classNames="slide-up"><TodoAddPopup setAddPopupVisible={ setAddPopupVisible }
                                                                             months={ months }
                                                                             weekDays={ weekDays }
                                                                             editData={ editData }
                                                                             setEditData={ setEditData }
                                                                             dispatch={dispatch}
                                                                             todos={todos} /></CSSTransition>
        }
      </TransitionGroup>

      <div className="bg-white p-5 rounded-sm relative todo-main">
        <span className="block text-blue-500 text-xl"><span className="font-bold">{ day }</span>, { today }th</span>
        <span className="text-gray-400">{ month }</span>
        <span
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400">{ todos && todos.length > 0 ? todos.length + ' Tasks' : '' }</span>
      </div>

      { todos && todos.length > 0
        ?
        <ul
          className="mt-4 h-72 max-h-80 overflow-y-auto overflow-x-hidden overflow-list pl-4 pr-4 md:p-0 h-72">
          <TransitionGroup component={ null }>
            {
              todos.map( ( item, index ) => {
                return (
                  <CSSTransition key={ item.id } timeout={ 300 } classNames="move">
                    <TodoItem
                      item={ item } todos={ todos } i={ index }
                      setEditData={ setEditData } setAddPopupVisible={setAddPopupVisible} dispatch={dispatch}
                    />
                  </CSSTransition> );
              } )
            }
          </TransitionGroup>
        </ul>

        : <Empty className="h-72 flex flex-col items-center justify-center" image={ Empty.PRESENTED_IMAGE_SIMPLE }
                 description={
                   <span>
                             You don't have any todos
                          </span>
                 }/>
      }
      <button
        className="absolute right-6 bg-green-500 w-12 h-12 flex justify-center -bottom-6 left-1/2 transform -translate-x-1/2 z-50 items-center rounded-full transition duration-200 hover:bg-green-600"
        onClick={ addTodoPopupVisibleHandler }><PlusOutlined style={ { color: '#ffffff', fontSize: '24px' } }/></button>
    </div>
  );
};

export default Todo;
