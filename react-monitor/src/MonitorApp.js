import React from 'react';

import { SocketProvider } from './context/SocketContext';
import { UiProvider } from './context/UiContext';
import { RouterPageKMM } from './pages/router/RouterPageKMM';

export const MonitorApp = () => {
    return (
        <SocketProvider>
            <UiProvider>
                <RouterPageKMM />
            </UiProvider>
        </SocketProvider>
    )
}
