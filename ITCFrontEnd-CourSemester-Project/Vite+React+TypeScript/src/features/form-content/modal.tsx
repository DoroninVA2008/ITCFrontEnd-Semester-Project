import React, { useState, useRef, useEffect } from 'react'
import { ContactModal, type ContactEventPayload } from './contac'
import './modal.scss'

interface SuggestEventModalProps {
  isOpen: boolean
  onClose: () => void
  onReset?: () => void
}

export const SuggestEventModal: React.FC<SuggestEventModalProps> = ({ isOpen, onClose }) => {
  const [zipFile, setZipFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [eventName, setEventName] = useState('')
  const [eventPayload, setEventPayload] = useState<ContactEventPayload | null>(null)
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formApiUrl = 'https://155-212-132-55.sslip.io/api/requests/create-request';

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  
  const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventType(e.target.value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setZipFile(e.target.files[0]);
    } else {
      setZipFile(null);
    }
  };

  // Следим за заполненными значениями на их изменение
  useEffect(() => {
    const isValid = name.trim() !== ''
      && date.trim() !== ''
      && description.trim() !== ''
      && eventType !== null
      && zipFile !== null;
    setIsFormValid(isValid);
  }, [name, date, description, eventType, zipFile]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert('Заполните все поля, и добавьте файл.');
      return;
    }
    
    if (!formRef.current) return
    
    const form = formRef.current
    const nameVal = (form.elements.namedItem('name') as HTMLInputElement).value
    setEventName(nameVal)

    setEventPayload({
      name,
      date,
      description,
      eventType: eventType!,
      zipFile: zipFile!,
    })

    onClose()
    setTimeout(() => setShowSuccessModal(true), 300)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const handleCloseMainModal = () => {
    onClose()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      
      // Проверяем, что это ZIP файл
      if (file.type === 'application/zip' || 
          file.name.endsWith('.zip') || 
          file.type === 'application/x-zip-compressed') {
        
        setZipFile(file)
        
        // Обновляем value в скрытом input для валидации
        if (fileInputRef.current) {
          // Создаем новый FileList объект (это сложно сделать программно)
          // Поэтому просто отметим, что файл загружен через стейт
          // и уберем required атрибут или будем валидировать по состоянию
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current.files = dataTransfer.files;
        }
      } else {
        alert('Пожалуйста, загрузите файл формата .zip')
        setZipFile(null)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setZipFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const UploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
      <path d="M41 34.1667V64.9167M41 34.1667L51.25 44.4167M41 34.1667L30.75 44.4167M59.7917 51.25C64.9816 51.25 68.3333 47.0441 68.3333 41.8542C68.3332 39.7995 67.6595 37.8014 66.4154 36.1661C65.1713 34.5308 63.4255 33.3484 61.4453 32.8C61.1407 28.9681 59.5525 25.3509 56.9377 22.5332C54.3228 19.7156 50.8341 17.8622 47.0356 17.2727C43.237 16.6832 39.3506 17.3921 36.0048 19.2847C32.659 21.1773 30.0492 24.143 28.5975 27.7023C25.541 26.8551 22.2732 27.2567 19.5128 28.8189C16.7525 30.381 14.7258 32.9757 13.8785 36.0322C13.0313 39.0886 13.4329 42.3565 14.995 45.1168C16.5572 47.8772 19.1519 49.9039 22.2083 50.7512" stroke="#C09139" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleCloseMainModal}>×</button>

          <h2 className="modal-title">Добавление события</h2>
          <p className="modal-description">Заполните форму, чтобы отправить заявку на добавление вашего события. <br /> После модерации вам придёт уведомление о результате.</p>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Название события</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Введите название события"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Дата события</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  placeholder="ДД.ММ.ГГГГ"
                  required
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Описание события</label>
              <textarea
                id="description"
                name="description"
                placeholder="Кратко опишите событие"
                required
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>

            <div className="form-group">
              <label>Тип события</label>
              <div className="event-type-radios">
                <label className="radio-button" tabIndex={0} onFocus={(e) => {
                  e.currentTarget.classList.add('focused');
                }}
                onBlur={(e) => {
                  e.currentTarget.classList.remove('focused');
                }}>
                  <input type="radio" name="eventType" value="political" 
                    onChange={handleEventTypeChange} required />
                    <span className="radio-custom-label">Политическое событие</span>
                    <span className="radio-circle"></span>
                </label>
                <label className="radio-button" tabIndex={0} onFocus={(e) => {
                  e.currentTarget.classList.add('focused');
                }}
                onBlur={(e) => {
                  e.currentTarget.classList.remove('focused');
                }}>
                  <input type="radio" name="eventType" value="military"
                    onChange={handleEventTypeChange} required />
                  <span className="radio-custom-label">Военное событие</span>
                  <span className="radio-circle"></span>
                </label>
              </div>
            </div>

            <div className="form-group file-upload-wrapper">
              <label htmlFor="file-upload-input" className="file-upload-label">Загрузка ZIP-архива</label>
              <div
                className={`drop-zone ${isDragging ? 'is-dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {UploadIcon}
                <p className="drop-zone-text">Выберите файл или перетащите его сюда.</p>
                <p className="file-format-info">Допустимый формат: .zip</p>
                <input
                  type="file"
                  id="file-upload-input"
                  // name="zipUpload"
                  accept=".zip"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  required
                />
                <button type="button" onClick={handleBrowseClick} className="browse-files-button">
                  Обзор файлов
                </button>
              </div>
            </div>

            {zipFile && (
              <p className="uploaded-file-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 20 20" fill="none">
                  <path d="M11.25 2.5L15.8333 7.08333V16.6667C15.8333 17.125 15.4583 17.5 15 17.5H4.99999C4.54166 17.5 4.16666 17.125 4.16666 16.6667V3.33333C4.16666 2.875 4.54166 2.5 4.99999 2.5H11.25Z" stroke="#C09139" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 2.91663V6.66663H15.4167L11.6667 2.91663Z" fill="black" stroke="#C09139" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a>{zipFile.name}</a>
                <a
                  className="remove-file-button"
                  onClick={handleRemoveFile}
                  aria-label="Удалить файл"
                >
                  ×
                </a>
              </p>
            )}
            
            <button
              type="submit"
              className={`submit-btn final-submit-btn ${
                isFormValid ? 'with-background' : ''
              }`}
              disabled={!isFormValid}
            >
              Далее
            </button>
          </form>
        </div>
      </div>
      
      {eventPayload && (
        <ContactModal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          eventName={eventName}
          formApiUrl={formApiUrl}
          eventPayload={eventPayload}
          onSuccess={() => {
            // setIsSecondOpen(true);
          }}
        />
      )}
    </>
  )
}