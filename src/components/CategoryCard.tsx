import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  RotateCw, 
  Copy, 
  Check, 
  ListFilter, 
  Compass, 
  User, 
  Crown, 
  Flame, 
  Sparkles 
} from 'lucide-react';
import { CategoryConfig, CategoryId } from '../data/categories/types';

interface CategoryCardProps {
  category: CategoryConfig;
  value: string;
  isLocked: boolean;
  totalOptionsCount: number;
  allPoolItems: string[];
  onToggleLock: (id: CategoryId) => void;
  onRerollSingle: (id: CategoryId) => void;
  onSelectItem: (id: CategoryId, item: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  value,
  isLocked,
  totalOptionsCount,
  allPoolItems,
  onToggleLock,
  onRerollSingle,
  onSelectItem,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  const getIcon = () => {
    switch (category.id) {
      case 'world':
        return <Compass className="w-4 h-4 text-red-400" />;
      case 'role':
        return <User className="w-4 h-4 text-red-400" />;
      case 'women':
        return <Crown className="w-4 h-4 text-red-400" />;
      case 'dynamic':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'taboo':
        return <Sparkles className="w-4 h-4 text-red-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-red-400" />;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleReroll = () => {
    if (isLocked) return;
    setIsSpinning(true);
    onRerollSingle(category.id);
    setTimeout(() => setIsSpinning(false), 350);
  };

  const filteredPickerItems = allPoolItems.filter(item =>
    item.toLowerCase().includes(pickerSearch.toLowerCase())
  );

  return (
    <div
      className={`relative rounded-lg p-5 md:p-6 transition-all duration-300 border ${
        isLocked
          ? 'bg-[#181416] border-red-500/40 border-l-[5px] border-l-red-500 shadow-[0_0_24px_rgba(239,68,68,0.12)]'
          : 'bg-[#131316] border-zinc-800/80 border-l-[5px] border-l-red-950/90 hover:border-l-red-800 hover:border-zinc-700/80'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800/90 flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              {category.label}
            </div>
            <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
              <span>{category.shortName}</span>
              <span aria-hidden="true">·</span>
              <span>{totalOptionsCount} options in file</span>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-1.5">
          {/* Manual Browse/Pick Button */}
          <button
            onClick={() => setShowPicker(!showPicker)}
            title="Browse all options in this category"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/70 rounded transition-colors"
          >
            <ListFilter className="w-3.5 h-3.5" />
          </button>

          {/* Quick Copy */}
          <button
            onClick={handleCopy}
            title="Copy this card"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/70 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reroll this individual slot (disabled if locked) */}
          <button
            onClick={handleReroll}
            disabled={isLocked}
            title={isLocked ? 'Unlock to roll this slot' : 'Reroll only this category'}
            className={`p-1.5 rounded transition-all ${
              isLocked
                ? 'opacity-30 cursor-not-allowed text-zinc-600'
                : 'text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 cursor-pointer active:scale-95'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
          </button>

          {/* Lock / Unlock Toggle Button */}
          <button
            onClick={() => onToggleLock(category.id)}
            className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded transition-all cursor-pointer ${
              isLocked
                ? 'bg-red-500/15 border border-red-500/60 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:bg-red-500/25'
                : 'bg-zinc-900 border border-zinc-700/70 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-3 h-3 text-red-400" />
                <span>Locked</span>
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3 text-zinc-500" />
                <span>Lock</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Rolled Text Display */}
      <div className="relative min-h-[4rem] flex items-center">
        <p className="text-zinc-100 text-[15px] md:text-base leading-relaxed tracking-wide select-text">
          {value || 'Rolling...'}
        </p>
      </div>

      {/* Picker Drawer/Dropdown */}
      {showPicker && (
        <div className="mt-4 pt-3 border-t border-zinc-800/80 animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
              Select Specific Option ({allPoolItems.length}):
            </span>
            <button
              onClick={() => setShowPicker(false)}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Close
            </button>
          </div>
          <input
            type="text"
            placeholder="Filter options..."
            value={pickerSearch}
            onChange={(e) => setPickerSearch(e.target.value)}
            className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded px-2.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 mb-2 focus:outline-none focus:border-red-500/60"
          />
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {filteredPickerItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectItem(category.id, item);
                  setShowPicker(false);
                }}
                className={`w-full text-left p-2 rounded text-xs leading-snug transition-colors ${
                  item === value
                    ? 'bg-red-950/40 border border-red-800/60 text-red-200'
                    : 'bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-300 border border-transparent'
                }`}
              >
                {item}
              </button>
            ))}
            {filteredPickerItems.length === 0 && (
              <div className="text-xs text-zinc-500 p-2 text-center">No matching options.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
