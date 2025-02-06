import {useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import OrganizerAuthCheck from '../../../CheckAuth/OrganizerCheckAuth';
function GameAdd(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        key: '',
        name: '',
        imgUrl:''
      });

      const {isAuthChecked } =OrganizerAuthCheck();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });

        

      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/game/add', formData);
            alert(response.data);
            navigate('/organizer/dashboard/games');
            

        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add game. Please check the fields according to the required conditions.');
        }

      };

      if (!isAuthChecked) {
        return <div>Loading...</div>;
      }

    return(
        <div className="container">
            <div className="mt-5">
                <h1 className="text-center">Add Game</h1>
                <form onSubmit={handleSubmit} className="col-md-6 mx-auto mt-5">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input  type="text" className="form-control" id="name" name="name" required onChange={handleChange}/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="key">Key number</label>
                        <input type="number" className="form-control" id="key" name="key" required  onChange={handleChange}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imgUrl">Image_Url</label>
                        <input  type="text" className="form-control" id="imgUrl" name="imgUrl" required  onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-end ">
                        <div className="p-2">
                            <Link to="/organizer/dashboard/games" className="btn btn-outline-light btn-secondary">Back</Link>
                        </div>
                        <div className="p-2">
                            <button type="submit" className="btn  btn-outline-light btn-primary mr-2">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GameAdd;