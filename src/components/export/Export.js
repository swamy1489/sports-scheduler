import React, { useContext, useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { EmployeeContext } from '../../context/Context';
import { Dropdown } from 'react-bulma-components';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchEmployees = async () => {
    const res = await fetch("employees/getEmployees");
    return res.json()
}

const fetchGamesByEmpoloyee = async (id) => {
    const res = await fetch(`/employees/getGamesByEmployee/${id}`);
    return res.json()
}

export default function Export() {
    // const [employees, status] = useContext(EmployeeContext);
    // const [selectedEmployee, setSelectedEmployee] = useState(employees.employees[0]);

    const [selectedEmployee, setSelectedEmployee] = useState();

    const {data:employees, status, refetch} = useQuery({
        queryKey: "employees",
        queryFn: () => fetchEmployees(),
        onSuccess: (data) => {
            setSelectedEmployee(data.employees[0]);
        } 
    });

    const handleSelect = (option) => {
        setSelectedEmployee(option)
    }

    const generatePdf = async(selectedEmployee) => {
        console.log({selectedEmployee})
        const id = selectedEmployee._id;
        let rows = [];
        await axios.get(`/employees/getGamesByEmployee/${id}`).then(res => {
            if(res.status === 200){
                rows = res.data.games.map(game =>
                    [game.title, game.ageGroup, new Date(game.datetime).toString(), game.location, game.fieldNumber, game.filmType]
                );
            }
        }).catch(err => {
            console.log(err);
        })
        
        const doc = new jsPDF();

        doc.text(`Schedlue for: ${selectedEmployee.first_name} ${selectedEmployee.last_name}`, 10, 10);
        doc.autoTable({
            head: [['Title', 'Age Group', 'Date and Time', 'Location', 'Filed Number', 'Film Type']],
            body: rows,
          })
        doc.save(`${selectedEmployee.first_name}_${selectedEmployee.last_name}_schedule.pdf`);
    }
    return (
        <>
            <div className="main" id="main">
                <h1 className="title">Export</h1>
                <br/>
                {status !== 'success' ?
                ( <h2>{status}</h2>)
                :
                (
                    <>
                        <h2>Export PDF for an employee</h2>
                        <Dropdown value={selectedEmployee} onChange={handleSelect}>
                            {employees.employees.map(employee => (
                                <Dropdown.Item className="has-text-black" key={employee._id} value={employee}>
                                    {employee.first_name} {employee.last_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                        &nbsp;
                        <button className="button" onClick={() => {generatePdf(selectedEmployee)}}>Export</button>
                    </>
                )
                }
            </div>
            
        </>
    )
}
