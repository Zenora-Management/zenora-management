
import { useState } from "react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { FileText, Download, Check, Calendar, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ReportGenerator = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: "123 Main St, San Francisco, CA", selected: false },
    { id: 2, name: "456 Market St, San Francisco, CA", selected: false },
    { id: 3, name: "789 Valencia St, San Francisco, CA", selected: false },
    { id: 4, name: "101 Golden Gate Ave, San Francisco, CA", selected: false },
    { id: 5, name: "202 Mission St, San Francisco, CA", selected: false }
  ]);
  
  const [reportType, setReportType] = useState("rent");
  const [dateRange, setDateRange] = useState("last30");
  const [includeComparables, setIncludeComparables] = useState(true);
  const [includeMarketTrends, setIncludeMarketTrends] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [zillowData, setZillowData] = useState(null);
  
  const toggleProperty = (id: number) => {
    setProperties(properties.map(property => 
      property.id === id ? { ...property, selected: !property.selected } : property
    ));
  };
  
  const selectAllProperties = () => {
    setProperties(properties.map(property => ({ ...property, selected: true })));
  };
  
  const deselectAllProperties = () => {
    setProperties(properties.map(property => ({ ...property, selected: false })));
  };
  
  const handleGenerateReport = async () => {
    const selectedProperties = properties.filter(p => p.selected);
    if (selectedProperties.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      // For demonstration, we'll fetch Zillow data for the first selected property
      const selectedProperty = selectedProperties[0];
      
      // Fetch Zillow data through our Edge Function
      const { data, error } = await supabase.functions.invoke('zillow-rent-data', {
        body: {
          address: selectedProperty.name,
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1200
        }
      });
      
      if (error) {
        throw new Error(`Error fetching rental data: ${error.message}`);
      }
      
      if (data.error) {
        throw new Error(`API error: ${data.error}`);
      }
      
      setZillowData(data);
      setReportGenerated(true);
      
      toast({
        title: "Report Generated",
        description: "Your Zillow-powered report is ready to view.",
      });
    } catch (err: any) {
      console.error("Error generating report:", err);
      toast({
        title: "Report Generation Failed",
        description: err.message || "Failed to generate the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownloadReport = () => {
    // In a real app, this would trigger a download
    toast({
      title: "Report Download Started",
      description: "Your report PDF is being downloaded.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-zenora-purple/10 rounded-lg">
          <FileText className="h-5 w-5 text-zenora-purple" />
        </div>
        <h2 className="text-xl font-semibold">Zenora Report Generator</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="zenora-card p-6">
            <h3 className="text-lg font-medium mb-4">Properties</h3>
            
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Select properties to include</span>
              <div className="space-x-2">
                <button 
                  className="text-zenora-purple hover:underline text-xs"
                  onClick={selectAllProperties}
                >
                  Select All
                </button>
                <button 
                  className="text-zenora-purple hover:underline text-xs"
                  onClick={deselectAllProperties}
                >
                  Deselect All
                </button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
              {properties.map(property => (
                <div 
                  key={property.id}
                  className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zenora-dark/50 cursor-pointer"
                  onClick={() => toggleProperty(property.id)}
                >
                  <div className={`h-5 w-5 rounded border ${
                    property.selected 
                      ? 'bg-zenora-purple border-zenora-purple text-white'
                      : 'border-gray-300 dark:border-gray-600'
                  } flex items-center justify-center mr-3`}>
                    {property.selected && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <span>{property.name}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-medium mb-4">Report Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="reportType" className="block text-sm font-medium mb-1">
                  Report Type
                </label>
                <select
                  id="reportType"
                  className="zenora-input"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="rent">Zillow Rent Analysis</option>
                  <option value="occupancy">Occupancy Report</option>
                  <option value="financial">Financial Summary</option>
                  <option value="maintenance">Maintenance Report</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dateRange" className="block text-sm font-medium mb-1">
                  Date Range
                </label>
                <div className="flex items-center">
                  <select
                    id="dateRange"
                    className="zenora-input"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="last30">Last 30 Days</option>
                    <option value="last90">Last 90 Days</option>
                    <option value="lastYear">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  
                  {dateRange === "custom" && (
                    <button className="ml-2 p-2 bg-gray-100 dark:bg-zenora-dark/70 rounded-md">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded border ${
                      includeComparables 
                        ? 'bg-zenora-purple border-zenora-purple text-white' 
                        : 'border-gray-300 dark:border-gray-600'
                    } flex items-center justify-center mr-3 cursor-pointer`}
                    onClick={() => setIncludeComparables(!includeComparables)}
                  >
                    {includeComparables && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <label className="cursor-pointer" onClick={() => setIncludeComparables(!includeComparables)}>
                    Include Zillow Comparable Properties
                  </label>
                </div>
                
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded border ${
                      includeMarketTrends 
                        ? 'bg-zenora-purple border-zenora-purple text-white' 
                        : 'border-gray-300 dark:border-gray-600'
                    } flex items-center justify-center mr-3 cursor-pointer`}
                    onClick={() => setIncludeMarketTrends(!includeMarketTrends)}
                  >
                    {includeMarketTrends && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <label className="cursor-pointer" onClick={() => setIncludeMarketTrends(!includeMarketTrends)}>
                    Include Market Trends
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {reportGenerated ? (
            <div className="zenora-card p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Zillow-Powered Zenora Report</h3>
                <ZenoraButton onClick={handleDownloadReport} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </ZenoraButton>
              </div>
              
              <div className="bg-zenora-gradient text-white p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-bold">Zenora Management</h4>
                    <p className="text-xs text-white/80">Zillow-Powered Property Analysis</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Generated: {new Date().toLocaleDateString()}</p>
                    <p className="text-xs text-white/80">Report ID: ZR-{Math.floor(Math.random() * 10000)}</p>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1">
                  {reportType === "rent"
                    ? "Zillow Rent Analysis Report"
                    : reportType === "occupancy"
                    ? "Occupancy Report"
                    : reportType === "financial"
                    ? "Financial Summary"
                    : "Maintenance Report"}
                </h2>
                <p className="text-sm">
                  {properties.filter(p => p.selected).map(p => p.name).join(", ")}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-zenora-dark/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Zillow Estimated Rent</p>
                  <p className="text-2xl font-bold text-zenora-purple">
                    {zillowData?.rentEstimate || "$2,350/month"}
                  </p>
                  <p className="text-xs text-green-600 mt-1">↑ 5.3% from last period</p>
                </div>
                <div className="bg-gray-50 dark:bg-zenora-dark/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-zenora-purple">94%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 2.1% from last period</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-zenora-dark/30 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Zillow Market Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Based on Zillow data analysis, the market shows strong demand in your property area. Rent prices have increased by an average of 5.3% over the past year, with a projected growth of 3.2% over the next 12 months. The average time on market for similar properties is 21 days, which is 15% faster than the broader metro area.
                </p>
              </div>
              
              <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4">
                <h4 className="font-medium mb-3">AI Recommendations Based on Zillow Data</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 p-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Consider a 3-5% rent increase based on Zillow's local market data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 p-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Invest in minor kitchen upgrades to match higher-priced comparable properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 p-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Implement a tenant referral program to maintain high occupancy rates</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="zenora-card p-6 h-full flex flex-col">
              <div className="text-center flex-grow flex flex-col items-center justify-center p-8">
                <div className="h-16 w-16 rounded-full bg-zenora-purple/10 flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-zenora-purple" />
                </div>
                
                <h3 className="text-xl font-medium mb-2">Generate Your Zillow-Powered Report</h3>
                
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Select properties and customize your report settings, then click the button below to generate a detailed Zillow-based Zenora Report.
                </p>
                
                <ZenoraButton 
                  onClick={handleGenerateReport}
                  disabled={isGenerating || properties.filter(p => p.selected).length === 0}
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Fetching Zillow Data...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" /> Generate Zillow Report
                    </>
                  )}
                </ZenoraButton>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                <h4 className="font-medium mb-3">About Zillow-Powered Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI-powered reports combine your property data with Zillow's market analytics to provide actionable insights and recommendations for optimizing your property management strategy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
