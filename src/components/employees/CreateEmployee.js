import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
// import { useMutation } from 'react-query'
import { Notification, Button } from 'react-bulma-components'
import axios from 'axios'

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
  };

export default function CreateEmployee() {
    const {register, handleSubmit, errors, reset} = useForm({
        defaultValues: defaultValues,
    });

    const [showNotification, setShowNotification] = useState(false);

    // const onSubmit = useMutation(
    //     params => axios.post("http://localhost:5000/employees/createEmployee", {params}),
    //     {
    //         onSuccess: () => {
    //             console.log("Successfully created new employee.")
    //             setStatus('success');
                
    //         },
    //         onError: () =>{
    //             console.log("Failed to create new employee.")
    //             setStatus('error');
    //         }
    //     }
    // )

    const onSubmit = async req => {
        console.log(req);
        await axios.post("/employees/createEmployee", req)
        .then(res => {
            if(res.status === 201){
                setShowNotification(true);
            }
            else{
                console.log("Error with status code: " + res.status)
                setShowNotification(false);
            }
        })
        .catch(error => {
                console.log("Error creating employee: ", error);
                setShowNotification(false);
            }
        )
    }

    const cancel = (e) => {
        e.preventDefault();
        reset();
    }

    const NotificationMessage = () => {
        return(
        <Notification color="success">
            <strong>Be sure to add this employees availability later to assign games to them.</strong>
            <Button remove type="button" onClick ={() =>setShowNotification(false)}/>
        </Notification>)
    }

    return (
        <>
        <div className="main" id="main">
            <br/>
            <h1 className="title">Add Employees</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="columns is-multiline">
                    <div className="column is-9">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Personal Information</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input 
                                        className="input" 
                                        type='text' 
                                        name='first_name' 
                                        placeholder='First Name'
                                        ref={register({
                                            required: 'This is a required field.'
                                        })}/>
                                        {errors.first_name && <strong>Your input is required.</strong>}
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input 
                                        className="input" 
                                        type='text' 
                                        name='last_name' 
                                        placeholder='Last Name'
                                        ref={register({
                                            required: 'This is a required field.'
                                        })}/>
                                        {errors.last_name && <strong>Your input is required.</strong>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div class="field is-horizontal">
                            <div class="field-label"></div>
                            <div class="field-body">
                                <div className="field">
                                    <div className="control">
                                        <label className="label">Age</label>
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
                                    <div className="control">
                                        <label className="label">Phone Number</label>
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
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Address</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                        className="input" 
                                        type='text' 
                                        name='address' 
                                        ref={register({
                                            required: "This is a required field",
                                        })}/>
                                        {errors.address && <strong>Your input is required.</strong>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Skills</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <label className="label checkbox">Do they need training?</label>                                
                                        <input type="checkbox" name="needsTraining" ref={register} />
                                    </div>
                                </div> 

                                <div className="field">
                                    <div className="control">
                                        <label className="label checkbox">Can they record manually?</label>
                                        <input type="checkbox" name="canManualRecord" ref={register} />
                                    </div>
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

                            </div>
                        </div>
                    </div>
                </div>

                {showNotification && <NotificationMessage/> }

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button submit is-link" type="submit">Submit</button>
                    </div>
                    <div className="control">
                    <input
                        type="button"
                        onClick={cancel}
                        value="Cancel"
                        className="button is-link is-light"
                    />
                    </div>
                </div>
                           
            </form>

        </div>
        </>
    )
}
