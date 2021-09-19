import "tailwindcss/tailwind.css"
import Todo from './components/ToDo/Todo';

const App = () => {
  return (
       <div className='max-w-full max-h-full h-screen flex justify-center items-center bg-blue-50'>
         <Todo/>
       </div>
  );
}

export default App;
