import React, { useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import GuideList from './components/GuideList';
import KillBoxGuide from './components/KillBoxGuide';
import GuideEditor from './components/GuideEditor';

interface Guide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const initialGuides: Guide[] = [
  { id: 'killbox', title: 'Kill Box Guide', content: '' },
  { id: 'farming', title: 'Efficient Farming', content: 'Tips for efficient farming in Rimworld...' },
  { id: 'defense', title: 'Base Defense Strategies', content: 'Strategies for defending your base...' },
  { id: 'research', title: 'Research Priorities', content: 'Recommended research priorities...' },
  { id: 'colonists', title: 'Managing Colonists', content: 'Best practices for managing your colonists...' },
];

function App() {
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuide = () => {
    const newGuide: Guide = {
      id: `guide-${Date.now()}`,
      title: 'New Guide',
      content: '',
    };
    setGuides([...guides, newGuide]);
    setSelectedGuide(newGuide.id);
    setIsEditing(true);
  };

  const handleUpdateGuide = (updatedGuide: Guide) => {
    setGuides(guides.map(guide => guide.id === updatedGuide.id ? updatedGuide : guide));
    setIsEditing(false);
  };

  const handleDeleteGuide = (id: string) => {
    setGuides(guides.filter(guide => guide.id !== id));
    setSelectedGuide(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Rimworld Guides</h1>
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-grow mr-4">
            <input
              type="text"
              placeholder="Search guides..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleAddGuide}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Guide
          </button>
        </div>
        {selectedGuide ? (
          <div>
            <button
              onClick={() => {
                setSelectedGuide(null);
                setIsEditing(false);
              }}
              className="mb-4 text-blue-500 hover:underline"
            >
              ← Back to guide list
            </button>
            {selectedGuide === 'killbox' ? (
              <KillBoxGuide />
            ) : isEditing ? (
              <GuideEditor
                guide={guides.find(g => g.id === selectedGuide)!}
                onSave={handleUpdateGuide}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{guides.find(g => g.id === selectedGuide)?.title}</h2>
                  <div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGuide(selectedGuide)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {guides.find(g => g.id === selectedGuide)?.imageUrl && (
                  <img
                    src={guides.find(g => g.id === selectedGuide)?.imageUrl}
                    alt={guides.find(g => g.id === selectedGuide)?.title}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                )}
                <p>{guides.find(g => g.id === selectedGuide)?.content}</p>
              </div>
            )}
          </div>
        ) : (
          <GuideList guides={filteredGuides} onSelectGuide={setSelectedGuide} />
        )}
      </div>
    </div>
  );
}

export default App;