import { useQuery } from "@tanstack/react-query";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/user/all", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      console.log("fetched users:", data);

      return data;
    },
  });
};
