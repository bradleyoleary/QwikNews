import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Logo } from '../Assets/illustration.svg';
import LanguageIcon from '@material-ui/icons/Language';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions. Thank you!');
    } catch {
      setError('Failed to reset password');
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
      <Card style={{ padding: '20px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' style={{ paddingBottom: '20px' }}>
              <Form.Control
                placeholder='Email'
                type='email'
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100'
              type='submit'
              style={{ backgroundColor: '#4a56e2', border: 'none' }}>
              Reset Password
            </Button>
          </Form>
          <div
            className='w-100 text-center mt-3'
            style={{ paddingTop: '20px' }}>
            <Link to='/login'>Log In</Link>{' '}
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2' style={{ paddingTop: '20px' }}>
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
