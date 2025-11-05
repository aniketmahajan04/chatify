import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (receiverId: string) => {
            const res = await fetch(
                "http://localhost:3000/user/notifications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ receiverId }),
                },
            );

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to send request");
            }

            const data = await res.json();
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
    });
};
