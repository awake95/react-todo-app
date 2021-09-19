import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { Popconfirm, message } from 'antd';
import { removeTodoAction, doneTodoAction, sortTodoAction } from '../../../store/todoReducer';

const TodoItem = ( { item, todos, setEditData, setAddPopupVisible, dispatch } ) => {
  const [ checked, setChecked ] = useState( false );
  const index = todos.findIndex( ( obj => obj.id === item.id ) );

  useEffect( () => {
    if ( item.done ) {
      setChecked( true );
    }
  }, [ item.done ] );

  const checkHandler = ( e ) => {
    if ( e.target.closest( '.edit-buttons' ) || e.target.closest( '.ant-popover' ) || e.target.closest( '.edit-popup' ) ) return;
    setChecked( checked => !checked );
    todos[ index ].done = !checked;
    dispatch( doneTodoAction( { index: index, checked: !checked } ) );
    localStorage.setItem( 'todos', JSON.stringify( todos ) );
  };

  const openPopupHandler = () => {
    setEditData( index );
    setAddPopupVisible( true );
  };

  const removeTodoHandler = () => {
    dispatch( removeTodoAction( todos[ index ].id ) );
    message.info( 'Your todo removed successfully!' );
  };

  const dragStartHandler = ( e, index ) => {
    e.dataTransfer.setData( 'index', index );
  };

  const dragEndHandler = ( e, index ) => {
    e.preventDefault();
    e.target.style.background = 'transparent';
    if ( e.target.classList.contains( 'todo-item' ) ) {
      e.target.firstElementChild.style.background = 'transparent';
    }
  };

  const dragLeaveHandler = ( e, index ) => {
    e.target.style.background = 'transparent';

    if ( e.target.classList.contains( 'todo-item' ) ) {
      e.target.firstElementChild.style.background = 'transparent';
    }
  };

  const dragOverHandler = ( e ) => {
    e.preventDefault();
    if ( e.target.classList.contains( 'todo-item' ) ) {
      e.target.firstElementChild.style.background = 'rgba(168, 168, 168, 0.3)';
      e.target.firstElementChild.style.transition = 'background 0.2s';
    } else {
      e.target.style.background = 'rgba(168, 168, 168, 0.3)';
    }
  };

  const dropHandler = ( e, index ) => {
    e.preventDefault();
    e.target.style.background = 'transparent';

    if ( e.target.classList.contains( 'todo-item' ) ) {
      e.target.firstElementChild.style.background = 'transparent';
    }

    const currentIndex = e.dataTransfer.getData( 'index' );
    dispatch( sortTodoAction( { arr: todos, currentIndex: currentIndex, droppedIndex: index } ) );
  };

  return (
    <li onClick={ checkHandler } draggable={ true }
        onDragStart={ ( e ) => dragStartHandler( e, index ) }
        onDragLeave={ ( e ) => dragLeaveHandler( e, index ) }
        onDragEnd={ ( e ) => dragEndHandler( e ) }
        onDragOver={ ( e ) => dragOverHandler( e ) }
        onDrop={ ( e ) => dropHandler( e, index ) }
        className={ [ 'cursor-pointer', 'relative', 'todo-item' ].join( ' ' ) }>
      <span
        className="todo-item-wrapper pt-2 pb-2 pl-2 border-l-2 border-white transition duration-200 hover:border-blue-400">
          <DragOutlined className="draggable-item"/>
          <Checkbox checked={ checked } className="ml-2"/>
          <span
            className={ [ 'ml-2', ( ( item.done && !checked ) || ( !item.done && checked ) || ( item.done && checked ) ) ? 'line-through text-gray-300' : '' ].join( ' ' ) }>{ item.text }</span>
        <span
          className="edit-buttons absolute block top-1/2 transform -translate-y-1/2 right-12 w-10 flex justify-between items-center  z-30">
              <span className="todo-time text-gray-400 text-xs">{ item.time.time }</span>
              <EditOutlined className="ml-3 mr-3" twoToneColor="red" onClick={ openPopupHandler }/>
              <Popconfirm placement="top" title={ 'Are you sure that you want to delete this?' }
                          onConfirm={ removeTodoHandler }
                          okText="Yes" cancelText="No">
                <DeleteOutlined/>
              </Popconfirm>
          </span>
        </span>
    </li>
  );
};

export default TodoItem;
