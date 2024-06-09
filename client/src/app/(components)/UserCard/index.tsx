import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

interface UserProps {
  user: User;
}

const UserCard: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="p-4 border rounded shadow flex items-center">
      {user.profilePictureUrl && (
        <Image
          src={`/p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
