import React from "react";

const Pokeinfo = ({ data }) => {
//    console.log(data) we get all the data about the pokemon
    return (
        <>
        {
            {/* if data is empty that return the empty string else: return pokemon information */}
            (!data) ? "" : (
                
                <>
                    <h1>{data.name}</h1> 
                    {/* pokemon name */}
                    {/* pokemon url, last part change to data.id i.e. pokemon id */}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                    <div className="abilities">
                    {/* for abilites map the poke.ability.name for stats we have stat object */}
                        {
                            data.abilities.map(poke=>{
                                return(
                                    <>
                                     <div className="group">
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="base-stat">
                        {
                            data.stats.map(poke=>{
                                return(
                                    <>
                                        <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                        {/* it's like this stat.name and : poke.base_state like this Hp:30. So, use hp:30 */}
                                    </>
                                )
                            })
                        }
                    </div>
                </>
            )
        }

        </>
    )
}
export default Pokeinfo