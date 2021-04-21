import { useQuery, gql } from '@apollo/client';
import get from 'lodash/get';

const getListPokemon = gql`
  query samplePokeAPIquery($limit: Int, $offset: Int, $where: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: $where){
      height
      id
      name
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`;

export const useListPokemon = (callData) => {
  
  const { loading, data } = useQuery(getListPokemon, {
    variables: { 
      limit: 30, 
      offset: callData.offset,
      where: { 
        name: { _iregex: callData.name },
        pokemon_v2_pokemontypes: { pokemon_v2_type: {name: {_iregex: callData.type } } }
      }
    }
  });

  const listPokemon = get(data, ['pokemon_v2_pokemon']);

  return { listPokemon, loading }
}
