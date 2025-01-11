import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function TripResult() {
  // Hook `useLocation` pozwala na dostęp do przekazanych danych (np. stanu) podczas nawigacji
  const { state } = useLocation();
  const { tripData } = state || {}; // Pobranie danych o podróży z przekazanego stanu, lub pusty obiekt, jeśli stan nie istnieje

  // Parsowanie danych podróży (jeśli istnieją) lub przypisanie pustego obiektu
  const tripDetails = tripData ? JSON.parse(tripData) : {};

  // Hook `useNavigate` do nawigacji między stronami
  const navigate = useNavigate();

  // Ścieżka do domyślnego obrazu w przypadku, gdy obraz hotelu lub miejsca jest niedostępny
  const defaultHotelImage = '/logo_view.png'; // Obraz z folderu public

  // Funkcja obsługująca błędy ładowania obrazów
  const handleImageError = (event) => {
    event.target.src = defaultHotelImage; // Ustawienie domyślnego obrazu
    event.target.onerror = null; // Usunięcie handlera błędu, aby uniknąć zapętlenia
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      {/* Nagłówek strony */}
      <h2 className="font-bold text-3xl text-center mb-10">
        Rekomendacje dla Twojej podróży 🚀
      </h2>

      {/* Wyświetlanie podstawowych informacji o podróży */}
      <div className="text-center mb-10">
        <h3 className="text-xl">
          <span className="font-bold text-gray-600">Lokalizacja:</span> {tripDetails.location}
        </h3>
        <h4 className="text-xl">
          <span className="font-bold text-gray-600">Liczba dni:</span> {tripDetails.noOfDays}
        </h4>
        <h4 className="text-xl">
          <span className="font-bold text-gray-600">Budżet:</span> {tripDetails.budget}
        </h4>
        <h4 className="text-xl">
          <span className="font-bold text-gray-600">Liczba podróżujących:</span> {tripDetails.noOfPeople}
        </h4>
      </div>

      {/* Sekcja z rekomendowanymi hotelami */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-center mb-5">Rekomendowane hotele:</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mapowanie listy hoteli i wyświetlanie ich danych */}
          {tripDetails.hotels?.map((hotel, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              {/* Obraz hotelu z obsługą błędów ładowania */}
              <img
                src={hotel.hotelImageUrl || defaultHotelImage}
                alt={hotel.HotelName}
                className="w-full h-48 object-cover rounded-md mb-4"
                onError={handleImageError}
              />
              {/* Szczegóły hotelu */}
              <h4 className="font-semibold text-lg">{hotel.HotelName || "Nazwa niedostępna"}</h4>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Adres:</span> {hotel.HotelAddress || "Adres niedostępny"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Cena:</span> {hotel.Price || "Cena niedostępna"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Ocena:</span> {hotel.rating || "Ocena niedostępna"} ⭐
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Opis:</span> {hotel.description || "Opis niedostępny"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sekcja z planem podróży */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-center mb-5">Plan podróży:</h3>
        {tripDetails.itinerary &&
          Object.keys(tripDetails.itinerary).map((day, index) => (
            <div key={index} className="mt-5">
              <h4 className="font-semibold text-lg mb-3">{day}:</h4>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mapowanie miejsc w planie podróży */}
                {tripDetails.itinerary[day].plan.map((place, idx) => (
                  <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                    {/* Obraz miejsca z obsługą błędów ładowania */}
                    <img
                      src={place.placeImageUrl || defaultHotelImage}
                      alt={place.placeName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                      onError={handleImageError}
                    />
                    {/* Szczegóły miejsca */}
                    <h5 className="font-semibold text-lg">{place.placeName}</h5>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-black">Opis:</span> {place.placeDetails || "Opis niedostępny"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-black">Cena:</span> {place.ticketPricing || "Cena niedostępna"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-black">Czas pobytu:</span> {place.timeTravel || "Czas pobytu niedostępny"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Przyciski nawigacyjne */}
      <div className="my-10 flex justify-between">
        <Button onClick={() => navigate('/')}>Cofnij do ekranu startowego</Button>
      </div>
    </div>
  );
}

export default TripResult;

