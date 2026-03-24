import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignApi } from '../services/campaignApi';
import { queryKeys } from '../config/queryKeys';

export function useCampaigns(initialFilters = {}) {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState(initialFilters);

    // Fixed: calling the queryKey function
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: queryKeys.campaigns.list(filters),
        queryFn: () => campaignApi.getAll(filters),
    });

    const createMutation = useMutation({
        mutationFn: campaignApi.create,
        onSuccess: () => {
            // Fixed: calling the queryKey function
            queryClient.invalidateQueries({ queryKey: queryKeys.campaigns.all() });
        }
    });

    return {
        // Handle both raw array or structured { items, total } response
        campaigns: data?.items || (Array.isArray(data) ? data : []),
        isLoading,
        error,
        filters,
        setFilters,
        refresh: refetch,
        createCampaign: createMutation.mutateAsync,
        isCreating: createMutation.isPending
    };
}
