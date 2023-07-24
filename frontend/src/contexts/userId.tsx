import React, { createContext, useState } from "react";

interface UserIdContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const initialUserIdContext: UserIdContextType = {
  userId: "",
  setUserId: () => {},
};

const UserIdContext = createContext<UserIdContextType>(initialUserIdContext);

interface UserIdProviderProps {
  children: React.ReactNode;
}

const UserIdProvider: React.FC<UserIdProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>("");

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export { UserIdContext, UserIdProvider };
