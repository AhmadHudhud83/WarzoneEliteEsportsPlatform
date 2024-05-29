import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrganizerAuthCheck from '../../../CheckAuth/OrganizerCheckAuth';



function EditeGame(){
    const { gameId } = useParams();
    const [formData, setFormData] = useState({
        key: '',
        name: '',
        imgUrl:''
      });
      const {isAuthChecked } =OrganizerAuthCheck();

const navigate = useNavigate()

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
            const response = await axios.put('http://localhost:5000/game/update', {
                id:gameId,
                ...formData
            });
            alert(response.data);
            navigate('/organizer/dashboard/players')

        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to update user. Please check the fields according to the required conditions.');
        }

      };
    



    useEffect(() => {
        axios.get(`http://localhost:5000/api/games/:gameName?id=${gameId}`)
          .then(response => {
            if(response.data !== "game not found"){
                setFormData({
                    name: response.data.name,
                    key: response.data.key,
                    imgUrl:response.data.imgUrl
                });
            }
            console.log(response.data);
           
          })
          .catch(error => {
            console.error('Error display game:', error);
          });

    }, [gameId]);
   
    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }
    return(
        
        <div className="container">
            <div className="mt-5">
                <h1 className="text-center">edit Game</h1>
                <form onSubmit={handleSubmit} className="col-md-6 mx-auto mt-5">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input  type="text" className="form-control" id="name" name="name" required value={formData.name} onChange={handleChange}/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="key">Key number</label>
                        <input type="number" className="form-control" id="key" name="key" required value={formData.key} onChange={handleChange}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imgUrl">Image_Url</label>
                        <input  type="text" className="form-control" id="imgUrl" name="imgUrl" required value={formData.imgUrl} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-end ">
                        <div className="p-2">
                            <Link to="/organizer/dashboard/games" className="btn btn-outline-light btn-secondary">Back</Link>
                        </div>
                        <div className="p-2">
                            <button type="submit" className="btn  btn-outline-light btn-primary mr-2">submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default EditeGame;