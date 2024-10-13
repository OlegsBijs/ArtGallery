import React from 'react';

interface ArtPieceProps {
  objectNumber: string;
  title: string;
  artist: string;
  imageUrl: string;
  onClick: () => void;
}

const ArtPiece: React.FC<ArtPieceProps> = ({ title, artist, imageUrl, onClick }) => {
  return (
    <div onClick={onClick} className='art-piece'>
      <img src={imageUrl} alt={title} />
      <p><strong>{title}</strong></p>
      <p>by {artist}</p>
    </div>
  );
};

export default ArtPiece;
