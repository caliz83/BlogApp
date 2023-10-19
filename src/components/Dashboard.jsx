import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container, Modal, Form, Accordion, Row, Col, ListGroup } from "react-bootstrap/";
import { LoggedInData, checkToken, AddBlogItems, sendBlogData } from '../services/DataService';

const Dashboard = () => {

    let navigate = useNavigate();
    useEffect(() => {
    if(!checkToken()){
        navigate('/Login');
    }

    let userInfo = LoggedInData();
    console.log(userInfo);
    }, [])

    //functions
    const handleSetTitle = (e) => setBlogTitle(e.target.value);
    const handleBlogDescription = (e) => setBlogDescription(e.target.value);
    const handleTag = (e) => setBlogTags(e.target.value);
    const handleCategory = (e) => setBlogCategory(e.target.value);
    //const handleImage = (e) => setBlogImage(e.target.value);
    const handleClose = (e) => setShow(false);

    //when true, modal shows
    const handleShow = (e) => {
        setShow(true);
        if(e.target.textContent === "Add Blog Item"){
            setImmediate(false);
            setBlogTitle("");
            setBlogDescription("");
            setBlogCategory("");
        } else {
            setEdit(true);
            setBlogTitle("Yass, queen!");
            setBlogDescription("Spill the tea, betch");
            setBlogCategory("Butch the Builder")
        }
    }

    //useStates
    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");
    const [userId, setUserId] = useState(0);
    const [publisherName, setPublisherName] = useState("");
    const [blogItems, setBlogItems] = useState([]);

    //bools
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleSaveWithPublish = async () => {
        let {publisherName, userId} = LoggedInData();

        const Published = {
            Id: 0,
            UserId: userId,
            PublisherName: publisherName,
            Title: blogTitle,
            Image: blogImage,
            Description: blogDescription,
            Category: blogCategory,
            Tag: blogTags,
            Date: new Date(),
            IsDeleted: false,
            IsPublished: true
        }

        console.log(Published);
        handleClose();
        let result = await AddBlogItems(Published);

        if(result){
            let userBlogItems = await sendBlogData(GetItemsByUserId/${UserId});
            setBlogItems(userBlogItems);
            console.log(userBlogItems, "this worked!");
        }
    }

    const handleSaveWithUnpublish = async () => {

        let {publisherName, userId} = LoggedInData();
        
        const NotPublished = {
            Id: 0,
            UserId: userId,
            PublisherName: publisherName,
            Title: blogTitle,
            Image: blogImage,
            Description: blogDescription,
            Category: blogCategory,
            Tag: blogTags,
            Date: new Date(),
            IsDeleted: false,
            IsPublished: false
        }

        console.log(NotPublished);
        handleClose();
        let result = await AddBlogItems(NotPublished);

        if(result){
            let userBlogItems = await sendBlogData(GetItemsByUserId/${UserId});
            setBlogItems(userBlogItems);
            console.log(userBlogItems, "this worked!");
        }
    }

    const handleImage = async (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }
    
  return (
    <>
      <Container>
        <Button className="me-3" variant="outline-primary" onClick={handleShow}>
          Add Blog Item
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ background: "bisque" }} closeButton>
            <Modal.Title style={{ background: "bisque" }}>
              {edit ? "Edit" : "Add"} Blog Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "bisque" }}>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={blogTitle}
                  onChange={handleSetTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleBlogDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Select
                  aria-label="Default select example"
                  value={blogCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tags"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select Image From File"
                  accept="image/png, image/jpg"
                  // value={blogImage}
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ background: "bisque" }}>
            <Button variant="outline-success" onClick={handleSaveWithUnpublish}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSaveWithPublish}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="outline-primary" onClick={handleShow}>
          Edit Blog Item
        </Button>{" "}
        <Row>
          <Col>
            <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Published</Accordion.Header>
                <Accordion.Body
                  style={{ backgroundColor: "#f2f2f2", color: "black" }}
                >
                  {blogItems.map((item, i) =>
                    item.isPublished ? (
                      <ListGroup key={i}>{item.title}
                        <Col className="d-flex justify-content-end">
                          <Button variant="outline-danger mx-2">Delete</Button>
                          <Button variant="outline-info mx-2">Edit</Button>
                          <Button variant="outline-primary mx-2">Unpublish</Button>
                        </Col>
                      </ListGroup>
                    ) : null
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Unpublished</Accordion.Header>
                <Accordion.Body
                  style={{ backgroundColor: "#f2f2f2", color: "black" }}
                >
                  {blogItems.map((item, i) =>
                    !item.isPublished ? (
                      <ListGroup key={i}>{item.title}
                        <Col className="d-flex justify-content-end">
                          <Button variant="outline-danger mx-2">Delete</Button>
                          <Button variant="outline-info mx-2">Edit</Button>
                          <Button variant="outline-primary mx-2">Publish</Button>
                        </Col>
                      </ListGroup>
                    ) : null
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
