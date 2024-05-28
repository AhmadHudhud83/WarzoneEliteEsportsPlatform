import styles from './SupervisorsModal.module.css';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SupervisorsModal = ({ showModal, setShowModal, tournamentId }) => {
    const [supervisors, setSupervisors] = useState([]);
    const [selectedSupervisors, setSelectedSupervisors] = useState([]);

    useEffect(() => {
        if (showModal) {
            // Get all supervisors
            axios.get('http://localhost:5000/supervisor/allsupervisor')
                .then(res => {
                    const supervisors = res.data.map(supervisor => ({
                        value: supervisor._id,
                        label: supervisor.name + " (" + supervisor.email + ")",
                    }));
                    setSupervisors(supervisors);
                }).catch(err => {
                    console.error(err);
                });

            // Get supervisors for the tournament
            axios.get(`/api/tournaments/${tournamentId}/supervisors`)
                .then(res => {
                    const selectedSupervisors = res.data.map(supervisor => ({
                        value: supervisor._id,
                        label: supervisor.name
                    }));
                    setSelectedSupervisors(selectedSupervisors);
                }).catch(err => {
                    console.error(err);
                });
        }
    }, [showModal, tournamentId]);

    const onConfirm = () => {
        // Rename label to name
        const newSupervisors = selectedSupervisors.map(supervisor => ({
            _id: supervisor.value,
            name: supervisor.label
        }))

        // Update supervisors
        axios.patch(`/api/tournaments/${tournamentId}/supervisors`, { newSupervisors })
            .then(() => {
                setShowModal(false);
            });
    };

    const onClose = () => {
        setShowModal(false);
    }

    // Custom styles for react-select
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black',
            backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightgray' : 'white',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black'
        }),
        clearIndicator: (provided) => ({
            ...provided,
            backgroundColor: '#151b26',
            height: '100%',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            backgroundColor: '#151b26',
            height: '100%',
        }),
    }

    return (
        <div className={`${styles.modal} ${showModal ? styles.show : ''} `}>
            <div className={`${styles.modalContent } border`}>
                <h3>Supervisors</h3>
                <Select
                
                    options={supervisors}
                    value={selectedSupervisors}
                    onChange={(selectedOptions) => {
                        setSelectedSupervisors(selectedOptions.map(option => ({
                            ...option,
                            label: option.label.split(" (")[0]
                        })));
                    }}
                    isMulti
                    styles={customStyles}
                    isClearable={true}

                />
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={`${styles.cancel} btn btn-outline-secondary  `} >Cancel</button>
                    <button onClick={onConfirm} className={`${styles.confirm} btn btn-outline-light`}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default SupervisorsModal;