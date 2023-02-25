import { CircularProgress, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { capitalize } from '../helpers/capitalize';

export function RightSide({ link }) {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (link) {
      handleFetch(link);
    }
  }, [link]);

  const handleFetch = () => {
    setImageLoading(true);
    setLoading(true);
    fetch(link)
      .then(el => el.json())
      .then(el => {
        setPokemonData({
          name: el.name,
          image: el.sprites,
          abilities: el.abilities,
          types: el.types,
        });
      })
      .finally(() => setLoading(false));
  };

  const getImage = () => {
    const imagesArray = Object.values(pokemonData.image);
    for (const image of imagesArray) {
      if (image && typeof image === 'string') {
        return image;
      }
    }
  };

  const onImageLoading = () => {
    setImageLoading(false);
  };

  return (
    <>
      {link && (
        <div className="RightSide">
          {loading ? (
            <div className="ImageLoader">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              {imageLoading && (
                <div className="ImageLoader">
                  <CircularProgress color="success" />
                </div>
              )}

              {pokemonData?.image && getImage() && (
                <img
                  className="Image"
                  src={getImage()}
                  alt={pokemonData.name}
                  onLoad={onImageLoading}
                />
              )}

              <p>
                <span className="Bold">Name: </span>
                {pokemonData?.name && capitalize(pokemonData.name)}
              </p>
              <p>
                <span className="Bold">Abilities:</span>
              </p>
              <List>
                {pokemonData?.abilities &&
                  pokemonData.abilities.map(el => (
                    <ListItem key={el?.ability?.url}>{capitalize(el?.ability?.name)}</ListItem>
                  ))}
              </List>
              <p>
                <span className="Bold">Types:</span>
              </p>
              <List>
                {pokemonData?.types &&
                  pokemonData.types.map(el => (
                    <ListItem key={el?.type?.url}>{capitalize(el?.type?.name)}</ListItem>
                  ))}
              </List>
            </>
          )}
        </div>
      )}
    </>
  );
}
