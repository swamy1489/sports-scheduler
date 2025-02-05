import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

  
const fetchGamesByEmpoloyee = async (id) => {
    const res = await fetch(`/employees/getGamesByEmployee/${id}`);
    return res.json()
}

const fetchEmployee = async (id) => {
    const res = await fetch(`/employees/getEmployee/${id}`);
    return res.json()
}

export default function ViewGames() {
    let { id } = useParams();

    const [games, setGames] = useState();
    // const [employee, setEmployee] = useState();

    const {status} = useQuery({
        queryKey: "games",
        queryFn: () => fetchGamesByEmpoloyee(id),
        onSuccess: (data) => {
            setGames(data.games);
        } 
    });

    // const [gamesRes, employeeRes] = useQueries([
    //     {
    //         queryKey: "games",
    //         queryFn: () => fetchGamesByEmpoloyee(id),
    //         onSuccess: (data) => {
    //             setGames(data.games);
    //         } 
    //     },
    //     {
    //         queryKey: "employee",
    //         queryFn: () => fetchEmployee(id),
    //         onSuccess: (data) => {
    //             setEmployee(data.employee);
    //         } 
    //     }
    // ]);
    

    return (
        <div className="main" id="main">
            <br/>
            {status !== 'success' ? 
            
            (<h1>Loading...</h1>)
            :
            (
                <>
                <h1 className="title">Games Assigned to ---- </h1>
                <table className="table is-striped is-narrow is-fullwidth ">
                    <thead>
                        <tr>
                        <th>Game Title</th>
                        <th>Age Group</th>
                        <th>Date and Time</th>
                        <th>Location</th> 
                        <th>Film Type</th>

                        </tr>
                    </thead>
                    <tbody>
                    {games && games.map(game => (
                        <tr key={game._id}>
                            <td>{game.title}</td>
                            <td>{game.ageGroup}</td>
                            <td><span>{new Date(game.datetime).toString()}</span> </td>
                            <td>{game.location}</td>
                            <td>{game.filmType}</td>
                        </tr>
                    ))}

                        
                    </tbody>
                </table>
                
                </>
            )}
        </div>
    )
}
