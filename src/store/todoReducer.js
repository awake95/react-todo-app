
const defaultState = {
  todo: localStorage.getItem( 'todos' ) ? JSON.parse( localStorage.getItem( 'todos' ) ) : ''
};

const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SORT_TODO = 'SORT_TODO';
const DONE_TODO = 'DONE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
let newState,
    payload;

export const todoReducer = ( state = defaultState, action ) => {
  switch ( action.type ) {
    case ADD_TODO:
      return { todo: [ ...state.todo, action.payload ] };
    case EDIT_TODO:
      payload = action.payload;
      state.todo[action.payload.id] = payload.todo;
      localStorage.setItem( 'todos', JSON.stringify( [ ...state.todo ] ) );
      return {...state}
    case REMOVE_TODO:
      newState = { ...state, todo: state.todo.filter( todo => todo.id !== action.payload ) };
      localStorage.setItem( 'todos', JSON.stringify( [...newState.todo] ) );
      return newState;
    case SORT_TODO:
      payload = action.payload;
      const result = Array.from( payload.arr );
      const [ removed ] = result.splice( payload.currentIndex, 1 );
      result.splice( payload.droppedIndex, 0, removed );
      localStorage.setItem( 'todos', JSON.stringify( [ ...result ] ) );
      return { todo: result }
    case DONE_TODO:
      payload = action.payload
      state.todo[action.payload.index].done = payload.checked;
      return {...state}
    default:
      return { ...state, ...action };
  }
};

export const addTodoAction = ( payload ) => ( { type: ADD_TODO, payload } );
export const editTodoAction = ( payload ) => ( { type: EDIT_TODO, payload } );
export const removeTodoAction = ( payload ) => ( { type: REMOVE_TODO, payload } );
export const sortTodoAction = ( payload ) => ( { type: SORT_TODO, payload } );
export const doneTodoAction = ( payload ) => ( { type: DONE_TODO, payload } );
