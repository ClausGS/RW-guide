import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface PlagiarismResultProps {
  result: {
    isPlagiarized: boolean;
    similarity: number;
  };
}

const PlagiarismResult: React.FC<PlagiarismResultProps> = ({ result }) => {
  const { isPlagiarized, similarity } = result;
  const roundedSimilarity = similarity.toFixed(2);

  return (
    <div className={`mt-6 p-4 rounded-lg ${isPlagiarized ? 'bg-red-100' : 'bg-green-100'}`}>
      <div className="flex items-center">
        {isPlagiarized ? (
          <AlertCircle className="text-red-500 mr-2" size={24} />
        ) : (
          <CheckCircle className="text-green-500 mr-2" size={24} />
        )}
        <h2 className="text-xl font-semibold">
          {isPlagiarized ? 'Potential Plagiarism Detected' : 'No Plagiarism Detected'}
        </h2>
      </div>
      <p className="mt-2">
        Similarity: <span className="font-bold">{roundedSimilarity}%</span>
      </p>
      <p className="mt-2 text-sm">
        {isPlagiarized
          ? 'The text shows significant similarity to existing content. Please review and cite your sources appropriately.'
          : 'The text appears to be original. However, always ensure proper citation for any referenced work.'}
      </p>
    </div>
  );
};

export default PlagiarismResult;