import type { Booking } from '../models/Booking';

export const validateBookingStep = (step: number, formData: Booking) => {

    switch (step) {

        case 1:
            if (!formData.name.trim()) return 'Por favor, introduce tu nombre.';
            break;
        case 2:
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email.trim() || !emailRegex.test(formData.email))
                return 'Por favor, introduce un email válido.';
            break;
        case 3:
            if (!formData.phone.trim()) return 'Por favor, introduce tu teléfono.';
            if (formData.phone.length < 9 || (!/^[0-9+]+$/.test(formData.phone)))
                return 'Por favor, introduce un teléfono válido.';
            break;
        case 4:
            if (!formData.date) return 'Por favor, selecciona una fecha.';
            //fecha superior a la de hoy
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selected = new Date(formData.date);
            if (selected <= today) return 'Por favor, selecciona una fecha válida.';
            break;
        case 5:
            if (!formData.location.trim()) return 'Por favor, introduce el lugar o ciudad.';
            break;
        case 6:
            if (!formData.eventType) return 'Por favor, selecciona el tipo de evento.';
            break;
    }
}