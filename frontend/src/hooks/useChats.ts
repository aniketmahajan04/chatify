import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; }

const BASE_URL = "http://localhost:3000/chat";

const fetchChats = async () => {
    const res = await fetch(`${BASE_URL}/all`, { credentials: "include" });

    if(!res.ok) throw new Error("Failed to fetch chats");
    return res.json();
}

const createNewChat = async (receiverId: string) => {
    const res = await fetch(`${BASE_URL}/new`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ receiverId })
    });

    if(!res.ok) throw new Error("Failed to create chat");
    return res.json();
}

const removeChat = async (chatId: string) => {
    const res = await fetch(`${BASE_URL}/delete/${chatId}`, {
        method: "DELETE",
        credentials: "include",
    })

    if(!res.ok) throw new Error("Failed to delete chat");
    return res.json();
}
