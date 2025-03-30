import React, { createContext, useState, useContext } from "react";

// Create the context
const AvatarContext = createContext();

// Custom hook to use the context
export function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
}

// Provider component
export function AvatarProvider({ children }) {
  const [currentAvatar, setCurrentAvatar] = useState(
    require("../assets/images/oldWoman.png")
  );

  return (
    <AvatarContext.Provider value={{ currentAvatar, setCurrentAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}
