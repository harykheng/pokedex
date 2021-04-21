import React from 'react';
import Modal from 'react-bootstrap/Modal';
import get from 'lodash/get';

import './styles.scss';

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

const ModalDetail = ({ show, onHide, data }) => {

  console.log(
    data
  )

  const getAbility = get(data, ['pokemon_v2_pokemonabilities'],[]);
  const getTypes = get(data, ['pokemon_v2_pokemontypes'], []);

  const parseText = (string) => {
    return string && string.charAt(0).toUpperCase() +  string.slice(1);
  }

  const pokemonAbility = getAbility.map((ability, index) => {
    return <span>{parseText(ability.pokemon_v2_ability.name)}{getAbility.length === index+1 ? '' : ', '}</span>
  })

  const pokemenTypes = getTypes.map((type, index) => {
    return <span className="badge-type" style={{ backgroundColor: bgColors[type.pokemon_v2_type.name]}}>{parseText(type.pokemon_v2_type.name)}</span>
  })

  return(
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <b>{parseText(data.name)}</b>
      </Modal.Header>
      <div className="modal-body-detail">
        <div style={{ width: '50%'}}>
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`} alt={data.name}/>
        </div>
        <div style={{ width: '50%'}}>
          <p>Height : {data.height*10} cm</p>
          <p>Weight : {data.weight*0.1} kg</p>
          <p>Ability : {pokemonAbility}</p>
          <p>Types : {pokemenTypes}</p>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDetail;
