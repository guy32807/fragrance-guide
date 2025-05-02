import React from 'react';
import { AFFILIATE_LINK } from '../constants/links';

interface AffiliateLinkProps {
  children: React.ReactNode;
  productId?: string;
  className?: string;
  trackingParams?: string;
  location?: string;
  campaignSource?: string;
}

// Helper function to safely access gtag
const trackEvent = (eventName: string, eventParams: Record<string, any>) => {
  try {
    // Check if window and gtag exist and gtag is a function
    if (
      typeof window !== 'undefined' && 
      'gtag' in window && 
      typeof (window as any).gtag === 'function'
    ) {
      (window as any).gtag('event', eventName, eventParams);
    }
  } catch (error) {
    // Silently handle errors in analytics to avoid breaking the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics tracking error:', error);
    }
  }
};

const AffiliateLink: React.FC<AffiliateLinkProps> = ({ 
  children, 
  productId = '', 
  className = '',
  trackingParams = '',
  location = '',
  campaignSource = ''
}) => {
  // Build tracking parameters
  const params = new URLSearchParams();
  if (productId) params.append('url', productId);
  if (trackingParams) params.append('tracking', trackingParams);
  if (location) params.append('location', location);
  if (campaignSource) params.append('utm_source', campaignSource);
  
  // Add default parameters for analytics
  params.append('utm_medium', 'affiliate');
  params.append('utm_campaign', 'fragrance-guide');
  
  const queryString = params.toString();
  const fullLink = `${AFFILIATE_LINK}${queryString ? `&${queryString}` : ''}`;
  
  const handleClick = () => {
    // Track the event
    trackEvent('affiliate_link_click', {
      link_url: fullLink,
      product_id: productId || 'not-specified',
      location: location || 'not-specified',
      campaign_source: campaignSource || 'not-specified'
    });
    
    // Log click for debugging during development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Affiliate link clicked: ${fullLink}`);
    }
  };
  
  return (
    <a 
      href={fullLink} 
      className={className}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default AffiliateLink;