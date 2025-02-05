import React from 'react';
import { useQuery } from 'react-query';


export const EmployeeContext = React.createContext();

const fetchEmployees = async () => {
    const res = await fetch("employees/getEmployees");
    return res.json()
}

const EmployeeContextProvider = ({children}) => {
    const {data, status, refetch} = useQuery('employees', fetchEmployees);
    

    //Need to add a Default employeee to load while fetching is occuring?
    

    return (
        
        <EmployeeContext.Provider value={[data.employees, status]}>
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider
