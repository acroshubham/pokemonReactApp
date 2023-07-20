import React from "react";
// Catch the props get from main using pokedata, we see data from card component
// infoPokemon to share the pokemon data when user taps on any card
const Card = ({ pokemon, loading,infoPokemon}) => {
   // console.log(pokemon);
    return (
        <>
        {/* if the loading is true. Data is still fetched. If it's true
        than we will map the item's in the array and reutrn  
        now from the data we will get the item.id, to set for the h2 i.e. card
        and for the image it's item.sprites.front_default. We don't get pokemon in sorted array. So for that we 
        go on main and sort them acc. to their id no. */}
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                        <>
                        {/* here I'll pass the item that I'll click and I will get the data
                        thats the tip that we going to use here
                        
                        In main poke=> contain the data that we have stored as poke
                        poke contain the data taht we pass in the setPokeDex(poke) */}
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div>
                        </>
                    )
                })
        }

        </>
    )
}
export default Card;