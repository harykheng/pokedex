import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import get from 'lodash/get';

import { useListPokemon } from '../Home/hooks';

import whoPokemon from '../../assets/whoPokemon.png';
import { pokemonColor } from '../../constant/pokemonColor';

import './styles.scss';

const Compare = () => {
  const [filter, setFilter] = useState({ name:'', limit: 30 });
  const [listAllPokemon, setListAllPokemon] = useState([]);
  const [comparePokemon, setComparePokemon] = useState([]);
  const { listPokemon, loading } = useListPokemon(filter);

  useEffect(() => {
    if(!loading){
      setListAllPokemon(
        listPokemon.map(pokemon => {
          return{
            ...pokemon,
            label: pokemon.name,
            value: pokemon.id
          }
        })
      )
    }
  },[loading])
  
  const handleChangePokemon = (value) => {
    setFilter({...filter, name: value})
  }

  const handleClick = (value) => {
    setComparePokemon([...comparePokemon, value])
  }

  const handleCrashImg = (e) => {
    e.target.src = whoPokemon;
  }

  const parseText = (string) => {
    return string && string.charAt(0).toUpperCase() +  string.slice(1);
  }

  return(
    <>
      <div className="pokemon-compare">
        <Select
          className="list-pokemon-compare"
          options={listAllPokemon}
          isSearchable
          onInputChange={handleChangePokemon}
          onChange={handleClick}
        />
        <Button variant="link" onClick={() => { setComparePokemon([]) }}>Reset</Button>
      </div>
      <div className="pokemon-table">
        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Pokemon</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Type</th>
              <th>Ability</th>
            </tr>
          </thead>
          <tbody>
            {comparePokemon.map((data, index) => {
              const getAbility = get(data, ['pokemon_v2_pokemonabilities'],[]);
              const getTypes = get(data, ['pokemon_v2_pokemontypes'], []);

              const pokemonAbility = getAbility.map((ability, index) => {
                return <span>{parseText(ability.pokemon_v2_ability.name)}{getAbility.length === index+1 ? '' : ', '}</span>
              })
            
              const pokemenTypes = getTypes.map((type) => {
                return <span className="badge-type" style={{ backgroundColor: pokemonColor[type.pokemon_v2_type.name]}}>{parseText(type.pokemon_v2_type.name)}</span>
              })

              return(
                <tr key={`table-pokemon-${index}`}>
                  <td>{<img className="pokemon-img" src={`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`} alt={data.name} onError={handleCrashImg}/>}</td>
                  <td>{parseText(data.name)}</td>
                  <td>{data.height*10} cm</td>
                  <td>{data.weight*0.1} kg</td>
                  <td>{pokemenTypes}</td>
                  <td>{pokemonAbility}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Compare;