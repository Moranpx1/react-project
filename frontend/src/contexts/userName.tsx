import React, { createContext, useState, useEffect } from "react";

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
  const [userName, setUserName] = useState<string>(() => {
    // Get the stored userName from sessionStorage on component mount
    const storedUserName = sessionStorage.getItem("userName");
    return storedUserName || "";
  });

  useEffect(() => {
    // Save the userName to sessionStorage
    sessionStorage.setItem("userName", userName);
  }, [userName]);

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UserNameProvider };