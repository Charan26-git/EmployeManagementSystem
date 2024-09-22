import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/employeeservice';

const ListEmployeeComponent = () => {
    const [employeeArray, setEmployeeArray] = useState([]);

    useEffect(() => {
        getAllEmployee();
    }, []);

    function getAllEmployee() {
        EmployeeService.getAllEmployee()
            .then(res => {
                setEmployeeArray(res.data);
                console.log(res);
            })
            .catch(e => console.log(e));
    }

    function deleteEmployee(e, id) {
        e.preventDefault();
        EmployeeService.deleteEmployee(id).then(() => getAllEmployee()).catch(e => console.log(e));
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col'>
                    <Link to={"/add-employee"} className='btn btn-primary mb-3'>Add Employee</Link>
                    <h2 className='text-center mb-4'>Employee List</h2>
                    <table className='table table-striped table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeArray.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <Link to={`/add-employee/${employee.id}`} className='btn btn-info mx-2'>Update</Link>
                                        <button onClick={(e) => deleteEmployee(e, employee.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListEmployeeComponent;
