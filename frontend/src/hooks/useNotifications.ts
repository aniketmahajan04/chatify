import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async ({ signal }) => {
      const res = await fetch("http://localhost:3000/user/notifications", {
        credentials: "include",
        signal,
      });
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const raw = await res.json();
      return raw.map((n: any) => ({
        id: n.id,
        sender: n.senderName ?? "Unknown",
        avatar: n.senderAvatar,
        message: "want to connect with you",
      }));
    },
    refetchInterval: 10000, // optional real-time refresh
  });
};
