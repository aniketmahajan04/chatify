import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async ({ signal }) => {
            const res = await fetch(
                "http://localhost:3000/user/notifications",
                {
                    credentials: "include",
                    signal,
                },
            );
            if (!res.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const raw = await res.json();
            return raw.map((n: any) => ({
                id: n.id,
                senderId: n.senderId,
                senderClerkId: n.senderClerkId,
                senderName: n.senderName ?? "Unknown",
                avatar: n.senderAvatar,
                message: "want to connect with you",
            }));
        },
        refetchInterval: 10000, // optional real-time refresh
    });
};

const updateNotificationApi = async ({
    id,
    status,
}: {
    id: string;
    status: "ACCEPTED" | "REJECTED";
}) => {
    const res = await fetch(`http://localhost:3000/user/notifications/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Failed to update notification");
    return res.json();
};

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNotificationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};
