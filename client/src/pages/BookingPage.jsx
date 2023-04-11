import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  return <div>Bookingpage: {id}</div>;
};

export default BookingPage;
