import React, { useState } from 'react';
import {
  Card,
  Button,
  FormControl
} from 'react-bootstrap';
import get from 'lodash/get';

import { useListPokemon } from './hooks';
import './styles.scss';

import ModalDetail from './components/Modal';
import { pokemonColor } from '../../constant/pokemonColor';
import { pokemonType } from '../../constant/pokemonType';
import whoPokemon from '../../assets/whoPokemon.png';

const Home = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    name: "",
    type: ""
  });
  const [submitData, setSubmitData] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState({});

  const { listPokemon, loading } = useListPokemon(submitData);

  const openModalDetail = (id) => {
    const filterPokemon = listPokemon.filter(pokemon => pokemon.id === id)[0];
    setPokemonDetail(filterPokemon)
    setShowModal(true);
  }

  const parseText = (string) => {
    return string && string.charAt(0).toUpperCase() +  string.slice(1);
  }

  const handlePagination = (arrow) => {
    const offset = arrow === 'left' ? filter.offset - 30 : filter.offset + 30;
    setFilter({offset})
    setSubmitData({offset})
  }

  const handleInputName = (e) => {
    setFilter({
      ...filter,
      offset: 0,
      name: e.target.value
    })
  }

  const handleSubmitFilter = () => {
    setSubmitData(filter)
  }

  const handleClickDropdown = (e) => {
    setFilter({
      ...filter,
      type: e.target.value
    })
  }

  const handleCrashImg = (e) => {
    e.target.src = whoPokemon;
  }

  return(
    <>
    <div className="pokemon-filter">
      <FormControl onChange={handleInputName} placeholder="Enter Pokemon Name" />
      <FormControl as="select" value={filter.type} onChange={handleClickDropdown}>
        <option value="">Select Pokemon Type</option>
        {pokemonType.map((type, index) => {
          return(
            <option key={`types-${index}`} value={type}>{type}</option>
          )
        })}
      </FormControl>
      <Button type="submit" onClick={handleSubmitFilter}>GO!</Button>
    </div>
    {loading && (
      <div className="pokemon-loading">
        <img src="https://pngimg.com/uploads/pokeball/pokeball_PNG24.png" alt="pokeball"/>
      </div>
    )}
    <div className="pokemon-list-section">
      {listPokemon && listPokemon.map((pokemon, index) => {
        const pokemonType = get(pokemon, ['pokemon_v2_pokemontypes',0,'pokemon_v2_type', 'name'], 'normal');

        return(
          <Card body key={`pokemon-${index}`} style={{ backgroundColor: pokemonColor[pokemonType]}}>
            <div className="pokemon-bg">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                onError={handleCrashImg}
                alt={pokemon.name} 
              />
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
    </>
  )
}

export default Home;