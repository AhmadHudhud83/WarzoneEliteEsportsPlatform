import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import { Container, Row, Col, Image } from 'react-bootstrap';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(response.data);
    };
    fetchBlog();
  }, [id]);


  if (!blog) {
    return <div>Loading...</div>;
  }


  
  return (
    <div>
      <Header />
      <section className="py-5" style={{ backgroundImage: 'url(https://assetsio.gnwcdn.com/TLOUP-SITE.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h2>{blog.title}</h2>
              <p>Author: {blog.author}</p>
              <p>Published on: {new Date(blog.published_date).toDateString()}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Image src={blog.image} fluid className="mb-4" />
            <p>{blog.content}</p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default BlogDetail;
