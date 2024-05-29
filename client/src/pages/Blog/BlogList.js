import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import BlogCard from './BlogCard';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css';


const backgrounds = [
  'https://wallpapercg.com/download/the-last-of-us-part-2-remastered--19602.jpg',
  'https://image.api.playstation.com/vulcan/ap/rnd/202101/0812/QDaRpXJyMxLjNvrNbpTgXf41.png',
  'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blte6c314d07513f6ce/64de6e3267e57a3505cec87a/CODMW3-Screenshot_10-1920x1080.png?imwidth=1920&imdensity=2.625',

];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="BlogList">
      <Header />
      <section className="background">
        {backgrounds.map((bg, index) => (
          <img
            key={index}
            src={bg}
            alt={`background ${index + 1}`}
          />
        ))}
        <Container className="content py-5 text-white">
          <Row className="text-center">
     
           
          </Row>
        </Container>
      </section>
      <Container className="my-5">
        <Row>
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default BlogList;
