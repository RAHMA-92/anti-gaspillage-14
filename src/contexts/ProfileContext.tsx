
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: File | null;
  avatarUrl?: string;
  registrationDate?: string;
  isLoggedIn?: boolean;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  saveProfile: () => Promise<boolean>;
  clearProfile: () => void;
  isProfileEmpty: boolean;
  registerUser: (userData: Partial<ProfileData>) => void;
  loginUser: (userData: Partial<ProfileData>) => void;
  logoutUser: () => void;
  isLoggedIn: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        return {
          ...parsedData,
          isLoggedIn: parsedData.isLoggedIn || false
        };
      } catch (error) {
        console.error('Error parsing saved profile data:', error);
      }
    }
    return {
      name: "",
      email: "",
      phone: "",
      city: "",
      avatar: null,
      avatarUrl: "",
      isLoggedIn: false
    };
  });

  const isProfileEmpty = !profileData.name && !profileData.email;
  const isLoggedIn = profileData.isLoggedIn || false;

  // Save to localStorage whenever profile changes
  useEffect(() => {
    if (profileData.name || profileData.email) {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
    }
  }, [profileData]);

  const registerUser = (userData: Partial<ProfileData>) => {
    const newUserData = {
      ...profileData,
      ...userData,
      registrationDate: new Date().toISOString(),
      isLoggedIn: true
    };
    
    // Handle avatar URL creation if avatar file exists
    if (userData.avatar && userData.avatar instanceof File) {
      const avatarUrl = URL.createObjectURL(userData.avatar);
      newUserData.avatarUrl = avatarUrl;
    }
    
    setProfileData(newUserData);
    localStorage.setItem('userProfile', JSON.stringify(newUserData));
  };

  const loginUser = (userData: Partial<ProfileData>) => {
    const updatedData = {
      ...profileData,
      ...userData,
      isLoggedIn: true
    };
    setProfileData(updatedData);
    localStorage.setItem('userProfile', JSON.stringify(updatedData));
  };

  const logoutUser = () => {
    setProfileData(prev => ({
      ...prev,
      isLoggedIn: false
    }));
    localStorage.setItem('userProfile', JSON.stringify({
      ...profileData,
      isLoggedIn: false
    }));
  };

  const updateProfile = (data: Partial<ProfileData>) => {
    // Handle avatar URL creation if avatar file exists
    if (data.avatar && data.avatar instanceof File) {
      const avatarUrl = URL.createObjectURL(data.avatar);
      data.avatarUrl = avatarUrl;
    }
    
    setProfileData(prev => ({ 
      ...prev, 
      ...data,
      isLoggedIn: prev.isLoggedIn || false
    }));
  };

  const saveProfile = async (): Promise<boolean> => {
    try {
      // Simuler une sauvegarde API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      console.log("Profile saved:", profileData);
      
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      return false;
    }
  };

  const clearProfile = () => {
    setProfileData({
      name: "",
      email: "",
      phone: "",
      city: "",
      avatar: null,
      avatarUrl: "",
      isLoggedIn: false
    });
    localStorage.removeItem('userProfile');
  };

  return (
    <ProfileContext.Provider value={{
      profileData,
      updateProfile,
      saveProfile,
      clearProfile,
      isProfileEmpty,
      registerUser,
      loginUser,
      logoutUser,
      isLoggedIn
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
