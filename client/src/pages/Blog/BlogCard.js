import React from 'react';
import { Card } from 'react-bootstrap';

const BlogCard = ({ blog }) => {
 
  const imageUrl = blog.image || 'path/to/default/image.jpg';

  return (
    <div className="col-lg-12 mb-4">
      <Card className="h-100">
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          style={{ maxHeight: '500px', objectFit: 'cover' }} 
        />
        <Card.Body>
          <Card.Title className="text-primary">{blog.title}</Card.Title>
          <Card.Text style={{ color: 'gray' }}>
            {blog.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-dark text-white">
          <small>by {blog.author} on {new Date(blog.published_date).toDateString()}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default BlogCard;
