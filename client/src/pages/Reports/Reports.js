import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'open',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports');
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/reports', formData);
            setReports([...reports, response.data]);
            setFormData({ title: '', description: '', status: 'open' });
            setMessage('Report created successfully!');
        } catch (error) {
            setMessage('Error creating report: ' + error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reports/${id}`);
            setReports(reports.filter(report => report._id !== id));
            setMessage('Report deleted successfully!');
        } catch (error) {
            setMessage('Error deleting report');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Reports</h1>
            {message && <Alert variant="info">{message}</Alert>}
            <Row>
                <Col md={6}>
                    <h3>Create Report</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                minLength={3}
                                maxLength={100}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                minLength={10}
                                maxLength={1000}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <h3>All Reports</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report._id}>
                                    <td>{report.title}</td>
                                    <td>{report.description}</td>
                                    <td>{report.status}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(report._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Reports;
