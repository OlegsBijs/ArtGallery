import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtContext } from '../context/ArtContext';
import '../App.css';
import { BounceLoader } from 'react-spinners';


const Gallery: React.FC = () => {
  const { artPieces, setArtPieces } = useContext(ArtContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const API_KEY = 'jv2KzLdF';
  const COLLECTION_URL = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&ps=100`;

  // Function to fetch art data from API
  const fetchArtPieces = React.useCallback(async () => {
    console.log("art pieces fetched");
    setIsLoading(true);
    try {
      const response = await fetch(COLLECTION_URL);
      const data = await response.json();
  
      if (data.artObjects && data.artObjects.length > 0) {
        const shuffledArt = data.artObjects.sort(() => 0.5 - Math.random()).slice(0, 3);
        setArtPieces(shuffledArt);
      } else {
        setArtPieces([]);
      }
    } catch (error) {
      console.error("Failed to fetch art pieces:", error);
    }
    setIsLoading(false);
  }, [COLLECTION_URL, setArtPieces]); // dependencies
  

  // Fetch art pieces only if there are none in the context
  useEffect(() => {
    if (artPieces.length === 0) {
      fetchArtPieces();
    } else {
      setIsLoading(false);
    }
  }, [artPieces.length, fetchArtPieces]);
  

  return (
    <div className='gallery-container'>
      <h1 className='gallery-title'>Art Gallery</h1>
      <button onClick={fetchArtPieces} className='shuffle-button'>
        Shuffle Art
      </button>

      {isLoading ? (
      <div className='loader-container'>
        <BounceLoader color='#3498db'loading={isLoading} size={60} />
      </div>
    ) : (
        <div className='gallery'>
          {artPieces.length > 0 ? (
            artPieces.map((artPiece) => (
              <div className='art-piece' key={artPiece.objectNumber}>
                <Link to={`/art/${artPiece.objectNumber}`}>
                  <img src={artPiece.webImage.url} alt={artPiece.title} />
                  <h3>{artPiece.title}</h3>
                  <p>{artPiece.principalOrFirstMaker}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No art pieces found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
