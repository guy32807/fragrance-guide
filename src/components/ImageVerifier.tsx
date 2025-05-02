import React, { useState } from 'react';
import styled from 'styled-components';
import { getImagePath } from '../constants/paths';

const VerifierButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #3a5a40;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  z-index: 9999;
`;

const VerifierPanel = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 320px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 15px;
  z-index: 9999;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TestImage = styled.img`
  max-width: 100%;
  margin-top: 10px;
  border: 1px solid #eee;
`;

const ImageVerifier: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  
  if (!showPanel) {
    return (
      <VerifierButton onClick={() => setShowPanel(true)}>
        Verify Images
      </VerifierButton>
    );
  }
  
  const testImagePath = 'images/summer-fragrances.jpg';
  const resolvedPath = getImagePath(testImagePath);
  
  return (
    <>
      <VerifierButton onClick={() => setShowPanel(false)}>
        Hide Verifier
      </VerifierButton>
      
      <VerifierPanel>
        <h3>Image Path Verifier</h3>
        <p>Testing if images are loading correctly:</p>
        
        <div>
          <strong>Test Image:</strong>
          <p>Original: {testImagePath}</p>
          <p>Resolved: {resolvedPath}</p>
          <TestImage src={resolvedPath} alt="Test" />
        </div>
        
        <hr />
        
        <div>
          <h4>Environment:</h4>
          <p>NODE_ENV: {process.env.NODE_ENV}</p>
          <p>PUBLIC_URL: {process.env.PUBLIC_URL || '(not set)'}</p>
          <p>Location: {window.location.href}</p>
        </div>
      </VerifierPanel>
    </>
  );
};

export default ImageVerifier;