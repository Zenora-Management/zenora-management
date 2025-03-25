
import { useState } from "react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Home, Search, FileText, Download, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AIRentAnalysis = () => {
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState<string>("2");
  const [bathrooms, setBathrooms] = useState<string>("2");
  const [sqft, setSqft] = useState<string>("1200");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<null | {
    rentEstimate: string;
    confidence: number;
    comparables: {
      address: string;
      rent: string;
      bedrooms: number | string;
      bathrooms: number | string;
      sqft: number | string;
      imageUrl?: string | null;
    }[];
    marketInsights: {
      increaseLastYear: number;
      projectedGrowth: number;
      daysOnMarket: number;
    };
  }>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Call our Supabase Edge Function to get Zillow data
      const { data, error } = await supabase.functions.invoke('zillow-rent-data', {
        body: {
          address,
          bedrooms: bedrooms ? Number(bedrooms) : undefined,
          bathrooms: bathrooms ? Number(bathrooms) : undefined,
          sqft: sqft ? Number(sqft) : undefined
        }
      });
      
      if (error) {
        throw new Error(`Error fetching rental data: ${error.message}`);
      }
      
      if (data.error) {
        throw new Error(`API error: ${data.error}`);
      }
      
      setResults(data);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed the rental market for your property.",
      });
    } catch (err: any) {
      console.error("Error in rent analysis:", err);
      setError(err.message || "Failed to fetch rental data. Please try again.");
      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze the rental market for this property.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateReport = () => {
    if (!results) return;
    
    // In a real implementation, this would generate a PDF report
    toast({
      title: "Report Generated",
      description: "Your rental analysis report is ready for download.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="zenora-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-zenora-purple/10 rounded-lg">
            <Home className="h-5 w-5 text-zenora-purple" />
          </div>
          <h2 className="text-xl font-semibold">AI Rent Analysis</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Enter a property address to receive an AI-powered rent estimate based on real Zillow data and comparable properties in the area.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Property Address
            </label>
            <div className="relative">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, San Francisco, CA 94103"
                className="zenora-input pl-10"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium mb-1">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="zenora-input"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium mb-1">
                Bathrooms
              </label>
              <select
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="zenora-input"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sqft" className="block text-sm font-medium mb-1">
                Square Footage
              </label>
              <input
                id="sqft"
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="E.g., 1200"
                className="zenora-input"
              />
            </div>
          </div>
          
          <ZenoraButton 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Market Data...
              </>
            ) : (
              "Get Zillow Rent Estimate"
            )}
          </ZenoraButton>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error fetching data from Zillow</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
      
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-scale-in">
          <div className="lg:col-span-1">
            <div className="zenora-card p-6 h-full">
              <h3 className="text-lg font-medium mb-4">Zenora AI Rent Estimate</h3>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Rent</p>
                <div className="text-3xl font-bold text-zenora-purple">
                  {results.rentEstimate}
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Confidence Score</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                    <div 
                      className="bg-zenora-gradient h-2.5 rounded-full"
                      style={{ width: `${results.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{results.confidence}%</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Property Details</p>
                <p className="text-sm">{address}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>{bedrooms} bd</span>
                  <span>{bathrooms} ba</span>
                  <span>{sqft} sqft</span>
                </div>
              </div>
              
              <ZenoraButton 
                variant="outline" 
                className="w-full"
                onClick={handleGenerateReport}
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate Zenora Report
              </ZenoraButton>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="zenora-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Comparable Properties</h3>
                <ZenoraButton variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </ZenoraButton>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Address</th>
                      <th className="text-left py-3 px-2">Rent</th>
                      <th className="text-left py-3 px-2">Bed</th>
                      <th className="text-left py-3 px-2">Bath</th>
                      <th className="text-left py-3 px-2">Sq. Ft.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.comparables.length > 0 ? (
                      results.comparables.map((property, index) => (
                        <tr 
                          key={index} 
                          className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-zenora-dark/50"
                        >
                          <td className="py-3 px-2">{property.address}</td>
                          <td className="py-3 px-2 font-medium">{property.rent}</td>
                          <td className="py-3 px-2">{property.bedrooms}</td>
                          <td className="py-3 px-2">{property.bathrooms}</td>
                          <td className="py-3 px-2">{property.sqft}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-muted-foreground">
                          No comparable properties found in this area
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-zenora-dark/50 rounded-lg">
                <h4 className="font-medium mb-2">Market Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Based on our analysis, rents in this area have increased by {results.marketInsights.increaseLastYear}% over the past year, with a projected growth of {results.marketInsights.projectedGrowth}% over the next 12 months. The average time on market for similar properties is {results.marketInsights.daysOnMarket} days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRentAnalysis;
