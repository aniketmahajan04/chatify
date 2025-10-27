import { useState } from "react";
import { X, Search, UserPlus, Check } from "lucide-react";

interface CreateGroupDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  users: { id: number; name: string; avatar: string; bio: string }[];
  onCreate: (group: { name: string; members: any[] }) => void;
}

export const CreateGroupDrawer = ({
  isOpen,
  onClose,
  users,
  onCreate,
}: CreateGroupDrawerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [groupName, setGroupName] = useState("");

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleUser = (user: any) => {
    setSelectedUsers((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) return alert("Please enter a group name");
    if (selectedUsers.length < 2)
      return alert("Select at least two users to create a group");
    onCreate({ name: groupName, members: selectedUsers });
    setGroupName("");
    setSelectedUsers([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="w-full sm:w-[400px] bg-[#18181B] h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A]">
          <h2 className="text-lg font-semibold text-white">Create New Group</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Group Name */}
        <div className="p-4 border-b border-[#27272A]">
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full bg-[#27272A] text-white rounded-xl px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#27272A] mx-4 rounded-xl px-3 py-2 mt-3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto mt-3">
          {filteredUsers.map((user) => {
            const isSelected = selectedUsers.some((u) => u.id === user.id);
            return (
              <div
                key={user.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-[#27272A] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.bio}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleUser(user)}
                  className={`p-2 rounded-full border ${
                    isSelected
                      ? "bg-green-600 border-green-600"
                      : "border-gray-600 hover:bg-[#27272A]"
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <UserPlus className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Members */}
        {selectedUsers.length > 0 && (
          <div className="p-4 border-t border-[#27272A]">
            <p className="text-sm text-gray-400 mb-2">Selected Members:</p>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 bg-[#27272A] px-3 py-1 rounded-full"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-white">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Button */}
        <div className="p-4 border-t border-[#27272A]">
          <button
            onClick={handleCreateGroup}
            className="w-full bg-[#2563EB] text-white py-2 rounded-xl hover:bg-[#1D4ED8] transition-all"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};
