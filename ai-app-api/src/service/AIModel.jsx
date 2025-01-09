import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY; //wykorzystanie Gemini AI z wykorzystaniem klucza GEMINI_AI_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
    //konwersacja z chatem oraz zwrócenie w danej strukturze JSON-a 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "\nGenerate Travel Plan for Location : {location}, for {noOfDays} Days for {noOfPeople} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {noOfDays} with each day plan with best time to visit in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Paris, France\",\n  \"noOfDays\": 5,\n  \"noOfPeople\": 2,\n  \"budget\": 2000, \n  \"hotels\": [\n    {\n      \"HotelName\": \"Hotel Saint-André des Arts\",\n      \"HotelAddress\": \"31 Rue St André des Arts, 75006 Paris, France\",\n      \"Price\": \"150 USD/night\",\n      \"hotelImageUrl\": \"https://example.com/hotel1.jpg\", \n      \"geoCoordinates\": [48.8537, 2.3403],\n      \"rating\": 4.5,\n      \"description\": \"Charming hotel in the heart of the Latin Quarter.\"\n    },\n    {\n      \"HotelName\": \"Hotel du Petit Moulin\",\n      \"HotelAddress\": \"1 Rue du Petit Moulin, 75001 Paris, France\",\n      \"Price\": \"250 USD/night\",\n      \"hotelImageUrl\": \"https://example.com/hotel2.jpg\",\n      \"geoCoordinates\": [48.8605, 2.3417],\n      \"rating\": 4.8,\n      \"description\": \"Boutique hotel designed by Philippe Starck.\"\n    },\n    {\n      \"HotelName\": \"Novotel Paris Les Halles\",\n      \"HotelAddress\": \"10 Rue du Louvre, 75001 Paris, France\",\n      \"Price\": \"120 USD/night\",\n      \"hotelImageUrl\": \"https://example.com/hotel3.jpg\",\n      \"geoCoordinates\": [48.8645, 2.3395],\n      \"rating\": 4.2,\n      \"description\": \"Modern hotel near Les Halles.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Eiffel Tower\",\n          \"placeDetails\": \"Iconic wrought-iron lattice tower on the Champ de Mars.\",\n          \"placeImageUrl\": \"https://example.com/eiffel.jpg\",\n          \"geoCoordinates\": [48.8584, 2.2945],\n          \"ticketPricing\": \"26 EUR (approx)\",\n          \"timeTravel\": \"2-3 hours\"\n        },\n        {\n          \"placeName\": \"Champ de Mars\",\n          \"placeDetails\": \"Large public green space at the foot of the Eiffel Tower.\",\n          \"placeImageUrl\": \"https://example.com/champdemars.jpg\",\n          \"geoCoordinates\": [48.8566, 2.2928],\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"1-2 hours\"\n        }\n      ],\n      \"bestTime\": \"Morning or late afternoon to avoid crowds.\"\n    },\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Louvre Museum\",\n          \"placeDetails\": \"World-renowned art museum and historical monument.\",\n          \"placeImageUrl\": \"https://example.com/louvre.jpg\",\n          \"geoCoordinates\": [48.8606, 2.3376],\n          \"ticketPricing\": \"17 EUR (approx)\",\n          \"timeTravel\": \"4-5 hours\"\n        },\n        {\n          \"placeName\": \"Tuileries Garden\",\n          \"placeDetails\": \"Formal garden connecting the Louvre to Place de la Concorde.\",\n          \"placeImageUrl\": \"https://example.com/tuileries.jpg\",\n          \"geoCoordinates\": [48.8642, 2.3271],\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"1-2 hours\"\n        }\n      ],\n      \"bestTime\": \"Morning to avoid long queues.\"\n    },\n    \"day3\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Notre Dame Cathedral\",\n          \"placeDetails\": \"Gothic masterpiece, currently under reconstruction.\",\n          \"placeImageUrl\": \"https://example.com/notredame.jpg\",\n          \"geoCoordinates\": [48.8530, 2.3499],\n          \"ticketPricing\": \"Free (exterior)\",\n          \"timeTravel\": \"1-2 hours\"\n        },\n        {\n          \"placeName\": \"Île de la Cité\",\n          \"placeDetails\": \"Island in the Seine with historical significance.\",\n          \"placeImageUrl\": \"https://example.com/iledelacite.jpg\",\n          \"geoCoordinates\": [48.8529, 2.3499],\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"2-3 hours\"\n        }\n      ],\n      \"bestTime\": \"Midday for good lighting.\"\n    },\n    \"day4\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Arc de Triomphe\",\n          \"placeDetails\": \"Triumphal arch honoring those who fought and died for France.\",\n          \"placeImageUrl\": \"https://example.com/arcdetriomphe.jpg\",\n          \"geoCoordinates\": [48.8738, 2.2950],\n          \"ticketPricing\": \"13 EUR (approx)\",\n          \"timeTravel\": \"1-2 hours\"\n        },\n        {\n          \"placeName\": \"Champs-Élysées\",\n          \"placeDetails\": \"Famous avenue known for its high-end shops and restaurants.\",\n          \"placeImageUrl\": \"https://example.com/champselysees.jpg\",\n          \"geoCoordinates\": [48.87, 2.30],\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"2-3 hours\"\n        }\n      ],\n      \"bestTime\": \"Late afternoon for sunset views from the Arc de Triomphe.\"\n    },\n    \"day5\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Montmartre\",\n          \"placeDetails\": \"Historic district with Sacré-Cœur Basilica and artistic vibe.\",\n          \"placeImageUrl\": \"https://example.com/montmartre.jpg\",\n          \"geoCoordinates\": [48.8869, 2.3430],\n          \"ticketPricing\": \"Free (exterior)\",\n          \"timeTravel\": \"3-4 hours\"\n        }\n      ],\n      \"bestTime\": \"Morning for a leisurely stroll and less crowds.\"\n    }\n  }\n}\n```\n\n**Note:**  This is a sample JSON.  Image URLs are placeholders; you'll need to find and replace them with actual image URLs.  Prices and times are estimates and may vary depending on the season and availability.  Geocoordinates are approximate and may require more precise values depending on the specific location within a site.  Consider using a mapping API to obtain more accurate geolocation data.  The budget is also a broad estimate and you should adjust costs based on your specific needs and preferences (e.g. dining, transportation).  This is a basic framework; you can customize it further by adding more details and activities.\n"},
          ],
        },
      ],
    });
  
    

  
