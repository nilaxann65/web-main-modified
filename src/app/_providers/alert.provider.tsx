"use client";

import React from "react";
import SnackbarMessage from "../_components/Snackbar/SnackbarMessage.components";

export default function AlertProvider({
    children
}: {
    children: React.ReactNode
}): JSX.Element {
    const [isOpen, setIsOpen] = React.useState(false)
    const [eventType, setTypeEvent] = React.useState('')

    const handleClose = (): void => {
        setIsOpen(false)
    }

    return (
        <div>
            {children}
            <SnackbarMessage
                open={isOpen}
                eventType={eventType}
                onClose={handleClose}
            />
        </div>
    );
}