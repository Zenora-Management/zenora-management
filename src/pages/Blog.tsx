
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Calendar, Clock, Tag } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How AI is Revolutionizing Property Management",
    excerpt: "Discover how artificial intelligence is transforming the property management industry with automation, predictive analytics, and more.",
    date: "June 15, 2023",
    readTime: "5 min read",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800&h=450"
  },
  {
    id: 2,
    title: "5 Ways to Optimize Rental Pricing with Data Analytics",
    excerpt: "Learn how property managers can leverage data analytics to set optimal rental prices and maximize returns.",
    date: "July 22, 2023",
    readTime: "7 min read",
    category: "Data Analytics",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800&h=450"
  },
  {
    id: 3,
    title: "The Future of Tenant Screening: AI-Powered Solutions",
    excerpt: "Explore how artificial intelligence is making tenant screening more accurate, efficient, and fair for property managers.",
    date: "August 10, 2023",
    readTime: "6 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800&h=450"
  },
  {
    id: 4,
    title: "Streamlining Maintenance Requests with Smart Technology",
    excerpt: "Discover how property managers are using smart technology to improve the maintenance request process for both staff and tenants.",
    date: "September 5, 2023",
    readTime: "4 min read",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800&h=450"
  },
  {
    id: 5,
    title: "How to Build a Strong Landlord-Tenant Relationship",
    excerpt: "Tips for property managers to foster positive relationships with tenants, leading to higher retention rates and fewer issues.",
    date: "October 12, 2023",
    readTime: "8 min read",
    category: "Management Tips",
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?auto=format&fit=crop&q=80&w=800&h=450"
  },
  {
    id: 6,
    title: "The Impact of Machine Learning on Rental Market Predictions",
    excerpt: "How machine learning algorithms are helping property managers make more accurate predictions about rental market trends.",
    date: "November 3, 2023",
    readTime: "6 min read",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450"
  }
];

const Blog = () => {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", ...new Set(BLOG_POSTS.map(post => post.category))];
  
  const filteredPosts = filter === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === filter);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Zenora Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Insights, trends, and expert advice on AI-powered property management and the real estate industry.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category
                    ? "bg-zenora-purple text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden flex flex-col">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-52 w-full object-cover"
                />
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1 text-zenora-purple" />
                      <span className="text-sm text-zenora-purple">{post.category}</span>
                    </div>
                    <ZenoraButton variant="outline" size="sm">Read More</ZenoraButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <ZenoraButton>Load More Articles</ZenoraButton>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
