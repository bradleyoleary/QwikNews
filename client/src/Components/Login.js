import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Logo } from '../Assets/illustration.svg';
import LanguageIcon from '@material-ui/icons/Language';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to sign in. Try again!');
    }

    setLoading(false);
  }
  return (
    <>
      <TitleDiv>
        <LanguageIcon style={{ fontSize: 50, color: '#4a56e2' }} />
        <Title>QwikNews</Title>
      </TitleDiv>
      <PicDiv>
        <StyledIllustration />
      </PicDiv>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100'
              type='submit'
              style={{ backgroundColor: '#4a56e2', border: 'none' }}>
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>{' '}
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/sign-up'>Sign Up</Link>
      </div>
    </>
  );
}

const StyledIllustration = styled(Logo)`
  height: 240px;
`;

const PicDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 50px;
  padding-left: 10px;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
