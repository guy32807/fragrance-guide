import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AffiliateLink from './AffiliateLink';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3a5a40;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  
  &:hover {
    color: #3a5a40;
  }
`;

const ShopButton = styled.span`
  display: inline-block;
  background-color: #3a5a40;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #344e41;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Fragrance Guide</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blog/best-summer-fragrances-2025">Summer Fragrances</NavLink>
          <NavLink to="/blog/how-to-choose-signature-scent">Signature Scents</NavLink>
          <AffiliateLink trackingParams="source=nav">
            <ShopButton>Shop Now</ShopButton>
          </AffiliateLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;