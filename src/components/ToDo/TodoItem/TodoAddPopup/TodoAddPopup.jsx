import React from 'react';
import { Form, Input, DatePicker, TimePicker, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Button from '../../../UI/Button/Button';
import { addTodoAction, editTodoAction } from '../../../../store/todoReducer';

const TodoAddPopup = ( {
  setAddPopupVisible,
  initialValues,
  setInitialValues,
  months,
  weekDays,
  editData,
  setEditData,
  todos,
  dispatch
} ) => {
  const [ form ] = Form.useForm();

  const getMonth = ( date ) => {
    return months[ date.getMonth() ];
  };

  const getTodayDay = ( date ) => {
    return months[ date.getDate() ];
  };

  const getDay = ( date ) => {
    return weekDays[ date.getDay() ];
  };

  const getTime = ( date ) => {
    let hours = date.getHours(),
      minutes = date.getMinutes();

    if ( minutes.toString().length === 1 ) {
      minutes = '0' + date.getMinutes();
    }

    if ( hours.toString().length === 1 ) {
      hours = '0' + date.getHours();
    }

    return hours + ':' + minutes;
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    try {
      const date = values.task.task_date._d;
      const time = values.task.task_time._d;

      const todo = {
        time: {
          'today': getTodayDay( date ),
          'day': getDay( date ),
          'month': getMonth( date ),
          'time': getTime( time ),
        },
        id: Math.floor( Math.random() * 1000000 ),
        text: values.task.task_name,
        done: false,
      };

      if ( editData !== '' ) {
        const newTodo = { ...todo };
        newTodo.id = todos[ editData ].id;
        newTodo.done = todos[ editData ].done;
        dispatch( editTodoAction( { todo: newTodo, id: editData } ) );
        message.success( 'Your todo is changed!' );
        setEditData( '' );
        setAddPopupVisible( false );
      }

      if ( editData === '' ) {
        dispatch( addTodoAction( todo ) );
        localStorage.setItem( 'todos', JSON.stringify( [ ...todos, todo ] ) );
        setAddPopupVisible( false );
      }

    } catch ( errorInfo ) {
      console.log( 'Form failed with errors info:', errorInfo );
    }
  };

  const closePopup = () => {
    setAddPopupVisible( false );
    setEditData( '' );
  };

  return (
    <div
      className="absolute add-todo bg-white w-full bottom-0 left-0 z-50 flex justify-center items-center pl-5 pr-5 border-t rounded-l-3xl rounded-r-3xl border-gray-200 ">
      <button className="close-add-todo absolute top-2 right-5" onClick={ closePopup }>
        <CloseCircleOutlined style={ { fontSize: '20px', color: '#1890ff' } }/></button>
      <Form form={ form } className="h-full w-full max-w-1/2 add-todo-form pt-20 pb-5 flex flex-col"
            style={ { paddingTop: '30px', paddingBottom: '20px' } } name="nest-messages"
            onFinish={ onFinish }
            layout="vertical"
            validateMessages={ validateMessages }>
        <Form.Item
          name={ [ 'task', 'task_name' ] }
          tooltip="Set a task name"
          label="Task name"
          size="large"
          initialValue={ editData !== '' && todos[ editData ] ? todos[ editData ].text : '' }
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <Input/>
        </Form.Item>
        <Form.Item label="Date"
                   name={ [ 'task', 'task_date' ] }
                   size="large"
                   rules={ [ { required: true, }, ] }>

          <DatePicker/>
        </Form.Item>
        <Form.Item label="Time"
                   size="large"
                   name={ [ 'task', 'task_time' ] }
                   rules={ [
                     {
                       required: true,
                     },
                   ] }>
          <TimePicker/>
        </Form.Item>
        <Button
          classNames={ [ 'bg-green-500', 'p-1.5', 'mt-4', 'rounded', 'pl-7', 'pr-7', 'text-white', 'rounded-full', 'transition', 'duration-200', 'hover:bg-green-600' ] }
          type="submit">
          { editData !== '' ? 'Edit todo' : 'Add todo' }
        </Button>
      </Form>
    </div>
  );
};

export default TodoAddPopup;
