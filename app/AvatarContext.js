// AvatarContext.js
import React, { createContext, useState, useContext } from "react";

// Create the Avatar Context
const AvatarContext = createContext();

// Avatar Provider to wrap around components
export const AvatarProvider = ({ children }) => {
  const [currentAvatar, setCurrentAvatar] = useState(
    require("../assets/images/oldWoman.png")
  ); // default avatar

  const handleImageChange = (image) => {
    setCurrentAvatar(image); // Function to update the avatar
  };

  return (
    <AvatarContext.Provider value={{ currentAvatar, handleImageChange }}>
      {children}
    </AvatarContext.Provider>
  );
};

// Custom hook to use Avatar Context
export const useAvatar = () => {
  return useContext(AvatarContext);
};
