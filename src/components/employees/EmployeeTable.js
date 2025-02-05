import { React, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EmployeeTable = ({data, status, deleteEmployee}) => {
    return (
        <>
        <table className="table is-striped is-narrow is-fullwidth">
            <thead>
                <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Can Set Up</th>
                <th>Needs Training</th>
                <th>Manual Film</th>
                <th>Veo</th>
                <th>Soccer</th>
                <th>Football</th>
                <th>Live Stream</th>
                <th>Address</th>
                <th>View Games</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                {status !== "success" ? 
                (<tr><td>{status}</td></tr>)
                : 
                (data.employees.map(employee => (
                    <tr key={employee._id}>
                    <td>{employee.first_name} {employee.last_name}</td>
                    <td>{employee.age}</td>
                    <td>{employee.canSetUp ? ("Yes") : ("No")}</td>
                    <td>{employee.needsTraining ? ("Yes") : ("No")}</td>
                    <td>{employee.canManualRecord ? ("Yes") : ("No")}</td>
                    <td>{employee.canVeo ? ("Yes") : ("No")}</td>
                    <td>{employee.canFilmSoccer ? ("Yes") : ("No")}</td>
                    <td>{employee.canFilmFootball ? ("Yes") : ("No")}</td>
                    <td>{employee.canLiveStream ? ("Yes") : ("No")}</td>
                    <td>{employee.address}</td>
                    <td>
                        <Link className="button" to={`/employees/viewgames/${employee._id}`}>                            
                            <span>View</span>
                        </Link>
                    </td>
                    <td>
                        <Link className="button is-primary" to={`/employees/edit/${employee._id}`}>                            
                            <FontAwesomeIcon icon={faEdit}/>&nbsp;<span>Edit</span>
                        </Link>
                    </td>
                    <td><button className="button is-danger" onClick={() => deleteEmployee.mutate(employee)} type="button"><FontAwesomeIcon icon={faTrashAlt}/>&nbsp;<span>Delete</span></button></td>
                    </tr>
                )))}
            </tbody>
        </table>
        </>
    )
}

export default EmployeeTable;