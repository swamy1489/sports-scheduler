import React from 'react';
// import "./employees.sass";
import { useQuery , useMutation } from 'react-query';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';
 
const fetchEmployees = async () => {
    const res = await fetch("employees/getEmployees");
    return res.json()
}

const Employees = () => {
    const {data, status, refetch} = useQuery('employees', fetchEmployees);

    const deleteEmployee = useMutation(async employee => {
        await axios.delete("employees/deleteEmployee/" + employee._id)
        .then(res => {
            if(res.status === 200){
                //TODO: Show success toast for successfully deleted
                refetch();
            }
            else{
                //TODO: Show error toast for "unable to delete"
                refetch();
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err);
            refetch();
        })
    });

    return (
        <div className="main" id="main">
        {deleteEmployee.isLoading ? (
            "Deleting Employee..."
        ) : (
            <>
                
            <br/>
            <h1 className="title">View Employees</h1>
            <div className="columns is-multiline">
                <div className="column">
                    <EmployeeTable data={data} status={status} deleteEmployee={deleteEmployee}/>
                </div>
            </div>
        
            </>
        )
        }
        </div>
    );
}

export default Employees;