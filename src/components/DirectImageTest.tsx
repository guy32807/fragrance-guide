import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 20px;
  margin: 20px 0;
`;

const TestTitle = styled.h3`
  margin-top: 0;
  color: #3a5a40;
`;

const ImageWrapper = styled.div`
  margin: 20px 0;
  border: 1px solid #ddd;
  padding: 10px;
`;

const Description = styled.div`
  font-family: monospace;
  margin-top: 8px;
`;

const DirectImageTest: React.FC = () => {
  // Array of test cases
  const testCases = [
    {
      title: "Direct path",
      path: "images/summer-fragrances.jpg",
      description: "images/summer-fragrances.jpg"
    },
    {
      title: "With leading slash",
      path: "/images/summer-fragrances.jpg",
      description: "/images/summer-fragrances.jpg"
    },
    {
      title: "With repo name",
      path: "/fragrance-guide/images/summer-fragrances.jpg",
      description: "/fragrance-guide/images/summer-fragrances.jpg"
    },
    {
      title: "With absolute URL",
      path: "https://guy32807.github.io/fragrance-guide/images/summer-fragrances.jpg",
      description: "https://guy32807.github.io/fragrance-guide/images/summer-fragrances.jpg"
    },
    {
      title: "With PUBLIC_URL",
      path: `${process.env.PUBLIC_URL}/images/summer-fragrances.jpg`,
      description: `\${process.env.PUBLIC_URL}/images/summer-fragrances.jpg`
    }
  ];

  return (
    <TestContainer>
      <TestTitle>Direct Image Testing</TestTitle>
      <p>This component tests different ways of loading the same image.</p>
      
      {testCases.map((test, index) => (
        <ImageWrapper key={index}>
          <h4>{test.title}</h4>
          <img 
            src={test.path}
            alt={`Test ${index + 1}`}
            style={{ maxWidth: '300px', display: 'block' }}
            onLoad={(e) => console.log(`Image loaded: ${test.path}`)}
            onError={(e) => console.error(`Image failed to load: ${test.path}`)}
          />
          <Description>Path: {test.description}</Description>
        </ImageWrapper>
      ))}
      
      <div>
        <strong>Environment Info:</strong>
        <pre>
          NODE_ENV: {process.env.NODE_ENV}<br />
          PUBLIC_URL: {process.env.PUBLIC_URL || '(not set)'}<br />
          Location: {typeof window !== 'undefined' ? window.location.href : 'N/A'}
        </pre>
      </div>
    </TestContainer>
  );
};

export default DirectImageTest;