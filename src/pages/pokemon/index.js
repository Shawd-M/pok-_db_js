import axios from "axios";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Pokemon = (props) => {

    const [pokemon, setPokemon] = useState(null);
    const [eg, setEg] = useState(null);
    const [moves, setMoves] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        getPokemon()
        getEg()
    }, [])

    const getPokemon = async () => {
        try {
          const url = `https://pokeapi.co/api/v2/pokemon/${id}`
          const res = await axios.get(url)
          setPokemon(res.data)
        } catch (e) {
          console.log(e)
        }
      };

      const getEg = async () => {
          try {
            const egg_url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
            const otherres = await axios.get(egg_url)
            setEg(otherres.data)
          } catch (e) {
              console.log(e)
          }
      };

    //   const getMoves = async () => {
    //     try {
    //       const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    //       const res = await axios.get(url)
    //       res.data.moves.forEach(items => {
    //           moves.push(items)
    //       })
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   };
      

    //   const move = moves.map((move) =>
    //   <p >{move.name}</p>
    //   );  

      
      console.log(eg)
      console.log(pokemon)
    return (
        <div>
            {pokemon?( 
                <div>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img src={pokemon.sprites.front_default} />
                    }
                >
                    <div>
                    <h3>Name:</h3> <h4 style={{ color:"green" }}>{pokemon.name}</h4> 
                    </div>
                    <div>
                    <h3>ID:</h3> <h4 style={{ color:"green" }}>{pokemon.id}</h4> 
                    </div>
                    <div>
                    <h3>Type:</h3> <h4 style={{ color:"green" }}>{pokemon.types[0].type.name} {pokemon.types[1].type.name}</h4> 
                    </div>
                    <div>
                    <h3>Weight:</h3> <h4>{pokemon.weight} lbs</h4>
                    </div>
                    <div>
                    <h3>Egg Group:</h3> <h4>{eg.egg_groups[0].name} {eg.egg_groups[1].name} </h4>
                    </div>

                    <div>
                        <div>
                        <h1>Female Sprite</h1>   <img src={pokemon.sprites.front_female} />
                        <h1>Male Shiny Sprite</h1>   <img src={pokemon.sprites.front_shiny} />
                        <h1>Female Shiny Sprite</h1>   <img src={pokemon.sprites.front_shiny_female} />
                    </div>
                    </div>

                    <div> 
                        <h4>All move the pokemon can learn : </h4>
                    </div>
                </Card>

            </div>



            ) :(
                <h1>Pas de Pokemon trouvé</h1>
            )}
        </div>
    )
}

export default Pokemon;