import { useRef, useState, MouseEvent, KeyboardEvent, useEffect } from "react";

const useDropDownMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuAnchorRef = useRef<HTMLButtonElement>(null);
    const previousOpen = useRef(menuOpen);

    const toggleMenu = () => {
        setMenuOpen(previous => !previous);
    }

    const closeMenu = () => setMenuOpen(false);

    const handleMenuClose = (event: MouseEvent<EventTarget>) => {
        if (menuAnchorRef.current && menuAnchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setMenuOpen(false);
    }

    const handleListKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        if (previousOpen.current && !menuOpen) {
            menuAnchorRef.current!.focus();
        }

        previousOpen.current = menuOpen;
    }, [menuOpen]);

    return {
        menuOpen,
        menuAnchorRef,
        previousOpen,
        toggleMenu,
        handleMenuClose,
        handleListKeyDown,
        closeMenu
    }
}

export default useDropDownMenu;