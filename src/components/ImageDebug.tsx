import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getImagePath, checkImageExistence } from '../constants/paths';

const DebugContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  font-family: monospace;
`;

const DebugItem = styled.div`
  margin-bottom: 8px;
`;

const DebugButton = styled.button`
  background-color: #3a5a40;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #344e41;
  }
`;

const ImageDebug: React.FC<{ imagePath: string }> = ({ imagePath }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [workingPaths, setWorkingPaths] = useState<string[]>([]);
  const [isCheckingPaths, setIsCheckingPaths] = useState(false);
  
  const resolvedPath = getImagePath(imagePath);
  
  useEffect(() => {
    // Reset states when imagePath changes
    setImageLoaded(false);
    setImageError(false);
    setWorkingPaths([]);
  }, [imagePath]);
  
  const handleTestPaths = async () => {
    setIsCheckingPaths(true);
    try {
      const paths = await checkImageExistence(imagePath);
      setWorkingPaths(paths);
    } catch (error) {
      console.error('Error checking paths:', error);
    } finally {
      setIsCheckingPaths(false);
    }
  };
  
  return (
    <DebugContainer>
      <h4>Image Debug</h4>
      <DebugItem>Environment: {process.env.NODE_ENV}</DebugItem>
      <DebugItem>PUBLIC_URL: {process.env.PUBLIC_URL || '(not set)'}</DebugItem>
      <DebugItem>Original path: {imagePath}</DebugItem>
      <DebugItem>Resolved path: {resolvedPath}</DebugItem>
      <DebugItem>Status: {
        imageLoaded ? 'Loaded ✅' : 
        imageError ? 'Failed to load ❌' : 
        'Loading...'
      }</DebugItem>
      
      <img 
        src={resolvedPath} 
        alt="Debug" 
        style={{ maxWidth: '200px', display: 'block', marginTop: '8px' }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      
      <DebugButton onClick={handleTestPaths} disabled={isCheckingPaths}>
        {isCheckingPaths ? 'Checking...' : 'Test Alternative Paths'}
      </DebugButton>
      
      {workingPaths.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <h5>Working Paths:</h5>
          <ul>
            {workingPaths.map((path, i) => (
              <li key={i}>{path}</li>
            ))}
          </ul>
        </div>
      )}
      
      {process.env.NODE_ENV === 'development' && (
        <>
          <h5>Common Path Formats:</h5>
          <ul>
            <li>/{imagePath}</li>
            <li>{process.env.PUBLIC_URL}/{imagePath}</li>
            <li>/fragrance-guide/{imagePath}</li>
          </ul>
          
          <h5>Current Browser Location:</h5>
          <div>{typeof window !== 'undefined' ? window.location.href : 'Not available'}</div>
        </>
      )}
    </DebugContainer>
  );
};

export default ImageDebug;