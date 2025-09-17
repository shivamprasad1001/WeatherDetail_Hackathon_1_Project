import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { getAiSurvivalTip } from '../services/geminiService';
import { IconSparkles } from './Icons';

interface AISurvivalAssistantCardProps {
  className?: string;
}

// Basic markdown to HTML converter for Gemini response
const formatResponse = (text: string) => {
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\n\s*-\s/g, '\n- ') // Normalize list bullets
        .replace(/\n/g, '<br />');

    // Convert list items
    if (html.includes('<br />- ')) {
        const listItemsHtml = html.split('<br />')
            .filter(line => line.trim().startsWith('- '))
            .map(item => `<li>${item.trim().substring(2).trim()}</li>`)
            .join('');
        
        const nonListHtml = html.split('<br />- ')[0];
        
        html = `${nonListHtml}<ul class="list-disc list-inside mt-2 space-y-1">${listItemsHtml}</ul>`;
    }
    return html;
};


export const AISurvivalAssistantCard: React.FC<AISurvivalAssistantCardProps> = ({ className }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    setResponse('');
    
    const result = await getAiSurvivalTip(`Provide survival tips for this situation: ${query}`);
    
    if (result.startsWith("Sorry") || result.startsWith("The AI assistant")) {
        setError(result);
    } else {
        setResponse(result);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  return (
    <GlassCard className={`flex flex-col ${className}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <IconSparkles className="w-6 h-6 text-yellow-400"/>
        AI Survival Assistant
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., car broke down in a snowstorm"
          className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isLoading}
          aria-label="AI survival query"
        />
        <button
          onClick={handleAsk}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-indigo-800 disabled:cursor-not-allowed"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto bg-black/20 p-4 rounded-lg min-h-[150px]">
        {isLoading && (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/50"></div>
            </div>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {response && (
            <div 
                className="prose prose-invert prose-sm max-w-none text-white/90" 
                dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
            />
        )}
        {!isLoading && !error && !response && (
            <p className="text-white/50 text-center pt-8">Ask a question to get AI-powered survival tips.</p>
        )}
      </div>
    </GlassCard>
  );
};