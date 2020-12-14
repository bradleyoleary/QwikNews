import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../Assets/Onboarding.svg';
import { COLORS } from '../Styles/Constants';
import LanguageIcon from '@material-ui/icons/Language';
import { useHistory } from 'react-router-dom';

function OnboardingPage() {
  let history = useHistory();
  const handleRedirect = () => {
    history.push(`/`);
  };
  return (
    <>
      <Wrapper>
        <TitleDiv>
          <LanguageIcon style={{ fontSize: 45, color: '#4a56e2' }} />
          <Title>
            Qwik<NewsWrap>News</NewsWrap>
          </Title>
        </TitleDiv>
        <StyledImg />
        <Button onClick={handleRedirect}>Get Started!</Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20% 0 0 30px;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-right: 28px;
  font-size: 2rem;
  padding-left: 2px;
`;

const NewsWrap = styled.span`
  color: ${COLORS.primary};
`;

const StyledImg = styled(Logo)`
  height: 50vh;
  max-width: 450px;
  width: auto;
  padding: 0px 0px 0px 0px;
  /* margin-left: 40px; */
`;

const Button = styled.button`
  justify-content: center;
  display: flex;
  margin-top: 20px;
  background: ${COLORS.secondary};
  color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 30px 50px 0px 30px;
  width: 65vw;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default OnboardingPage;
