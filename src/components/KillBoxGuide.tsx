import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import KillBoxImage from './KillBoxImage';

const killBoxSteps = [
  {
    title: "Choose the Location",
    content: "Select a strategic location near your base's entrance. It should be a natural chokepoint or create one using walls."
  },
  {
    title: "Create the Funnel",
    content: "Build a long, narrow corridor leading to your base. Use strong materials like stone blocks for the walls."
  },
  {
    title: "Add Traps",
    content: "Place traps along the corridor. Deadfall traps are effective and reusable. Alternate between stone and steel traps for variety."
  },
  {
    title: "Set Up Defensive Positions",
    content: "At the end of the corridor, create a wide area for your colonists. Build sandbags or barricades for cover."
  },
  {
    title: "Install Turrets",
    content: "Place turrets behind the sandbags. Mix different types of turrets for varied damage output."
  },
  {
    title: "Manage Heat and Mood",
    content: "If enclosed, add vents or coolers to manage heat during long fights. Consider adding art or other mood-enhancing items for your defenders."
  },
  {
    title: "Create an Escape Route",
    content: "Build a secure path for your colonists to retreat if the kill box is overwhelmed."
  },
  {
    title: "Regular Maintenance",
    content: "Repair traps and structures after each raid. Upgrade components as your technology improves."
  }
];

const KillBoxGuide: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Kill Box Guide</h2>
      <KillBoxImage />
      <div className="mt-6">
        {killBoxSteps.map((step, index) => (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4">
            <button
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
              onClick={() => toggleStep(index)}
            >
              <span>{`${index + 1}. ${step.title}`}</span>
              {expandedStep === index ? (
                <ChevronUp className="text-blue-500" size={20} />
              ) : (
                <ChevronDown className="text-blue-500" size={20} />
              )}
            </button>
            {expandedStep === index && (
              <p className="mt-2 text-gray-600">{step.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KillBoxGuide;