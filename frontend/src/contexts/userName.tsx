import React, { createContext, useState } from "react";

interface UserNameContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const initialUserNameContext: UserNameContextType = {
  userName: "",
  setUserName: () => {},
};

const UserNameContext = createContext<UserNameContextType>(
  initialUserNameContext
);

interface UserNameProviderProps {
  children: React.ReactNode;
}

const UserNameProvider: React.FC<UserNameProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>("");

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UserNameProvider };
