import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--lightest-mimir-green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--light-mimir-green);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Abhishek Praveenkumar</h2>;
  const three = <h3 className="big-heading">Transforming code into elegant, functional solutions.</h3>;
  const four = (
    <>
    
      <p>
      I am an enterprising and passionate software engineer with a background at .
       
        <a href="https://www.tibco.com/" target="_blank" rel="noreferrer">
         TIBCO
        </a>{' '}
         I am pursuing my Master's degree in Computer Science and Engineering at{' '}
        <a href="hhttps://www.scu.edu/" target="_blank" rel="noreferrer">
          Santa Clara University
        </a>{' '}
       
        Previously, I was a Developer Intern at{' '}
        <a href="" target="_blank" rel="noreferrer">
          eTelic Inc.
        </a>{' '}
        where I did Front-End, Database Management, and BackEnd.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:amuttath@scu.edu?subject=Hello%20there&body=Hi%2C%20Abhishek%0A"
      target="_blank"
      rel="noreferrer"
    >
      Reach out to me!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
