import { useEffect, useCallback } from 'react';
import { useBlocker } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export default function useUnsavedChanges(isDirty) {
    const { confirm } = useModal();

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (blocker.state === 'blocked') {
            const handleConfirm = async () => {
                const confirmed = await confirm({
                    title: 'Discard Changes?',
                    message: 'You have unsaved changes. Leaving this sector will initialize data loss.',
                    confirmText: 'Discard',
                    cancelText: 'Stay',
                    type: 'danger'
                });

                if (confirmed) {
                    blocker.proceed();
                } else {
                    blocker.reset();
                }
            };

            handleConfirm();
        }
    }, [blocker, confirm]);

    // Browser close/reload handling
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    return blocker;
}
