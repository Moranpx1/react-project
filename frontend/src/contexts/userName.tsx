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
  //Set userName from sessionStorage so page reloading won't delete it 
  const [userName, setUserName] = useState<string>(sessionStorage.getItem("userName") || "");

  // Update sessionStorage whenever userName changes
  useEffect(() => {
    sessionStorage.setItem("userName", userName);
  }, [userName]);

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};


export { UserNameContext, UserNameProvider };