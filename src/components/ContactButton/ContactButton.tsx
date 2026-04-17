import "./ContactButton.scss";

interface ContactButtonProps {
    mail: string;
}

const ContactButton = ({ mail }: ContactButtonProps) => {

    const enviarMail = () => {
        const asunto = "¡Hola Will, quiero ponerme en contacto contigo!";
        const cuerpo = "Hola Will,";
        const mailtoLink = `mailto:${mail}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        window.open(mailtoLink, "_blank");
    };

    return (
        <section id="contact" className="contactame">
            <button
                className="glowing-btn"
                onClick={enviarMail}
                aria-label="Enviar correo electrónico a Will Only Will"
            >
                <span className="glowing-txt">
                    <><span className="faulty-letter">✉</span> ¿ Hab<span className="faulty-letter">la<span className="faulty-letter"></span>mo</span>s ?</>
                </span>
            </button>
        </section>
    );
};

export default ContactButton;