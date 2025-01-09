export const SelectTravelesList = [
  { id: 1, title: 'Tylko Ja', desc: 'Samotna podróż', icon: '🙍‍♂️', people: '1' },
  { id: 2, title: 'Para', desc: 'Podróż we dwójkę', icon: '👫', people: '2' },
  { id: 3, title: 'Rodzina', desc: 'Podróż z rodziną', icon: '👨‍👩‍👦', people: '3-5' },
  { id: 4, title: 'Znajomi', desc: 'Podróż z przyjaciółmi', icon: '🦸‍♂️', people: '5-10' },
];

export const SelectBudgetOptions = [
  { id: 1, title: 'Tanio', desc: 'Zwracaj uwagę przede wszystkim na koszta wycieczki', icon: '💰' },
  { id: 2, title: 'Umiarkowanie', desc: 'Patrz na koszta, ale również na możliwości atrakcji podczas wycieczki', icon: '💰💰' },
  { id: 3, title: 'Drogo', desc: 'Nie liczą się dla mnie pieniądze, chcę jak najwięcej zobaczyć podczas wycieczki', icon: '💰💰💰' },
];

//prompt widoczny z poziomu konsoli w Google Chrome (zapytanie do Gemini AI)
export const AI_PROMPT = `
  Wygeneruj plan podróży dla lokalizacji: {location}, 
  na {totalDays} dni dla {traveler} z budżetem {budget}. 
  Podaj szczegółowe opcje hoteli (nazwa hotelu, adres, cena, ocena, opis, zdjęcie)
  oraz plan podróży z miejscami (nazwa miejsca, opis, zdjęcie, czas zwiedzania, cena biletu) w formacie JSON.
`;

export default { SelectTravelesList, SelectBudgetOptions };

