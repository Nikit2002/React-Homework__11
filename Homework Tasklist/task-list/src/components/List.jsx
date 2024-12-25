import { useContext } from 'react';
import Item from './Item';
import Context from '../context/Context';

const List = () => {
  const values = useContext(Context);
  return (
    <ul>
      {values.tasks.map((task) => (
        <Item key={task.id} {...task}/>
      ))}
    </ul>
  );
};

export default List;
