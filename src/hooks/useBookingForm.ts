import { useState, useEffect } from 'react';
import type { Booking } from '../models/Booking';
import { validateBookingStep } from '../utils/bookingValidation';
import useBookings from '../services/useBookings';

const TOTAL_STEPS = 7;

const INITIAL_DATA: Booking = {
  name: '',
  email: '',
  phone: '',
  date: '',
  location: '',
  eventType: 'Boda',
  details: ''
};

const useBookingForm = (isOpen: boolean) => {
  const { addBooking } = useBookings();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Booking>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData(INITIAL_DATA);
      setIsSuccess(false);
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleNext = () => {
    const stepError = validateBookingStep(step, formData);
    if (stepError) { setError(stepError); return; }
    setDirection('next');
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setDirection('prev');
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const stepError = validateBookingStep(step, formData);
    if (stepError) { setError(stepError); return; }

    setIsSubmitting(true);
    setError('');

    try {
      await addBooking(formData);
      setIsSuccess(true);
    } catch (err) {
      setError('Hubo un error al enviar tu solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return {
    step,
    formData,
    isSubmitting,
    isSuccess,
    error,
    direction,
    progress,
    TOTAL_STEPS,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit
  };
};

export default useBookingForm;