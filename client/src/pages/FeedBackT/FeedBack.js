import "./FeedBack.css";
import axios from "axios";
import { useState } from "react";

export const Feedback = () => {
  const [formData, setFormData] = useState({
    feedback_content: "",
    position: "",
  
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await axios.post("http://localhost:5000/api/feedback", formData).then((response) => {
      setMessage("Feedback submitted successfully!");
        setFormData({
          feedback_content: "",
          position:"",
        
        });
    })
    

      .catch((error) => {
        console.log(error);
      setMessage("Error submitting feedback. Please try again.");
    }
  
)
};
      
  return (
    <div className="feedback-container">
      <span className="close-btn">X</span>
      <div className="header">Got feedback? Don't hold it</div>
      <div className="support-text">
        If you need help with the tournament you are currently in, please reach out to the tournament organizers.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="position">How do you use Warzone Elite?</label>
          <select
            className="form-control"
            
            name="position"
            required
            onChange={handleChange}
            value={formData.position}
          >
            <option value="">Select one...</option>
            <option value="Tournament discovery and participation">Tournament discovery and participation</option>
            <option value="Tournament supervision">Tournament supervision</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="feedback_content">What do you like and use most? What needs improvement? Please share your thoughts:</label>
          <textarea
            className="form-control"
            id="feedback_content"
            name="feedback_content"
            rows={3}
            required
            placeholder="Your feedback"
            onChange={handleChange}
            value={formData.feedback_content}
          />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};
