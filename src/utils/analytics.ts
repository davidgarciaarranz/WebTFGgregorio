import ReactGA from "react-ga4";

const GA_ID = "G-76WL4QK6K8";

let initialized = false;

export const initGA = () => {
    if (initialized) return;

    ReactGA.initialize(GA_ID);
    initialized = true;
};

export const trackPageView = (path: string) => {
    if (!initialized) return;

    ReactGA.send({
        hitType: "pageview",
        page: path,
        title: document.title
    });
};