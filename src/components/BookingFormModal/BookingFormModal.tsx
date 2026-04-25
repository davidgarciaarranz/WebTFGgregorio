import React, { useEffect } from 'react';
import useBookingForm from '../../hooks/useBookingForm';
import './BookingFormModal.scss';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({ isOpen, onClose }) => {
  const {
    step, formData, isSubmitting, isSuccess,
    error, direction, progress, TOTAL_STEPS,
    handleChange, handleNext, handlePrev, handleSubmit
  } = useBookingForm(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('booking-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="booking-modal-overlay" onClick={handleOverlayClick}>
      <div className="booking-modal-container">
        <button className="booking-modal-close" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>

        {isSuccess ? (
          <div className="booking-success-message">
            <div className="success-icon">🎵</div>
            <h2>Solicitud enviada</h2>
            <p>Te responderemos lo antes posible.</p>
            <button className="booking-btn-primary" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <div className="booking-modal-header">
              <div className="booking-progress-text">Paso {step} de {TOTAL_STEPS}</div>
              <div className="booking-progress-bar">
                <div className="booking-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="booking-modal-body">
              <div className={`booking-step-container ${direction}`}>

                {step === 1 && (
                  <div className="booking-step slide-in">
                    <h3>¿Cómo te llamas?</h3>
                    <input type="text" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Tu nombre completo"
                      autoFocus className="booking-input" />
                  </div>
                )}
                {step === 2 && (
                  <div className="booking-step slide-in">
                    <h3>Tu email</h3>
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="correo@ejemplo.com"
                      autoFocus className="booking-input" />
                  </div>
                )}
                {step === 3 && (
                  <div className="booking-step slide-in">
                    <h3>Teléfono</h3>
                    <input type="text" name="phone" 
                    inputMode="numeric"
                    value={formData.phone}
                      onChange={handleChange} placeholder="+34 600 000 000"
                      autoFocus className="booking-input" />
                  </div>
                )}
                {step === 4 && (
                  <div className="booking-step slide-in">
                    <h3>Fecha del evento</h3>
                    <input type="date" name="date" value={formData.date}
                      onChange={handleChange} className="booking-input" />
                  </div>
                )}
                {step === 5 && (
                  <div className="booking-step slide-in">
                    <h3>Lugar / Ciudad</h3>
                    <input type="text" name="location" value={formData.location}
                      onChange={handleChange} placeholder="Ej. Madrid, Finca Los Olivos..."
                      autoFocus className="booking-input" />
                  </div>
                )}
                {step === 6 && (
                  <div className="booking-step slide-in">
                    <h3>Tipo de evento</h3>
                    <select name="eventType" value={formData.eventType}
                      onChange={handleChange} className="booking-input booking-select">
                      <option value="Boda">Boda</option>
                      <option value="Discoteca">Discoteca</option>
                      <option value="Evento privado">Evento privado</option>
                      <option value="Cumpleaños">Cumpleaños</option>
                      <option value="Empresa">Empresa</option>
                      <option value="Festival">Festival</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                )}
                {step === 7 && (
                  <div className="booking-step slide-in">
                    <h3>Cuéntanos detalles importantes</h3>
                    <p className="booking-hint">Invitados, horario, necesidades técnicas, etc.</p>
                    <textarea name="details" value={formData.details}
                      onChange={handleChange} placeholder="Escribe aquí los detalles..."
                      className="booking-input booking-textarea" rows={4} />
                  </div>
                )}
              </div>

              {error && <div className="booking-error">{error}</div>}
            </div>

            <div className="booking-modal-footer">
              {step > 1
                ? <button className="booking-btn-secondary" onClick={handlePrev} disabled={isSubmitting}>Atrás</button>
                : <div />
              }
              {step < TOTAL_STEPS
                ? <button className="booking-btn-primary" onClick={handleNext}>Siguiente</button>
                : <button className="booking-btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingFormModal;