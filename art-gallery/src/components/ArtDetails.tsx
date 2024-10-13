import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

const API_KEY = 'jv2KzLdF';

interface ArtDetailsData {
  title: string;
  principalOrFirstMaker: string;
  webImage: {
    url: string;
  };
  description: string;
}

const ArtDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // id corresponds to the objectNumber
  const navigate = useNavigate();
  const [artDetails, setArtDetails] = useState<ArtDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=${API_KEY}`
        );
        setArtDetails(response.data.artObject);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching art details:', error);
        setLoading(false);
      }
    };

    fetchArtDetails();
  }, [id]);

  if (loading) {
    return <div className='loader-container'><BounceLoader color='#3498db'loading={loading} size={60} /></div>;
  }

  if (!artDetails) {
    return <p>No details found for this artwork.</p>;
  }

  return (
    <div className='art-details'>
      <h1>{artDetails.title}</h1>
      <img src={artDetails.webImage.url} alt={artDetails.title} />
      <p>{artDetails.description || 'No description available.'}</p>
      <p>by {artDetails.principalOrFirstMaker}</p>
      <button onClick={() => navigate('/')}>Back to Gallery</button>
    </div>
  );
};

export default ArtDetails;
