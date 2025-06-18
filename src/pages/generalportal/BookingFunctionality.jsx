import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/bookingSlice';

export default function BookingPage() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  const onSubmit = (data) => {
    const booking = {
      id: Date.now().toString(),
      mentorId: id,
      userName: user?.name,
      ...data,
      status: 'pending',
    };
    dispatch(createBooking(booking));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Book a Session</h2>
      <Input label="Preferred Date" type="date" {...register('date')} required />
      <Input label="Notes" {...register('notes')} />
      <Button type="submit" className="mt-4">Submit Booking</Button>
    </form>
  );
}
