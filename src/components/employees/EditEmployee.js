import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query';
import axios from 'axios';


let defaultValues = {
    first_name: "",
    last_name: "",
    age: 0,
    address: "",
    canSetUp: false,
    needsTraining: false,
    canFilmSoccer: false,
    canFilmFootball: false,
    canLiveStream: false,
    canVeo: false,
    canManualRecord: false,
    phoneNumber: 1111111111,
  };
  
const fetchEmployee = async (id) => {
    const res = await fetch(`/employees/getEmployee/${id}`);
    return res.json()
}

export default function EditEmployee() {
    let { id } = useParams();
    const [employeeToEdit, setEmployeeToEdit] = useState(defaultValues);
    
    const {register, handleSubmit, errors, reset, setValue} = useForm({
        defaultValues: defaultValues,
    });
    
    const {status} = useQuery({
        queryKey: "employee",
        queryFn: () => fetchEmployee(id),
        onSuccess: (data) => {
            setEmployeeToEdit(data.employee);
            for(const property in data.employee){
                // setValue("id", data.employee._id);
                setValue(property, data.employee[property])
            }
        } 
    });

    const onSubmit = async req => {
        req["_id"] = employeeToEdit._id;
        await axios.post("/employees/updateEmployee", req)
        .then(res => {
            if(res.status === 200){
                console.log("Successfully updated employee")
                //TODO: Add "Successfully updated employee toast" and redirect to employee table
            }
            else{
                console.log("Error with status code: " + res.status)
                //TODO: Add "Error toast"
            }
        })
        .catch(error => {
                console.log("Error creating employee: ", error);
                //TODO: Add "Error toast"
        })
    }

    return (
        <div className="main" id="main">
            <br/>
            {status !== "success" ? 
            
            (<h1>{status}</h1>)
            :
            (
                <>
                <h1 className="title">Edit Employee: {employeeToEdit.first_name + " " + employeeToEdit.last_name}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input 
                            className="input" 
                            type='text' 
                            name='first_name' 
                            ref={register({
                                required: 'This is a required field.'
                            })}/>
                            {errors.first_name && <strong>Your input is required.</strong>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input 
                            className="input" 
                            type='text' 
                            name='last_name' 
                            ref={register({
                                required: 'This is a required field.'
                            })}/>
                            {errors.last_name && <strong>Your input is required.</strong>}
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Age</label>
                        <div className="control">
                            <input
                            className="input" 
                            type='number' 
                            name='age' 
                            ref={register({
                                min: {
                                    value: 0,
                                    message: "Your age must be greater than 0."
                                },
                                max: {
                                    value: 120,
                                    message: "Your age must be less than 120. If you are older than this, contact a developer!"
                                }
                            })}/>
                            {errors.age && <strong>Please enter a valid age (between 0 and 120).</strong>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input
                            className="input" 
                            type='text' 
                            name='address' 
                            ref={register({
                                required: "This is a required field",
                            })}/>
                        </div>
                        {errors.address && <strong>Your input is required.</strong>}
                    </div>

                    <div className="field">
                        <label className="label">Phone Number</label> <span className="has-text-grey-light">Ex: 123 456 7890</span>
                        <div className="control">
                            <input
                            className="input"
                            type='number' 
                            name='phoneNumber'
                            ref={register({
                                required: "This is a required field",
                                maxLength : {
                                    value: 10,
                                    message: "Too many digits for phone number" // JS only: <p>error message</p> TS only support string
                                    },
                                    minLength : {
                                    value: 10,
                                    message: "Not enough digits for phone number" // JS only: <p>error message</p> TS only support string
                                    }
                            })}/>
                            {errors.phoneNumber && <strong>Your input is required. Make sure you only input 10 digits.</strong>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label checkbox">Do they need training?</label>                                
                        <input type="checkbox" name="needsTraining" ref={register} />
                    </div>

                    <div className="field">
                        <label className="label checkbox">Can they record manually?</label>
                        <input type="checkbox" name="canManualRecord" ref={register} />                                
                    </div>
                    
                    <div className="field">
                        <label className="label checkbox">Can they operate a Veo?</label>
                        <input type="checkbox" name="canVeo" ref={register} />
                    </div>
                    
                    <div className="field">
                        <label className="label checkbox">Can they set up a rig on their own?</label>
                        <input type="checkbox" name="canSetUp" ref={register} />
                    </div>

                    <div className="field">
                        <label className="label">Can they film soccer games?</label>
                        <input type="checkbox" name="canFilmSoccer" ref={register} />
                    </div>

                    <div className="field">
                        <label className="label checkbox">Can they film football games?</label>
                        <input type="checkbox" name="canFilmFootball" ref={register} />
                    </div>

                    <div className="field">
                        <label className="label checkbox">Can they livestream?</label>
                        <input type="checkbox" name="canLiveStream" ref={register} />
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button submit is-link" type="submit">Submit</button>
                        </div>
                        <div className="control">
                        <input
                            type="button"
                            onClick={() => reset()}
                            value="Cancel"
                            className="button is-link is-light"
                        />
                        </div>
                    </div>
                </form>
                </>
            )}
        </div>
    )
}
