export const detectUserLeaving = () => {
    return window.onbeforeunload = () => {
        console.log('lähtö');
    }
}