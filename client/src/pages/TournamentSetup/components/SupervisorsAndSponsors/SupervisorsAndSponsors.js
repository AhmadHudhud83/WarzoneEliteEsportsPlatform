import React, { useState } from 'react';
import './SupervisorsAndSponsors.css';

const SupervisorsAndSponsors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type) => {
    setModalType(type);
    setNewEntry('');
  };

  const handleAddEntry = () => {
    if (!newEntry.trim() || supervisors.concat(sponsors).includes(newEntry)) {
      alert('Please enter a unique name. Duplicates are not allowed.');
      return;
    }

    if (modalType === 'supervisor') {
      setSupervisors(prev => [...prev, newEntry].sort());
    } else if (modalType === 'sponsor') {
      setSponsors(prev => [...prev, newEntry].sort());
    }
    setNewEntry('');
    setModalType('');
  };

  const handleCloseModal = () => {
    setModalType('');
    setNewEntry('');
  };

  const renderTable = (items, title) => (
    <div className='p-5 border my-5'>
      <h3>{title}</h3>
      <table className="table table-dark table-striped mt-4g">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mt-3">
        
      <button className="btn btn-primary me-3" onClick={() => handleOpenModal('supervisor')}>
        + Add Supervisor
      </button>

      <button className="btn btn-secondary ml-2" onClick={() => handleOpenModal('sponsor')}>
        + Add Sponsor
      </button>
      
      {modalType && (
        <div className="modal show  " tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog ">
            <div className="modal-content bg-dark rounded">
              <div className="modal-header">
                <h5 className="modal-title text-muted">Add {modalType}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Enter ${modalType} name`}
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleAddEntry}>
                  Add
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {supervisors.length > 0 && renderTable(supervisors, 'Supervisors')}
      {sponsors.length > 0 && renderTable(sponsors, 'Sponsors')}
    </div>
  );
};

export default SupervisorsAndSponsors;
