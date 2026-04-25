import "../Button.scss";

type BookingButtonProps = {
    onClick: () => void;
};

const BookingButton = ({ onClick } : BookingButtonProps) => {
    return (
        <section id="booking-trigger" className="reservar-fecha">
            <button
                className="glowing-btn"
                onClick={onClick}
                aria-label="Abrir formulario de reserva"
            >
                <span className="glowing-txt">
                    <span className="faulty-letter">📅</span> RES
                    <span className="faulty-letter">ERVA</span>R FEC
                    <span className="faulty-letter">HA</span>
                </span>
            </button>
        </section>
    );
};

export default BookingButton;