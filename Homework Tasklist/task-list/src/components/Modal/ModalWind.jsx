import './ModalWind.css';

export default function ModalWind({ call, setIsModal, onRemoveTask }) {
  
  if (!call) return null;

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <i className="close" onClick={() => setIsModal(false)}>
          X
        </i>
        <h1>Видалити запис</h1>
        <div className="btns">
          <button className="accept" onClick={onRemoveTask}>Так, видалити</button>
          <button className="reject" onClick={() => setIsModal(false)}>
            Ні, залишити
          </button>
        </div>
      </div>
    </div>
  );
}
