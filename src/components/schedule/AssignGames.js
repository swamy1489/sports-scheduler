import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import BigCalendar from '../calendar/BigCalendar'

export default function AssignGames() {
    
    const [games, setGames] = useState([])
    const [employees, setEmployees] = useState([])
    const [schedule, setSchedule] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    useEffect(() => {
        axios.get("http://localhost:5000/games/getGames")
        .then(res => {
            setGames(res.data.games)
        })
        axios.get("http://localhost:5000/employees/getEmployees")
        .then(res => {
            setEmployees(res.data.employees)
        })
    }, [])

    const autoAssign = () =>{
        console.log("auto assign fired")
        axios.get("http://localhost:5000/schedules/autoAssign")
        .then(res =>{
            // setSchedule(res.data.schedule)
            console.log("success")
        })
        .catch(err => {
            console.log("error")
            console.log(err)
        })
    } 

    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                    <p className="title">Assign Games</p>
                    </div>
                </div>
            </section>
            <div className="columns">
                {/* <button className="button" onClick={autoAssign}>Auto Assign</button> */}
                <div className="column is-two-thirds">
                    <BigCalendar/>
                </div>
                <div className="column is-one-third">
                    <table className="table is-responsive container">
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th>Employee</th>
                            </tr>
                        </thead>
                            
                        <tbody>
                        {games.map(game => (
                            <tr key={game._id}>
                            <td>{game.title}</td>
                            <td>{game.employeeId ? game.employeeId : "None"}</td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
