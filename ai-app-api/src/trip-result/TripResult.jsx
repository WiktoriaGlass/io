import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importowanie useNavigate
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function TripResult() {
  const { state } = useLocation();
  const { tripData } = state || {};

  const tripDetails = JSON.parse(tripData);

  // Inicjalizacja nawigacji
  const navigate = useNavigate();

  // Domyślny adres URL obrazu do obsługi błędów
  const defaultHotelImage = '/logo_view.png'; // Ścieżka do domyślnego obrazu

  // Handle image loading errors
  const handleImageError = (event) => {
    event.target.src = defaultHotelImage; // Ustawienie domyślnego obrazu
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl text-center mb-10'>Rekomendacje dla Twojej podróży 🚀</h2>

      {/* Basic Information */}
      <div className='text-center mb-10'>
        <h3 className='text-xl'>
          <span className='font-bold text-gray-600'>Lokalizacja:</span> {tripDetails.location}
        </h3>
        <h4 className='text-xl'>
        <span className='font-bold text-gray-600'>Liczba dni:</span> {tripDetails.noOfDays}
        </h4>
        <h4 className='text-xl'>
          <span className='font-bold text-gray-600'>Budżet:</span> {tripDetails.budget}
        </h4>
        <h4 className='text-xl'>
          <span className='font-bold text-gray-600'>Liczba podróżujących:</span> {tripDetails.noOfPeople}
        </h4>
      </div>

      
        {/* Rekomendowane hotele wyświetlanie */}
        <div className='mt-10'>
  <h3 className='text-xl font-bold text-center mb-5'>Rekomendowane hotele:</h3>
  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {tripDetails.hotels.map((hotel, index) => (
      <div key={index} className='bg-white shadow-md rounded-lg p-4'>
        <img 
          src={hotel.hotelImageUrl} 
          alt={hotel.HotelName} 
          className='w-full h-48 object-cover rounded-md mb-4'
          onError={handleImageError} // Obsługa błędu obrazu
        />
        {/* Wyświetlanie nazwy hotelu */}
        <h4 className='font-semibold text-lg'>{hotel.HotelName || "Nazwa niedostępna"}</h4>
        {/* Wyświetlanie adresu */}
        <p className='text-sm text-gray-600'>
          <span className='font-semibold text-black'>Adres:</span> {hotel.HotelAddress || "Adres niedostępny"}
        </p>
        {/* Wyświetlanie ceny */}
        <p className='text-sm text-gray-600'>
          <span className='font-semibold text-black'>Cena:</span> {hotel.Price || "Cena niedostępna"}
        </p>
        {/* Wyświetlanie oceny */}
        <p className='text-sm text-gray-600'>
          <span className='font-semibold text-black'>Ocena:</span> {hotel.rating || "Ocena niedostępna"} ⭐</p>
        {/* Wyświetlanie opisu */}
        <p className='text-sm text-gray-600'>
          <span className='font-semibold text-black'>Opis:</span> {hotel.description || "Opis niedostępny"}</p>
      </div>
    ))}
  </div>
</div>


      {/* Plan podróży */}
      <div className='mt-10'>
        <h3 className='text-xl font-bold text-center mb-5'>Plan podróży:</h3>
        {Object.keys(tripDetails.itinerary).map((day, index) => (
          <div key={index} className='mt-5'>
            <h4 className='font-semibold text-lg mb-3'>{day}:</h4>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {tripDetails.itinerary[day].plan.map((place, idx) => (
                <div key={idx} className='bg-white shadow-md rounded-lg p-4'>
                  <img 
                    src={place.placeImageUrl} 
                    alt={place.placeName} 
                    className='w-full h-48 object-cover rounded-md mb-4'
                    onError={handleImageError} // Obsługa błędu obrazu
                  />
                  <h5 className='font-semibold text-lg'>{place.placeName}</h5>
                  <p className='text-sm text-gray-600'>
                  <span className='font-semibold text-black'>Opis:</span> {place.placeDetails}</p>  
                  <p className='text-sm text-gray-600'>
                  <span className='font-semibold text-black'>Cena:</span> {place.ticketPricing}</p> 
                  <p className='text-sm text-gray-600'>
                  <span className='font-semibold text-black'>Czas pobytu:</span> {place.timeTravel}
                  </p> 
                  
                 
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Przycisk powrotu do menu głównego */}
      <div className='my-10 flex justify-between'>
        {/* Przycisk powrotu do strony głównej */}
        <Button onClick={() => navigate('/')}>Cofnij do ekranu startowego</Button>

        {/* Można tu dodać kolejny przycisk */}
      </div>
    </div>
  );
}

export default TripResult;
