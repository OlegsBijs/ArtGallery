import React, { createContext, useState, ReactNode } from 'react';

interface ArtPieceData {
  objectNumber: string;
  title: string;
  principalOrFirstMaker: string;
  webImage: {
    url: string;
  };
}

interface ArtContextProps {
  artPieces: ArtPieceData[];
  setArtPieces: React.Dispatch<React.SetStateAction<ArtPieceData[]>>;
}

export const ArtContext = createContext<ArtContextProps | undefined>(undefined);

export const ArtProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [artPieces, setArtPieces] = useState<ArtPieceData[]>([]);

  return (
    <ArtContext.Provider value={{ artPieces, setArtPieces }}>
      {children}
    </ArtContext.Provider>
  );
};
