import { useRef } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ModalWind from './Modal/ModalWind';
import { useContext } from 'react';
import Context from '../context/Context';

const Item = ({ id, title, status, addTime}) => {
  const [checked, setChecked] = useState(status);
  const classes = ['todo'];
  const checkbox = useRef();
  const editField = useRef();
  const editFieldInput = useRef();
  const [isModal, setIsModal] = useState(false);
  const values = useContext(Context);

  if (checked) {
    classes.push('status');
  }

  const updateStatus = () => {
    setChecked(!checked);
    values.setTasks((prev) => {
      let newArr = [...prev];
      newArr.map((el) => {
        if (el.id === id) {
          el.status = !checked;
        }
      });
      return newArr;
    });
    values.setCounter(prev => checkbox.current.checked? prev - 1 : prev + 1);
  };

  const removeTask = () => {
    values.setTasks(values.tasks.filter((el) => el.id !== id));
    values.setCounter(prev => prev - 1);
  };

  const displayEditField = () => {
    editField.current.classList.toggle('none');
  };

  const editTask = (e) => {
    if (e.key === 'Enter' && values.editTaskTitle) {
      values.setTasks([
        ...values.tasks.filter((el) => el.id !== id),
        {
          id: uuidv4(),
          title: values.editTaskTitle,
          status: false,
          addTime: `${values.hours}:${values.minutes}:${values.seconds}`
        },
      ]);
      values.setEditTaskTitle('');
    }
  };

  return (
    <>
    <li className={classes.join(' ')}>
      <ModalWind call={isModal} setIsModal={setIsModal} onRemoveTask={removeTask}/>
      <label>
        <input type="checkbox" ref={checkbox} checked={checked} onChange={updateStatus} />
        <span>{title}</span>
        <span style={{paddingLeft: "20px"}}>{addTime}</span>
      </label>
      <button onClick={displayEditField}>Edit</button>
      <i className="material-icons red-text" onClick={() => setIsModal(true)}>
        X
      </i>
    </li>
    <div className="edit-field none" ref={editField}>
    <input ref={editFieldInput}
      type="text"
      value={values.editTaskTitle}
      onChange={(e) => values.setEditTaskTitle(e.target.value)}
      onKeyDown={editTask}
    />
    <label className={values.editTaskTitle && 'none'}>Task name</label>
  </div>
  </>
  );
};

export default Item;
