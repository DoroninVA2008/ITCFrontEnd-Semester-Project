import React, { useState } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Длительность анимации закрытия
  };

  // Если модалка не открыта и не в процессе закрытия - не рендерим
  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen && !isClosing ? 'open' : isClosing ? 'close' : ''}`}
      style={{ display: isOpen || isClosing ? 'flex' : 'none' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        <h2 className="modal-title">Заявка отправлена!</h2>
        <p className="modal-description1 modal-descriptions">
          Спасибо за ваше предложение. Заявка успешно передана на модерацию.
        </p>
        <p className="modal-description2 modal-descriptions">
          Мы проверим корректность данных и содержимое загруженных материалов.
        </p>
        <p className="modal-description3 modal-descriptions">
          После рассмотрения вы получите уведомление:<br />
          в <u>Telegram</u> - на указанный вами username;<br />
          на электронную почту - на указанный email.
        </p>
        <p className="modal-description4 modal-descriptions">
          Статусы, о которых мы сообщим:
          <ul>
            <li>Заявка принята в работу.</li>
            <li>Заявка одобрена/не одобрена.</li>
            <li>Опубликовано.</li>
          </ul>
        </p>
        <p className="modal-description5 modal-descriptions">
          Вы можете закрыть это окно и продолжить работу с картой.
        </p>
        <div className="success-actions">
          <button className="submit-btn-active" onClick={handleClose}>
            Вернуться к карте
          </button>
        </div>
      </div>
    </div>
  );
};