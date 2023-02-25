import { useEffect, useState } from 'react';
import { List, ListItem, Button, CircularProgress } from '@mui/material';
import { capitalize } from '../helpers/capitalize';

export function LeftSide({ itemClick }) {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetch();
  }, [page]);

  const handleFetch = () => {
    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page}`)
      .then(el => el.json())
      .then(el => {
        setPokemonList(el.results);
        if (!pokemonList.length) {
          setMaxPage(Math.floor(el.count));
        }
      })
      .finally(() => setLoading(false));
  };

  const nextClick = () => setPage(prevState => prevState + 12);

  const prevClick = () => setPage(prevState => prevState - 12);

  return (
    <div className="LeftSide">
      {loading ? (
        <div className="Loader">
          <CircularProgress />
        </div>
      ) : (
        <List className="List">
          {pokemonList.map(el => (
            <ListItem button className="ListItem" key={el.url} onClick={() => itemClick(el.url)}>
              {el?.name && capitalize(el.name)}
            </ListItem>
          ))}
        </List>
      )}
      <div className="ButtonContainer">
        <Button disabled={!page} onClick={prevClick}>
          Prev
        </Button>
        <Button disabled={page + 12 > maxPage} onClick={nextClick}>
          Next
        </Button>
      </div>
    </div>
  );
}
