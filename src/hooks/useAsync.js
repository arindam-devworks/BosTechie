import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Generic hook for managing asynchronous API state
 * @param {Function} asyncFunction The service method to execute
 * @param {boolean} immediate Whether to execute immediately
 */
export function useAsync(asyncFunction, immediate = false) {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { error: showErrorToast } = useToast();

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(
        async (...args) => {
            setStatus('pending');
            setData(null);
            setError(null);

            try {
                const response = await asyncFunction(...args);
                setData(response);
                setStatus('success');
                return response;
            } catch (err) {
                setError(err);
                setStatus('error');
                showErrorToast(err.message || 'An unexpected error occurred');
                throw err;
            }
        },
        [asyncFunction, showErrorToast]
    );

    // TODO: if immediate === true, trigger execute early inside a useEffect

    return { execute, status, data, error, isLoading: status === 'pending' };
}
