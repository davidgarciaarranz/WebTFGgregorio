import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Booking } from '../models/Booking';

const useBookings = () => {
    const addBooking = async (data: Booking): Promise<void> => {
        await addDoc(collection(db, 'booking'), {
            ...data,
            createdAt: serverTimestamp(),
            status: 'new'
        });
    };

    return { addBooking };
};

export default useBookings;