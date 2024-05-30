import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Contactrequests.css"
export const ContactRequest = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/contacts')
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-white">Client Request Data</h1>
            <table className="table table-dark table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Email</th>
                        <th scope="col">Main Goal</th>
                        <th scope="col">Industry</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact._id}>
                            <td>{contact.fullName}</td>
                            <td>{contact.company}</td>
                            <td>{contact.email}</td>
                            <td>{contact.mainGoal}</td>
                            <td>{contact.industry}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}