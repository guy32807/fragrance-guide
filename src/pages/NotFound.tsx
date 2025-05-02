import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 5rem 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #6c757d;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
`;

const PrimaryButton = styled(Button)`
  background-color: #3a5a40;
  color: white;
  
  &:hover {
    background-color: #344e41;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

// Create a span version of the SecondaryButton
const SecondaryButtonSpan = styled.span`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Page Not Found | Fragrance Guide"
        description="The page you're looking for cannot be found. Explore our fragrance guides and recommendations instead."
        keywords="404, page not found, fragrances"
        ogTitle="Page Not Found | Fragrance Guide"
        ogDescription="Sorry, the page you're looking for cannot be found."
      />
      
      <NotFoundContainer>
        <Title>404</Title>
        <Subtitle>Oops! The page you're looking for cannot be found.</Subtitle>
        
        <ButtonGroup>
          <PrimaryButton to="/">Back to Home</PrimaryButton>
          <AffiliateLink>
            <SecondaryButtonSpan>Shop Fragrances</SecondaryButtonSpan>
          </AffiliateLink>
        </ButtonGroup>
      </NotFoundContainer>
    </>
  );
};

export default NotFound;