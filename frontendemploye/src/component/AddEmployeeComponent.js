import React, { useState, useEffect } from 'react'
import EmployeeService from '../service/employeeservice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const employeeData = { firstName, lastName, email };

    function saveEmployee(e) {
        e.preventDefault();
        if (employeeData.firstName !== "" && employeeData.lastName !== "" && employeeData.email !== "") {
            if (id) {
                EmployeeService.updateEmployee(id, employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            } else {
                EmployeeService.saveEmployee(employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            }
        } else {
            alert("Please, fill in all inputs");
        }
    }

    function title() {
        return id ? "Update Employee" : "Add Employee";
    }

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then(res => {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                })
                .catch(e => console.log(e));
        }
    }, [id]);

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow-lg p-3 mb-5 bg-white rounded'>
                        <h2 className='text-center mb-4'>{title()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-3'>
                                    <label>First Name</label>
                                    <input className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text" placeholder='Enter First Name' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Last Name</label>
                                    <input className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text" placeholder='Enter Last Name' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email</label>
                                    <input className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" placeholder='Enter Email' />
                                </div>
                                <div className='d-grid gap-2'>
                                    <button onClick={(e) => saveEmployee(e)} className='btn btn-success btn-block'>Save</button>
                                    <Link to={"/employee"} className='btn btn-danger btn-block'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeComponent;
