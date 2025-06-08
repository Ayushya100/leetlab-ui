import { useState } from 'react';
import { CardCarousel } from '../../core/CardCarousel';
import { ProblemList } from '../../core/ProblemList';

export function ProblemListingComponent() {
  const [currentDate] = useState(new Date());

  // Calendar
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = new Date(year, monthIndex, 1).getDay();
  const today = currentDate.getDate();

  const weeks = [];
  let day = 1 - startDay;

  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
      day++;
    }
    weeks.push(week);
  }
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const companyTags = [
    {
      title: 'Amazon',
      count: '16',
    },
    {
      title: 'Google',
      count: '16',
    },
    {
      title: 'Meta',
      count: '16',
    },
    {
      title: 'Adobe',
      count: '16',
    },
    {
      title: 'Accenture',
      count: '16',
    },
    {
      title: 'Salesforce',
      count: '16',
    },
    {
      title: 'Goldman',
      count: '16',
    },
    {
      title: 'Uber',
      count: '16',
    },
    {
      title: 'Zerodha',
      count: '16',
    },
  ];

  const cards = [
    {
      title: 'Top 50 Interview Questions',
      description: 'Top 50 most asked Interview Questions across the industry.',
    },
    {
      title: 'Top 20 Interview Questions',
      description: 'Top 20 most asked Interview Questions across the industry.',
    },
    {
      title: 'Top 10 Amazon Questions',
      description: 'Top 10 most asked Interview Questions in Amazon.',
    },
    {
      title: 'Top 25 Google Questions',
      description: 'Top 25 most asked Interview Questions in Google.',
    },
    {
      title: 'Top 25 Meta Questions',
      description: 'Top 25 most asked Interview Questions in Meta.',
    },
    {
      title: 'Top 10 Services Questions',
      description: 'Top 10 most asked Interview Questions in Services.',
    },
    {
      title: 'Top 20 Avanade Questions',
      description: 'Top 20 most asked Interview Questions in Avanade.',
    },
    {
      title: 'Top 30 Interview Questions',
      description: 'Top 30 most asked Interview Questions in Industry.',
    },
  ];

  const problemsList = [];

  const handleCardClick = (id) => {
    console.log(`Clicked id: ${id}`);
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Sub Main Section */}
        <div className="md:w-7/10 w-full p-4 overflow-y-auto flex flex-col">
          <CardCarousel cardsList={cards} onCardClick={handleCardClick} />

          {/* List Section */}
          <ProblemList problems={problemsList} />
        </div>

        {/* Card Section */}
        <div className="md:w-3/10 w-full p-4">
          <div className="h-full card rounded-md shadow p-4 flex flex-col">
            <div className="mb-2 hidden md:block">
              <div className="p-4 max-w-xl mx-auto">
                <h3 className="text-center text-2xl font-bold mb-4">
                  {today} {month} {year}
                </h3>
                <div className="grid grid-cols-7 gap-2 text-center font-semibold white">
                  {weekDays.map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {weeks.flat().map((date, index) => (
                    <div key={index} className={`h-8 flex text-md font-semibold items-center justify-center rounded-md hover:cursor-pointer ${date ? 'date-bg' : 'text-gray-800'}`}>
                      {date || ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <hr className="border-t border-gray-400" />
            </div>
            <div className="overflow-hidden flex-1 mt-4">
              <div className="flex justify-between items-center mb-2 mx-2">
                <p className="text-md font-semibold">Companies</p>
                <p className="text-sm text-blue-400 hover:cursor-pointer">View All</p>
              </div>
              {companyTags.map((tag, index) => (
                <div key={index} className="inline-block date-bg text-white px-2 py-1 m-1 rounded">
                  {tag.title} {tag.count}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
