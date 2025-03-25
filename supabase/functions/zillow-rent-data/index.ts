
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.0";

// Set up CORS headers for browser compatibility
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the API key from environment variables
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    if (!RAPIDAPI_KEY) {
      console.error("RAPIDAPI_KEY is not set");
      throw new Error("API key configuration error");
    }

    // Parse request body
    const { address, zipcode } = await req.json();
    
    if (!address || !zipcode) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: address and zipcode are required" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Fetching rental data for address: ${address}, zipcode: ${zipcode}`);

    // Build the API request URL
    const url = `https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${encodeURIComponent(address)}%20${encodeURIComponent(zipcode)}&home_type=Houses`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    };

    // Call the Zillow API
    console.log("Calling Zillow API with URL:", url);
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Zillow API error:", response.status, errorText);
      throw new Error(`Zillow API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Zillow API response:", JSON.stringify(data).substring(0, 200) + "...");

    // Process the response to extract relevant rental information
    let rentalData = {
      properties: [],
      averageRent: 0,
      priceRange: { min: 0, max: 0 },
      nearbyListings: []
    };

    if (data && data.props) {
      // Extract property data from the response
      rentalData.properties = data.props.map((property: any) => ({
        id: property.zpid || "",
        address: property.address || "",
        price: property.price || 0,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        livingArea: property.livingArea || 0,
        lotSize: property.lotAreaValue || 0,
        homeType: property.homeType || "",
        yearBuilt: property.yearBuilt || "",
        imageUrl: property.imgSrc || ""
      }));

      // Calculate average rent
      if (rentalData.properties.length > 0) {
        const validPrices = rentalData.properties
          .map(p => p.price)
          .filter(price => price > 0);
          
        if (validPrices.length > 0) {
          const sum = validPrices.reduce((a, b) => a + b, 0);
          rentalData.averageRent = Math.round(sum / validPrices.length);
          
          // Calculate price range
          rentalData.priceRange.min = Math.min(...validPrices);
          rentalData.priceRange.max = Math.max(...validPrices);
        }
      }

      // Add nearby listings
      rentalData.nearbyListings = data.props.slice(0, 5).map((property: any) => ({
        address: property.address || "",
        price: property.price || 0,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0
      }));
    }

    // Return the processed rental data
    return new Response(JSON.stringify(rentalData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error("Error in zillow-rent-data function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
