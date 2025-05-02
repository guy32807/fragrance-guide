import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/BlogPosts';
import AffiliateLink from '../components/AffiliateLink';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import { AFFILIATE_LINK } from '../constants/links';

const BlogContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const BlogHeader = styled.header`
  margin-bottom: 2rem;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const BlogContent = styled.div`
  line-height: 1.8;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  a {
    color: #3a5a40;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  blockquote {
    border-left: 4px solid #3a5a40;
    padding-left: 1rem;
    font-style: italic;
    color: #6c757d;
  }
`;

const RelatedPosts = styled.section`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #dee2e6;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #3a5a40;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Find related posts (excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 2);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://yourdomain.com${post.imageUrl}`,
    author: {
      '@type': 'Person',
      name: 'Fragrance Guide',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fragrance Guide',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo192.png'
      }
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/blog/${post.slug}`
    },
    keywords: post.tags.join(', ')
  };
  
  return (
    <>
      <SEOHead
        title={`${post.title} | Fragrance Guide`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogImage={post.imageUrl}
        canonicalUrl={`https://yourdomain.com/blog/${post.slug}`}
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>
      
      <BlogContainer>
        <BackLink to="/">&larr; Back to Home</BackLink>
        
        <BlogHeader>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogMeta>
            Published on {formatDate(post.createdAt)}
            {post.updatedAt > post.createdAt && ` • Updated on ${formatDate(post.updatedAt)}`}
          </BlogMeta>
        </BlogHeader>
        
        <BlogImage src={post.imageUrl} alt={post.imageAlt} />
        
        <BlogContent>
          <ReactMarkdown
            components={{
              a: ({ node, href, children, ...props }) => {
                // Check if this is an affiliate link
                const isAffiliateLink = href && href.includes(AFFILIATE_LINK);
                
                if (isAffiliateLink) {
                  return (
                    <AffiliateLink 
                      trackingParams={`source=blog&post=${post.slug}`}
                      location="blog-content"
                    >
                      <a {...props}>{children}</a>
                    </AffiliateLink>
                  );
                }
                
                // For external links
                if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // For internal links
                return <a href={href} {...props}>{children}</a>;
              },
              // Add heading IDs for better navigation and linking
              h2: ({ node, ...props }) => {
                const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '';
                return <h2 id={id} {...props} />;
              },
              h3: ({ node, ...props }) => {
                const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '';
                return <h3 id={id} {...props} />;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </BlogContent>
        
        <CtaSection>
          <CtaTitle>Ready to explore premium fragrances?</CtaTitle>
          <CtaText>
            Find your perfect scent from our curated collection of luxury fragrances.
            Exclusive online discounts available now!
          </CtaText>
          <AffiliateLink
            location="blog-footer"
            campaignSource={`blog-${post.slug}`}
          >
            <CtaButton>Shop Now at FragranceShop.com</CtaButton>
          </AffiliateLink>
        </CtaSection>
        
        {relatedPosts.length > 0 && (
          <RelatedPosts>
            <h3>Related Posts</h3>
            <BlogGrid>
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.id}>
                  <BlogCardImage src={relatedPost.imageUrl} alt={relatedPost.imageAlt} />
                  <BlogCardContent>
                    <BlogCardTitle>{relatedPost.title}</BlogCardTitle>
                    <BlogCardExcerpt>{relatedPost.excerpt}</BlogCardExcerpt>
                    <ReadMoreLink to={`/blog/${relatedPost.slug}`}>Read More</ReadMoreLink>
                  </BlogCardContent>
                </BlogCard>
              ))}
            </BlogGrid>
          </RelatedPosts>
        )}
      </BlogContainer>
    </>
  );
};

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

const BlogCard = styled.article`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const BlogCardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const BlogCardContent = styled.div`
  padding: 1.25rem;
`;

const BlogCardTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const BlogCardExcerpt = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreLink = styled(Link)`
  color: #3a5a40;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CtaSection = styled.div`
  margin: 3rem 0;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
`;

const CtaTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const CtaText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const CtaButton = styled.span`
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

export default BlogPost;