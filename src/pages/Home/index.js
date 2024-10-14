import React, {useState, useEffect} from "react";
import axios from "axios";
import { Table, Tag, Space } from 'antd';
import './App.css';
import { Link } from "react-router-dom";
import { Select } from 'antd';
const { Option } = Select;

const columns = [
  {
    title: 'Id',
    dataIndex:'id',
    key: 'id',
    width: 10,
    fixed: 'left' ,
    sorter: (a,b) => a.id - b.id
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    width: 20,
    fixed: 'left',
    render:(a,b) => {
        return (
              <img src={b.sprites?.front_default} width="100px" height="100px"/>
        )
    }
  },
    {
      title: 'Name',
      dataIndex:'name',
      key: 'name',
      width: 20,
      fixed: 'left' ,
      render:(a,b) => {
          return (
            <Link to={`/pokemon/${b.id}`}>
              <p style={{fontSize:"2rem"}}>{a}</p>
            </Link>
          )
      }
    },
];
const Home = () => {

    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);

    const [types, setTypes] = useState([]);
    const [moves, setMoves] = useState([]);

    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedMoves, setSelectedMoves] = useState([]);

    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {
      getPokemons()
      getTypes()
      getMoves()
  }, [])

  useEffect(() => {
    filtersPokemons()
}, [selectedTypes, selectedMoves])

    const getPokemons = async () => {
        const toArray = [];
        try {
    
          const url = `https://pokeapi.co/api/v2/pokemon?limit=1050`
          const res = await axios.get(url)
          const allPokemons = res.data.results
          const all = []
          allPokemons.forEach( (pokemon,key) => {
            all.push(new Promise( async (resolve, reject) => {
              allPokemons[key] = await getPokemon(pokemon)
              resolve ()
            }))
          })
          await Promise.all(all)
          setPokemons(allPokemons)
          setAllPokemons(allPokemons)
        } catch (e) {
          console.log(e)
        }
      };

      const filtersPokemons = () => {
        const filteredPokemons = []
        allPokemons.map(p => {
          if (containsAll(selectedMoves, p.moves) && containsAll(selectedTypes, p.types)) {
            filteredPokemons.push(p)
          }
        })
        setPokemons(filteredPokemons)
      }

      const getPokemon = async (pokemon) => {
        try {
          const url = pokemon.url
          const res = await axios.get(url)
          const data = res.data
          const newMoves = data.moves.map(m => m.move.name)
          const newTypes = data.types.map(m => m.type.name)
          data.moves = newMoves
          data.types = newTypes 
          return data
        } catch (e) {
          console.log(e)
        }
      };

      const getTypes = async () => {
        try {
          const url = 'https://pokeapi.co/api/v2/type'
          const res = await axios.get(url)
          setTypes(res.data.results)
        } catch (e) {
          console.log(e)
        }
      };

      const getMoves = async () => {
        try {
          const url = 'https://pokeapi.co/api/v2/move?limit=813'
          const res = await axios.get(url)
          setMoves(res.data.results)
        } catch (e) {
          console.log(e)
        }
      };

      function handleChangeTypes(value) {
        setSelectedTypes(value)
      }

      function handleChangeMoves(value) {
        setSelectedMoves(value)
      }

      const containsAll = (contains, arrayToCheck) => {
        return contains.every(function (i) { return arrayToCheck.includes(i); })
      }

  return (
    <div>
      <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Select
        mode="multiple"
        allowClear
        style={{ width: '45%' }}
        placeholder="Type"
        onChange={setSelectedTypes}
      >
        {types.map((type,key) => (
          <Select.Option value={type.name} >
            {type.name}
          </Select.Option>
        ))}
    </Select>
    <Select
        mode="multiple"
        allowClear
        style={{ width: '45%' }}
        placeholder="Moves"
        onChange={setSelectedMoves}
      >
        {moves.map((move,key) => (
          <Select.Option value={move.name} >
            {move.name}
          </Select.Option>
        ))}
    </Select>
      </div>
        <Table columns={columns}  dataSource={pokemons} pagination={{ pageSize: pageSize , pageSizeOptions:[5, 25, 50, 100], onShowSizeChange:(e) => setPageSize(e.current) }} />
    </div>
  )
}

export default Home;