import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Grid from "./components/Grid";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";
import Form from "./components/Form";


const Container = styled.div`
  width: 100%;
  max-width: 90%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [onEdit, setOnEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Container>
        <Title>Buzz Aladim</Title>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>Novo passageiro</Button>
          <Grid setOnEdit={setOnEdit}/>
          <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
              <Modal.Header closeButton>
                  <Modal.Title>Novo Passageiro</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onEdit={onEdit} setOnEdit={setOnEdit} />
              </Modal.Body>
          </Modal>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
