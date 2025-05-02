import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AffiliateLink from '../components/AffiliateLink';
import { blogPosts } from '../data/BlogPosts';

const HeroSection = styled.section`
  text-align: center;
  padding: 5rem 1rem;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.span`
  display: inline-block;
  background-color: #3a5a40;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #344e41;
  }
`;

const BlogSection = styled.section`
  margin: 3rem 0;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.article`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const BlogExcerpt = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const ReadMoreLink = styled(Link)`
  color: #3a5a40;
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FeaturedProducts = styled.section`
  margin: 3rem 0;
`;

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Premium Fragrances | Discover Your Perfect Scent"
        description="Explore our curated collection of premium fragrances. Find your signature scent with expert recommendations and exclusive discounts."
        keywords="fragrances, perfume, cologne, designer scents, premium fragrances"
        ogTitle="Premium Fragrances | Your Perfect Scent Awaits"
        ogDescription="Discover luxury fragrances at exceptional prices. Free shipping on orders over $50."
        ogImage="/images/og-home.jpg"
        canonicalUrl="https://yourdomain.com/"
      />
      
      <HeroSection>
        <HeroTitle>Discover Your Perfect Fragrance</HeroTitle>
        <HeroSubtitle>
          Explore our curated collection of premium fragrances from the world's most respected perfumers. 
          From timeless classics to the latest releases, find your signature scent with us.
        </HeroSubtitle>
        <AffiliateLink>
          <CTAButton>Shop Premium Fragrances</CTAButton>
        </AffiliateLink>
      </HeroSection>
      
      <BlogSection>
        <h2>Fragrance Insights</h2>
        <BlogGrid>
          {blogPosts.map((post) => (
            <BlogCard key={post.id}>
              <BlogImage src={post.imageUrl} alt={post.imageAlt} />
              <BlogContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <ReadMoreLink to={`/blog/${post.slug}`}>Read More</ReadMoreLink>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </BlogSection>
      
      <FeaturedProducts>
        <h2>Featured Fragrances</h2>
        {/* Featured products component would go here */}
      </FeaturedProducts>
    </>
  );
};

export default HomePage;