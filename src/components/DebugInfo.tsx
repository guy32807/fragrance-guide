import React from 'react';
import styled from 'styled-components';

const DebugContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 15px;
  margin: 15px 0;
  font-family: monospace;
  font-size: 12px;
`;

const DebugInfo: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <DebugContainer>
      <h3>Debug Info</h3>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>PUBLIC_URL: {process.env.PUBLIC_URL || '(not set)'}</p>
      <p>Window Location: {window.location.href}</p>
      <p>Hostname: {window.location.hostname}</p>
      <p>Pathname: {window.location.pathname}</p>
      <p>Image example path: {`${process.env.PUBLIC_URL}/images/summer-fragrances.jpg`}</p>
    </DebugContainer>
  );
};

export default DebugInfo;