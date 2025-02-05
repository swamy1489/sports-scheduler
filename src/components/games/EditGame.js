import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {useForm} from "react-hook-form"
import { useParams } from 'react-router-dom';
import axios from "axios"
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';


let defaultValues = {
    title: "",
    fieldNumber: "",
    location: "",
    address: "",
    ageGroup: "",
    filmType: ""
  };

const fetchGame = async(id) => {
    const {data} = await axios.get(`/games/getGame/${id}`)
    return data.game;
}

export default function EditGame() {
    let { id } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [ageGroups, setAgeGroups] = useState([]);
    const [gameToEdit, setGameToEdit] = useState(defaultValues);
    const history = useHistory();
    
    const {register, handleSubmit, reset, setValue} = useForm();
    
    const {status} = useQuery({
        queryKey: "game",
        queryFn: () => fetchGame(id),
        onSuccess: (data) => {
            setGameToEdit(data);
            for(const property in data){
                // setValue("id", data.employee._id);
                setValue(property, data[property])
            }
        } 
    });


    const onSubmit = async req => {
        req["_id"] = gameToEdit._id;
        req["datetime"] = new Date(startDate.toISOString())
        
        axios.post("/games/updateGame", req)
        .then(res => {
            console.log(res.data.message)
            history.push('/schedule');
        })
        .catch( err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:5000/options/getAgeGroups").then(
            res => {setAgeGroups(res.data.options)}
        )
    }, [])

    const cancel = (e) => {
        e.preventDefault();
        reset();
    }

    return (
        <div className="main" id="main">
            <br/>

            {status !== "success" ? 

            (<h1>{status}</h1>)
            :
            (
                <>
                <h1 className="title">Editing Game: {gameToEdit.title}</h1>
                
                <br/>  
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="columns is-multiline">
                        <div className="column is-9">
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Description</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control is-expanded">
                                            <input 
                                            className="input" 
                                            type='text' 
                                            name='title' 
                                            ref={register}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input 
                                            className="input" 
                                            type='text' 
                                            name='fieldNumber' 
                                            ref={register}/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Location</label>
                                </div>

                                <div className="field-body">
                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input className="input" type='text' name='location' placeholder="Toyota Soccer Complex" ref={register}/>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Address</label>
                                </div>

                                <div className="field-body">
                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input className="input" type='text' name='address' placeholder="9200 World Cup Way, Ste 202" ref={register}/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Date</label>
                                </div>

                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <DatePicker 
                                            className="input"
                                            dateFormat={"MMMM d, yy h:mm aa"} 
                                            showTimeSelect 
                                            timeIntervals={15} 
                                            selected={startDate} 
                                            onChange={date => setStartDate(date)} 
                                            popperPlacement="bottom"
                                            />
                                        </div>
                                    </div>
                                </div>
                            
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Age Group</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <div className="select">
                                                <select name="ageGroup" ref={register}>
                                                    {ageGroups.map(ageGroup => (
                                                        <option key={ageGroup}>{ageGroup}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Film Type</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <div className="select">
                                                <select name="filmType" ref={register}>
                                                    <option>Manual Film</option>
                                                    <option>Veo</option>
                                                    <option>Live Stream</option>
                                                </select>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            <br/>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" type="submit">Submit</button>
                                </div>
                                <div className="control">
                                    <button 
                                    className="button is-link is-light"
                                    onClick={cancel}>
                                    Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form> 
                </>
            )}
        </div>
    )
}
