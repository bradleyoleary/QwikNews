import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Logo } from '../Assets/illustration.svg';
import LanguageIcon from '@material-ui/icons/Language';
import { db } from './Firebase';
import { COLORS } from '../Styles/Constants';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match. Please try again!');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await db.collection('users').doc(currentUser.uid).set({
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        providerId: currentUser.providerId,
      });
      history.push('/onboarding');
    } catch {
      setError('Failed to create an account. Please try again!');
    }

    setLoading(false);
  }
  return (
    <>
      <TitleDiv>
        <LanguageIcon style={{ fontSize: 45, color: '#4a56e2' }} />
        <Title>
          Qwik<NewsWrap>News</NewsWrap>
        </Title>
      </TitleDiv>
      <PicDiv>
        <StyledIllustration />
      </PicDiv>
      <Card style={{ padding: '20px' }}>
        <Card.Body>
          <BoxTitle className='text-center mb-4'>Sign Up</BoxTitle>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' style={{ paddingBottom: '20px' }}>
              <Form.Control
                placeholder='Email'
                type='email'
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id='password' style={{ paddingBottom: '20px' }}>
              <Form.Control
                placeholder='Password'
                type='password'
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id='password-confirm' style={{ paddingBottom: '20px' }}>
              <Form.Control
                placeholder='Password Confirmation'
                type='password'
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100'
              type='submit'
              style={{ backgroundColor: '#4a56e2', border: 'none' }}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2' style={{ paddingTop: '20px' }}>
        Already have an account? <StyledLink to='/login'>Log In</StyledLink>
      </div>
    </>
  );
}

const BoxTitle = styled.h1`
  font-size: 1.5rem;
`;

const StyledIllustration = styled(Logo)`
  height: 240px;
`;

const PicDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  padding: 2px;
`;

const NewsWrap = styled.span`
  color: ${COLORS.primary};
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: ${COLORS.primary};
`;
