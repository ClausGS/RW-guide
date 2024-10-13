import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
}

interface GuideListProps {
  guides: Guide[];
  onSelectGuide: (id: string) => void;
}

const GuideList: React.FC<GuideListProps> = ({ guides, onSelectGuide }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {guides.length === 0 ? (
        <p className="p-4 text-gray-500">No guides found. Try a different search term.</p>
      ) : (
        guides.map((guide) => (
          <button
            key={guide.id}
            className="w-full text-left p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 flex justify-between items-center"
            onClick={() => onSelectGuide(guide.id)}
          >
            <span>{guide.title}</span>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        ))
      )}
    </div>
  );
};

export default GuideList;