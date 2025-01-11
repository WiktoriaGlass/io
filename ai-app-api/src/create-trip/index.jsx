//index - utworzenie wycieczki 
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import { useNavigate } from 'react-router-dom'; // Importowanie useNavigate

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});

  // Inicjalizacja navigate
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    // Sprawdzanie wymaganych danych
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast("Prosimy o podanie wszystkich danych");
      return;
    }

    // Walidacja liczby dni
    if (isNaN(formData.noOfDays) || formData.noOfDays <= 0) {
      toast("Proszę podać poprawną liczbę dni");
      return;
    }
    // Walidacja dotycząca maksymalnej liczy dni (5)
    if (formData.noOfDays > 5) {
      toast("Proszę wybrać maksymalnie 5 dni");
      return;
    }

    const DEFAULT_PROMPT_VALUES = {
      location: 'unknown location',
      totalDays: 1,
      traveler: '1 person',
      budget: 'low',
    };

    // Generowanie prompta z domyślnymi wartościami
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || DEFAULT_PROMPT_VALUES.location)
      .replace('{totalDays}', formData?.noOfDays || DEFAULT_PROMPT_VALUES.totalDays)
      .replace('{traveler}', formData?.traveler || DEFAULT_PROMPT_VALUES.traveler)
      .replace('{budget}', formData?.budget || DEFAULT_PROMPT_VALUES.budget);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());

      // Przekierowanie do strony wyników podróży
      navigate('/trip-result', { state: { tripData: result?.response?.text() } }); // Przekazanie wyników do TripResult
    } catch (error) {
      console.error("Błąd podczas generowania podróży:", error); // Komunikat o niepowodzeniu 
      toast("Wystąpił błąd podczas generowania podróży");
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Jakie są Twoje preferencje dotyczące wyjazdu 🚀</h2>
      <p className='mt-3 text-gray-500 text-xl'>Podaj najważniejsze informacje, a my zajmiemy się resztą ✍🏻</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Jaki jest Twój wymarzony kierunek wakacji? </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} //wykorzystywanie klucza Google_Place_API_KEY
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
            }}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Ile dni planujesz spędzić w danym miejscu? </h2>
        <Input
          placeholder={'Od 1 do 5 dni'}
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Jaki koszt chcesz przeznaczyć na wakacje? </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title && 'shadow-lg border-black'}`}>
              <h2 className='text-1xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Z kim planujesz spędzić swoje wakacje? </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler === item.people && 'shadow-lg border-black'}`}>
              <h2 className='text-1xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 flex justify-between'>
        {/* Przycisk powrotu do Hero(ekranu startowego) */}
        <Button onClick={() => navigate('/')}>Cofnij do ekranu startowego</Button>

        {/* Przycisk generujący podróż(umożliwiający wygenerowanie podróży) */}
        <Button onClick={OnGenerateTrip}>
          Generuj podróż
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;

