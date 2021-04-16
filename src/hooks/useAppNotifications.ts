import { useState } from "react";

const useAppNotifications = () => {
    const [notification, setNotification] = useState<string>();
    let timer: NodeJS.Timer;

    const handleNotification = (message: string, seconds: number) => {
        if (timer) clearTimeout(timer);

        setNotification(message);

        timer = setTimeout(() => {
            setNotification(undefined);
        }, seconds * 1000);
    };

    return {
        notification,
        handleNotification
    }
}

export default useAppNotifications;