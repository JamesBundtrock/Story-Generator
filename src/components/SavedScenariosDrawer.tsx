import React, { useState } from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, Copy, Check, Clock } from 'lucide-react';
import { SavedScenario, ScenarioState } from '../data/categories/types';
import { formatScenarioClipboard } from '../data/categories';

interface SavedScenariosDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: SavedScenario[];
  onLoadScenario: (scenario: ScenarioState) => void;
  onDeleteScenario: (id: string) => void;
  onClearAll: () => void;
}

export const SavedScenariosDrawer: React.FC<SavedScenariosDrawerProps> = ({
  isOpen,
  onClose,
  savedList,
  onLoadScenario,
  onDeleteScenario,
  onClearAll,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (item: SavedScenario) => {
    const text = formatScenarioClipboard(item.data);
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#121215] border-l border-zinc-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-100 font-cinzel">
              Saved Scenarios ({savedList.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedList.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              <Bookmark className="w-10 h-10 mx-auto mb-3 opacity-30 text-red-400" />
              <p className="text-sm font-medium text-zinc-400">No saved scenarios yet.</p>
              <p className="text-xs text-zinc-500 mt-1">
                Click "Save Loadout" when you roll a combination you love.
              </p>
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 rounded-lg p-4 transition-all space-y-3"
              >
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item)}
                      title="Copy full scenario text"
                      className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        onLoadScenario(item.data);
                        onClose();
                      }}
                      title="Load into generator"
                      className="flex items-center gap-1 px-2.5 py-1 bg-red-950/70 hover:bg-red-900 border border-red-800/70 text-red-200 rounded text-xs transition-colors"
                    >
                      <span>Load</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteScenario(item.id)}
                      title="Delete saved"
                      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/90 font-semibold block">
                      1. Setting:
                    </span>
                    <p className="text-zinc-300">{item.data.world}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/90 font-semibold block">
                      2. Protagonist:
                    </span>
                    <p className="text-zinc-300">{item.data.role}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/90 font-semibold block">
                      3. The Women:
                    </span>
                    <p className="text-zinc-300">{item.data.women}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/90 font-semibold block">
                      4. The Dynamic:
                    </span>
                    <p className="text-zinc-300">{item.data.dynamic}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/90 font-semibold block">
                      5. The Taboo:
                    </span>
                    <p className="text-zinc-300">{item.data.taboo}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedList.length > 0 && (
          <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 flex justify-between items-center text-xs">
            <span className="text-zinc-500">{savedList.length} total saved</span>
            <button
              onClick={() => {
                if (confirm('Clear all saved scenarios?')) {
                  onClearAll();
                }
              }}
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              Clear All Saved
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
