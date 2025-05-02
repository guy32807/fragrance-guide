import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AffiliateLink from './AffiliateLink';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 3rem 0;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #3a5a40;
`;

const FooterLink = styled(Link)`
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: #495057;
  transition: color 0.3s;
  
  &:hover {
    color: #3a5a40;
  }
`;

const FooterSpan = styled.span`
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: #495057;
  transition: color 0.3s;
  cursor: pointer;
  
  &:hover {
    color: #3a5a40;
  }
`;

const FooterText = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #6c757d;
  font-size: 1.25rem;
  transition: color 0.3s;
  
  &:hover {
    color: #3a5a40;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  text-align: center;
  color: #6c757d;
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Fragrance Guide</FooterTitle>
          <FooterText>
            Your trusted source for fragrance recommendations and insights. 
            Discover your perfect scent with our expert guidance.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></SocialIcon>
            <SocialIcon href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></SocialIcon>
            <SocialIcon href="#" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Explore</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/blog/best-summer-fragrances-2025">Summer Fragrances</FooterLink>
          <FooterLink to="/blog/how-to-choose-signature-scent">Signature Scents</FooterLink>
          <AffiliateLink>
            <FooterSpan>Shop Fragrances</FooterSpan>
          </AffiliateLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/about">About</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>
            Subscribe to receive updates, access to exclusive deals, and more.
          </FooterText>
          {/* Newsletter form would go here */}
        </FooterSection>
      </FooterContent>
      
      <BottomBar>
        <p>© {new Date().getFullYear()} Fragrance Guide. All rights reserved.</p>
        <p>This website contains affiliate links. We may earn a commission if you make a purchase through our links.</p>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;