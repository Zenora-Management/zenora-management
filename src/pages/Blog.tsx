
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Calendar, Clock, Tag, Plus } from "lucide-react";

const BLOG_POSTS: any[] = []; // Empty for now, will be populated manually later

const Blog = () => {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All"];
  
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
          
          {BLOG_POSTS.length > 0 ? (
            <>
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
                {BLOG_POSTS.map(post => (
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 p-4 bg-zenora-purple/10 rounded-full">
                <Plus className="h-8 w-8 text-zenora-purple" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Blog Content Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                We're working on bringing you valuable insights and articles about property management. Stay tuned for upcoming content!
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later for articles on property management trends, landlord tips, and rental market analysis.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
