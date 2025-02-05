import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Dropdown } from 'react-bulma-components';
import moment from 'moment';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
 
const fetchEmployees = async () => {
    const res = await fetch("/employees/getEmployees");
    return res.json()
}

const Availability = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({
        _id: 0,
        first_name: "",
        last_name: "",
    })
    const [date, setDate] = useState(new Date())

    useQuery({
        queryKey: "employees",
        queryFn: fetchEmployees,
        onSuccess: (data) => {
            setEmployees(data.employees)
            setSelectedEmployee(data.employees[0])
        }
        
    });
    
    const addAvailability = () => {
        let req = {
            new_availability: moment(date).startOf('day').toDate(),
            employee: selectedEmployee
        }
        
        axios.post("/employees/createAvailability", req)
        .then(res => {            
            if(selectedEmployee){
                const updated_availability = [...selectedEmployee.availability, req.new_availability];
                const newSelectedEmployee = {...selectedEmployee};
                newSelectedEmployee['availability'] = updated_availability;
                setSelectedEmployee(newSelectedEmployee);
            }
        })
        .catch( err => console.log(err))
    }

    const removeAvailability = (employee, availability) => {
        const req = {
            employee: employee,
            availability: availability
        }
        axios.post("/employees/removeAvailability", req)
        .then(res => {
            console.log(res.data.message)
            
            if(selectedEmployee){
                const i = selectedEmployee.availability.indexOf(availability);
                const updated_availability = selectedEmployee.availability.splice(i,1);
                let newSelectedEmployee = {...selectedEmployee};
                newSelectedEmployee[availability] = updated_availability;
                setSelectedEmployee(newSelectedEmployee);
            }
        })
        .catch(err => console.log(err))
    }

    const handleSelect = (option) => {
        setSelectedEmployee(option)
    }

    return (
        <>
        <div className="main" id="main">               
            <h1 className="title">Availability</h1>
            <br/>
            <div className="columns is-multiline">
                <div className="column is-9">
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Showing availability for:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control select">
                            <Dropdown value={selectedEmployee} onChange={handleSelect}>
                                {employees && employees.map(employee => (
                                    <Dropdown.Item className="has-text-black" key={employee._id} value={employee}>
                                        {employee.first_name} {employee.last_name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
            <form>
                <div className="columns is-multiline">
                    <div className="column is-9">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Add Availability</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <DatePicker className="input" dateFormat={"MMMM d, yy"} selected={date} onChange={date => setDate(date)} />
                                    &nbsp;
                                    <button className="button is-success" type="submit" onClick={addAvailability}><FontAwesomeIcon icon={faPlus}/></button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </form>
            <br/>
            <br/>
            <div className="columns is-multiline">
                <div className="column is-one-third">
                <table className="table is-striped is-narrow is-fullwidth ">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Remove</th> 
                        </tr>
                    </thead>
                    <tbody>
                    {selectedEmployee.availability && selectedEmployee.availability.map(day => (
                        <tr key={day}>
                            <td><span>{new Date(day).toDateString()}</span> </td>
                            <td><button className="button is-danger" onClick={() => removeAvailability(selectedEmployee, day)}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                        </tr>
                    ))}

                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Availability;