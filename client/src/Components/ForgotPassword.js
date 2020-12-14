import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Logo } from '../Assets/illustration.svg';
import LanguageIcon from '@material-ui/icons/Language';
import { COLORS } from '../Styles/Constants';

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
        <Title>
          Qwik<NewsWrap>News</NewsWrap>
        </Title>
      </TitleDiv>
      <PicDiv>
        <StyledIllustration />
      </PicDiv>
      <Card style={{ padding: '20px' }}>
        <Card.Body>
          <BoxTitle className='text-center mb-4'>Password Reset</BoxTitle>
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
            <StyledLink to='/login'>Log In</StyledLink>{' '}
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2' style={{ paddingTop: '20px' }}>
        Need an account? <StyledLink to='/sign-up'>Sign Up</StyledLink>
      </div>
    </>
  );
}

const StyledIllustration = styled(Logo)`
  height: 240px;
`;

const BoxTitle = styled.h1`
  font-size: 1.5rem;
`;

const PicDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  padding-left: 2px;
`;

const NewsWrap = styled.span`
  color: ${COLORS.primary};
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${COLORS.primary};
`;
