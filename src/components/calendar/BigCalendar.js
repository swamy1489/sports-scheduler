import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import {  Dropdown } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';

const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);



// const fetchGames = async () => {
//   try{
//     const {data} = await axios.get("/games/getGames")
//     let games = []
//     data.games.forEach(game => {
//         games.push({
//         title: game.title,
//         start: moment(game.datetime).toDate(),
//         end: moment(game.datetime).add(2,'hours').toDate(), //**** TODO: WILL NEED TO CALCULATE END DATE BASED ON AGE GROUP *****
//         resource: game._id,
//         isAssigned: game.employeeId ? true : false,
//         employeeId: game.employeeId 
//         })
//     });
//     return games;
//   }
//   catch(err){
//     console.log("Error fetching games: ", err);
//   }
// }


export default function BigCalendar() {
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const history = useHistory();

    useEffect(() => {
      axios.get("/games/getGames").then(
        res => {
            let games = [];
            res.data.games.forEach(game => {
              games.push({
                title: game.title,
                start: moment(game.datetime).toDate(),
                end: moment(game.datetime).add(2,'hours').toDate(), //**** TODO: WILL NEED TO CALCULATE END DATE BASED ON AGE GROUP *****
                resource: game._id,
                isAssigned: game.employeeId ? true : false,
                employeeId: game.employeeId 
              });
            });

            setEvents(games);
        }
      )
      .catch(err=> console.log("Error fetching games: ", err));
    }, []);

    const onSelectEvent = async (eventData) => {
        const req = {
          start: eventData.start,
          end: eventData.end
        };
        
        setSelectedEvent(eventData);
        setShow(true);
    
        //*** COULD BE OPTIMIZED ****/
        await axios.post("/schedule/findAvailableEmployees", req)
        .then(res => {
          if(eventData.employeeId){
            setSelectedEmployee(res.data.availableEmployees); //select the employee that is currently already assigned to this game
          }
          if(res.data.availableEmployees){
            setSelectedEmployee(res.data.availableEmployees[0]);
          }
          setAvailableEmployees(res.data.availableEmployees);
        })
        .catch(err=> console.log(err));
      };

    const eventStyleGetter = (event, start, end, isSelected) => {
        if(event.isAssigned === true){
          let green = '#73cc5a';
          let style = {
            backgroundColor: green,
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
          };
          
          return {style: style};
        }
      }

    const handleSelect = (option) => {
        setSelectedEmployee(option);
      }

    const handleSave = async (employee, game) => {
      if(employee && game){
        const req =  {
          employeeId: employee._id,
          gameId: game.resource
        }

        await axios.post("/schedule/scheduleGame", req)
        .then(res => {        
          //Update isAssigned to change color of event to green
          let event = events.find(e => e.resource === game.resource);
          let index = events.findIndex(e => e.resource === game.resource)
  
          if(event){
              let newEvents = [...events];
              newEvents[index].isAssigned = true;
              setEvents(newEvents);
      
              //Close modal after saving
              setShow(false);
          }
        })
        .catch(err => {
          //TODO: SHOW ERROR WITH ALERT MESSAGE
          console.log(err)
        })
      }
    }

    const handleDelete = async (game) => {

      if(game){
        const req = {
          id: game.resource
        }  
        
        await axios.delete("/games/deleteGame", {data: req})
        .then(res =>{
          //If successful then remove from UI
          if(res.status === 200){
            let index = events.findIndex(e => e.resource === game.resource);
            let newEvents = [...events];
            newEvents.splice(index,1)
            setEvents(newEvents);
          }
          
          //Close modal
          setShow(false);
        })
        .catch(err => {
          console.log("Error in handleDelete: " , err);
        })
      }
    }

    const handleEdit = (event) => {
      const game_id = event.resource;
      history.push(`/games/edit/${game_id}`);
    }


    return (
        <>
          {/* Change Calendar to DndCalendar and uncomment DndCalendar above if you want drag and drop capability */}
          <Calendar
            defaultDate={moment().toDate()}
            defaultView="week"
            events={events}
            localizer={localizer} 
            resizable         
            style={{ 
              backgroundColor: "#edeee8",
              color: "black"
            }}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
          />
          

          {/**** ASSIGN GAME MODAL ****/}
          <div className={ show ? "modal increased-height is-active" : "modal increased-height"}>
            <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">{selectedEvent.title}</p>
                  <button onClick={() => setShow(false)} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                  <p className="has-text-black">This game is assigned to: {selectedEvent.employeeId ? selectedEvent.employeeId : "No one"}</p>
                  <p className="has-text-black">To assign or reassign, choose from the dropdown below:</p>
                  <Dropdown value={selectedEmployee} onChange={handleSelect}>
                    {availableEmployees && availableEmployees.map(employee => (
                        <Dropdown.Item className="has-text-black" key={employee._id} value={employee}>
                            {employee.first_name} {employee.last_name}
                        </Dropdown.Item>
                    ))}
                  </Dropdown>
                  <br/>
                  <br/>
                  <br/>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={() => handleSave(selectedEmployee, selectedEvent)}>Save changes</button>
                  <button className="button" onClick={() => setShow(false)}>Cancel</button>
                  <button className="button is-primary" onClick={() => handleEdit(selectedEvent)}>Edit</button>
                  {/* <Link className="button is-primary" to={`/games/editGame/${selectedEvent.resourse}`}>Edit</Link> */}
                  <button className="button is-danger" onClick={() => handleDelete(selectedEvent)}>Delete</button>
                </footer>
              </div>
          </div>
        </>
    )
}
