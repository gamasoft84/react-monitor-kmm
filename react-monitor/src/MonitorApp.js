import React from 'react';

import { UiProvider } from './context/UiContext';
import { RouterPageKMM } from './pages/router/RouterPageKMM';

export const MonitorApp = () => {
    return (
            <UiProvider>
                <RouterPageKMM />
            </UiProvider>
    )
}
