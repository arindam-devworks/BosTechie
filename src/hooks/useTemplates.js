import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { emailTemplateApi } from '../services/emailTemplateApi';
import { whatsappTemplateApi } from '../services/whatsappTemplateApi';
import { queryKeys } from '../config/queryKeys';

export function useTemplates(channel = 'email') {
    const queryClient = useQueryClient();
    const isEmail = channel === 'email';

    // Fixed: Correctly referencing the nested queryKeys structure
    const queryKey = isEmail 
        ? queryKeys.templates.email.list() 
        : queryKeys.templates.whatsapp.list();

    const fetchFunc = isEmail ? emailTemplateApi.getAll : whatsappTemplateApi.getAll;
    const saveFunc = isEmail ? emailTemplateApi.create : whatsappTemplateApi.create;

    const { data, isLoading, error, refetch } = useQuery({
        queryKey,
        queryFn: fetchFunc,
    });

    const mutation = useMutation({
        mutationFn: saveFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        }
    });

    return {
        // Handle both raw array or structured { items, total } response
        templates: data?.items || (Array.isArray(data) ? data : []),
        isLoading,
        error,
        refresh: refetch,
        saveTemplate: mutation.mutateAsync,
        isSaving: mutation.isPending
    };
}
