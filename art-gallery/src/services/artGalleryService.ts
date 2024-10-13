import axios from 'axios';

const API_KEY = 'jv2KzLdF';
const BASE_URL = `https://www.rijksmuseum.nl/api/nl/collection`;

export interface ArtPieceData {
  id: string;
  title: string;
  principalOrFirstMaker: string;
  webImage: {
    url: string;
  };
}

export const fetchArtPieces = async (): Promise<ArtPieceData[]> => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&ps=3`);  // ps=3 fetches 3 art pieces
  return response.data.artObjects;
};
