import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Main=()=>{
    // using use state to hold our pokemon data
    const [pokeData,setPokeData]=useState([]);
    // in use state funciton passed empty array to change the state from the previouse one to the new one i.e. pokedata to setPokeData.

    // For the loading function. i.e. call the Pokeapi.

    // In pokeapi, remove the pokemon/[name] and you will get the result array with 20 pokemons. Now copy the url: Direct link to results and you'll get the pokemon data 
    const [loading,setLoading]=useState(true);
    // To change the state from current url to next url. and passing it the url to which I need to render my page.
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    // to set the next url
    const [nextUrl,setNextUrl]=useState();
    // to set the previous url
    const [prevUrl,setPrevUrl]=useState();
    // to display teh information
    const [pokeDex,setPokeDex]=useState();

    const pokeFun=async()=>{
        // load true = load the website
        setLoading(true)
        // get the data from teh api using .get and inside paranthesis, pass the url
        const res=await axios.get(url);
        // console.log(res.data.results)

        // to fetch the next array of 20 characters
        setNextUrl(res.data.next);
        // to get the previous array of character the above use state will change the state
        setPrevUrl(res.data.previous);
        // to get the pokemon data i.e. the actual array of data that we saw on console.log
        getPokemon(res.data.results)
        // finally setting the loading false
        setLoading(false)
        // check the content of the pokeData
        // console.log(pokeData);
    }
    // just map the items to get the data of pokemon. Than making api request using axios.
    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
        //   console.log(result);
        //   console.log(result.data); Here we got the object containing pokemon data. 

        // we took the array from the first const. Now it's the main part i.e. we will get the value stored in this array 
        // creating a new array, first store all the existing element in the array that new element in the array than return state: it will act as teh push function in the array
          setPokeData(state=>{
              state=[...state,result.data]
            //   if a.id is bigger than b.id return 1 else not
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }
    // it's used to render our website for once but if we pass the url as the parameter. Than it will re-render the page everytime we hit the button
    useEffect(()=>{
        pokeFun();
    },[url])
    return(
        <>
            <div className="container">
            {/* css for left part */}
                <div className="left-content">
                {/* here we set the props that we got i.e. pokeData and than we will send this props to card */}
                {/* So, that user get the data as he taps onto the card we will use a small trick. I will
                use infopokemon poke than set a new and last use state than I'll use set pokedex to show the data by passing 
                poke to pokedex, than I'll go to card component to render the poke using infoPokemon*/}
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    {/* The working of buttons */}
                    <div className="btn-group">
                    {/* for prev click set poke data to empty string and prev url and vice versa
                    we pass the empty pokemon data so that every time we render the website, we get the new data
                    acc. to and if the previous data is not availaible or availaible and only show the button when it 
                    get  */}
                        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
                {/* css for right part */}
                <div className="right-content">
                {/* passing the props pokedex  */}
                   <Pokeinfo data={pokeDex}/>
                </div>
            </div>
        </>
    )
}
export default Main;

// api came from npm i axios