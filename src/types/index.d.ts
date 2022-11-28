export {};
declare global {
    // Added to make gtag available for gtag update function with cookie consent
    // eslint-disable-next-line no-unused-vars
    interface Window {
        gtag: Function
    }
}