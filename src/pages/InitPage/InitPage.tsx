import { useEffect, useState } from "react";
import portadaImg from "../../assets/images/portada.webp";
import "./InitPage.scss";

import Description from "../../components/DescriptionGeneral/DescriptionGeneral";
import Slider from "../../components/Slider/Slider";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { useInfo } from "../../context/InfoContext";
import BookingFormModal from "../../components/BookingFormModal/BookingFormModal";
import BookingButton from "../../components/Button/BookingButton/BookingButton";
import CallButton from "../../components/Button/CallButton/CallButton";
import ContactButton from "../../components/Button/ContactButton/ContactButton";

const images = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/4.webp",
    "/images/5.webp",
    "/images/6.webp",
    "/images/7.webp",
    "/images/8.webp",
    "/images/9.webp",
    "/images/10.webp",
    "/images/11.webp",
    "/images/12.webp",
    "/images/13.webp",
    "/images/14.webp",
];

const InitPage = () => {
    const { info, isLoading, hasError } = useInfo();
    const [ openBooking, setOpenBooking ] = useState(false);

    // SEO dinámico
    useEffect(() => {
        document.title = "Will Only Will";
        const descContent = "Will Only Will: DJ, mucho más que un DJ. Productor, creador de contenido exclusivo y contacto directo. Su estilo el EDM y Regueton";
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", descContent);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = descContent;
            document.head.appendChild(meta);
        }
    }, []);

    if (isLoading) return <div className="loading-state">Cargando...</div>;
    if (hasError) return <div className="loading-state">Error al cargar el contenido. Inténtalo de nuevo más tarde.</div>;

    return (
        <main id="init" className="container">
            <section>
                <img
                    className="imgAutor-1"
                    alt="Retrato de Will Only Will - Autor y Creativo"
                    src={portadaImg}
                    loading="eager"
                    fetchPriority="high"
                    width="1083"
                    height="609"
                />
            </section>

            <section className="description-container">
                <h1>Sobre mí</h1>
                <Description content={info?.description || ""} />
            </section>

            <section id="gallery">
                <h1>Galería</h1>
                <VideoPlayer
                    url={`https://www.youtube-nocookie.com/embed/${info?.videourl || ""}`}
                    visible={info?.videovisible || false}
                />
                <Slider images={images} />
            </section>

            <h1 id="contact-container">Contacto</h1>
            
            <BookingButton onClick={() => setOpenBooking(true)} />
            <BookingFormModal 
                isOpen={openBooking} 
                onClose={() => setOpenBooking(false)} 
                />
            <CallButton phone={info?.phone || ""} visible={info?.phonevisible || false} />
            <ContactButton mail={info?.mail || ""} />

        </main>
    );
};

export default InitPage;