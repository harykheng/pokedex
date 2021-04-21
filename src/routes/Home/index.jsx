import React, { useState } from 'react';
import {
  Card,
  Button
} from 'react-bootstrap';
import get from 'lodash/get';

import { useListPokemon } from './hooks';
import './styles.scss';

import ModalDetail from './components/Modal';

const bgColors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const Home = () => {

  const [filter, setFilter] = useState({
    offset: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState({});

  const { listPokemon } = useListPokemon(filter);

  const openModalDetail = (id) => {
    const filterPokemon = listPokemon.filter(pokemon => pokemon.id === id)[0];
    setPokemonDetail(filterPokemon)
    setShowModal(true);
  }

  const parseText = (string) => {
    return string && string.charAt(0).toUpperCase() +  string.slice(1);
  }

  const handlePagination = (arrow) => {
    console.log(arrow)

    const offset = arrow === 'left' ? filter.offset - 30 : filter.offset + 30;
    setFilter({offset})
  }

  return(
    <div className="pokemon-list-section">
      {listPokemon && listPokemon.map((pokemon, index) => {
        const pokemonType = get(pokemon, ['pokemon_v2_pokemontypes',0,'pokemon_v2_type', 'name'], 'normal');

        return(
          <Card body key={`pokemon-${index}`} style={{ backgroundColor: bgColors[pokemonType]}}>
            <div className="pokemon-bg">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
            </div>
            <p className="pokemon-name">{parseText(pokemon.name)}</p>
            <Button variant="info" onClick={() => { openModalDetail(pokemon.id) }}>Detail</Button>
          </Card>
        )
      })}
      <ModalDetail 
        show={showModal}
        onHide={() => { setShowModal(false); }}
        data={pokemonDetail}
      />
      <div className="pokemon-pagination">
        {filter.offset > 0 && ( <Button className="mr-2" onClick={() => { handlePagination('left') }}>{'<'}</Button> )}
        {filter.offset < 1118 && ( <Button onClick={() => { handlePagination('right') }}>{'>'}</Button> )}
      </div>
    </div>
  )
}

export default Home;