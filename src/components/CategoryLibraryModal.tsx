import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Copy, 
  FileCode, 
  RotateCcw, 
  Download, 
  Upload, 
  Sparkles,
  Compass,
  User,
  Crown,
  Flame,
  Search
} from 'lucide-react';
import { CategoryConfig, CategoryId } from '../data/categories/types';
import { CATEGORIES, exportAllPoolsAsJSON, DEFAULT_ITEM_POOLS } from '../data/categories';

interface CategoryLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  pools: Record<CategoryId, string[]>;
  onUpdatePool: (categoryId: CategoryId, newItems: string[]) => void;
  onResetCategory: (categoryId: CategoryId) => void;
  onResetAll: () => void;
  onImportPools: (pools: Record<CategoryId, string[]>) => void;
}

export const CategoryLibraryModal: React.FC<CategoryLibraryModalProps> = ({
  isOpen,
  onClose,
  pools,
  onUpdatePool,
  onResetCategory,
  onResetAll,
  onImportPools,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryId>('world');
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [viewCodeMode, setViewCodeMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const currentItems = pools[activeTab] || [];

  const filteredItems = currentItems.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'world': return <Compass className="w-4 h-4 text-red-400" />;
      case 'role': return <User className="w-4 h-4 text-red-400" />;
      case 'women': return <Crown className="w-4 h-4 text-red-400" />;
      case 'dynamic': return <Flame className="w-4 h-4 text-red-400" />;
      case 'taboo': return <Sparkles className="w-4 h-4 text-red-400" />;
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newItemText.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...currentItems];
    onUpdatePool(activeTab, updated);
    setNewItemText('');
    showToast(`Added new option to ${currentCategory.shortName}`);
  };

  const handleBulkAdd = () => {
    const lines = bulkText
      .split('\n')
      .map(l => l.trim().replace(/^["'\d\.\-\*•]+\s*/, '').replace(/["',]+$/, ''))
      .filter(l => l.length > 3);

    if (lines.length === 0) return;
    const updated = [...lines, ...currentItems];
    onUpdatePool(activeTab, updated);
    setBulkText('');
    setIsBulkOpen(false);
    showToast(`Imported ${lines.length} options to ${currentCategory.shortName}`);
  };

  const handleDeleteItem = (index: number) => {
    if (currentItems.length <= 1) {
      alert('A category must have at least one option to roll.');
      return;
    }
    const updated = currentItems.filter((_, idx) => idx !== index);
    onUpdatePool(activeTab, updated);
  };

  const handleStartEdit = (index: number, current: string) => {
    setEditingIndex(index);
    setEditingText(current);
  };

  const handleSaveEdit = (index: number) => {
    const trimmed = editingText.trim();
    if (!trimmed) return;
    const updated = [...currentItems];
    updated[index] = trimmed;
    onUpdatePool(activeTab, updated);
    setEditingIndex(null);
  };

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Generate the clean TypeScript file content for a specific category
  const getCategoryTypeScriptCode = (targetCat: CategoryId = activeTab) => {
    const cat = CATEGORIES.find(c => c.id === targetCat) || currentCategory;
    const items = pools[targetCat] || [];
    const varName = `${targetCat}Items`;
    const formattedArray = items
      .map(item => `  ${JSON.stringify(item)},`)
      .join('\n');

    return `import { CategoryConfig } from './types';

/**
 * Category ${cat.index}: ${cat.label}
 * Target File: /src/data/categories/${targetCat}.ts
 */
export const ${varName}: string[] = [
${formattedArray}
];

export const ${targetCat}Category: CategoryConfig = {
  id: '${targetCat}',
  index: ${cat.index},
  label: '${cat.label}',
  subtitle: '${cat.subtitle}',
  shortName: '${cat.shortName}',
  description: '${cat.description}',
  icon: '${cat.icon}',
  items: ${varName},
};

export default ${varName};
`;
  };

  const handleDownloadCategoryFile = (catId: CategoryId = activeTab) => {
    const code = getCategoryTypeScriptCode(catId);
    const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${catId}.ts`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${catId}.ts (${pools[catId]?.length || 0} options)`);
  };

  const handleDownloadAllFiles = () => {
    (['world', 'role', 'women', 'dynamic', 'taboo'] as CategoryId[]).forEach((catId, idx) => {
      setTimeout(() => {
        handleDownloadCategoryFile(catId);
      }, idx * 250);
    });
    showToast('Downloaded all 5 category .ts files!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCategoryTypeScriptCode(activeTab));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyFullExport = () => {
    const json = exportAllPoolsAsJSON(pools);
    navigator.clipboard.writeText(json);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      const incoming = parsed.categories || parsed;
      const validPools: Record<CategoryId, string[]> = { ...pools };
      let count = 0;
      (['world', 'role', 'women', 'dynamic', 'taboo'] as CategoryId[]).forEach(cat => {
        if (Array.isArray(incoming[cat]) && incoming[cat].length > 0) {
          validPools[cat] = incoming[cat];
          count++;
        }
      });
      if (count === 0) {
        alert('Invalid format: no category arrays found for world, role, women, dynamic, or taboo.');
        return;
      }
      onImportPools(validPools);
      setShowImportArea(false);
      setImportJsonText('');
      showToast(`Successfully imported loadout for ${count} categories!`);
    } catch {
      alert('Error parsing JSON. Please ensure it is valid JSON format.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#121215] border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/70">
          <div>
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-zinc-100 flex items-center gap-2 font-cinzel">
              <span>Category File Manager & Library</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Each category is backed by a modular file in <code className="text-red-400 font-mono text-[11px]">/src/data/categories/[category].ts</code>. Add, edit, or copy source code.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex border-b border-zinc-800/90 bg-zinc-900/60 overflow-x-auto px-4 gap-1">
          {CATEGORIES.map((cat) => {
            const count = (pools[cat.id] || []).length;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setEditingIndex(null);
                  setViewCodeMode(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-red-500 text-red-300 bg-red-950/20'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-red-900/40 text-red-200' : 'bg-zinc-800 text-zinc-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notification Toast */}
        {statusMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/70 px-6 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Top Bar for Selected Category */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800/60">
            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-2">
                <span>FILE:</span>
                <code className="text-red-400 font-mono text-xs">/src/data/categories/{activeTab}.ts</code>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-300">{currentItems.length} Total Options</span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">{currentCategory.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadCategoryFile(activeTab)}
                title={`Download ${activeTab}.ts directly to your computer to commit to GitHub`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-red-950/50 hover:bg-red-900/70 border border-red-800 text-red-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-red-400" />
                <span>Download {activeTab}.ts</span>
              </button>

              <button
                onClick={() => setViewCodeMode(!viewCodeMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                  viewCodeMode
                    ? 'bg-red-950/50 border-red-500 text-red-200'
                    : 'bg-zinc-900 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-red-400" />
                <span>{viewCodeMode ? 'Show List' : 'View File Code'}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Reset "${currentCategory.shortName}" back to original default items?`)) {
                    onResetCategory(activeTab);
                    showToast(`Reset ${currentCategory.shortName} to defaults.`);
                  }
                }}
                title="Reset this category to default loadout"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Cat</span>
              </button>
            </div>
          </div>

          {viewCodeMode ? (
            /* Code View for the specific file */
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-zinc-400">
                  Ready-to-use TypeScript code for <code className="text-red-400 font-mono">/src/data/categories/{activeTab}.ts</code>:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadCategoryFile(activeTab)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 border border-red-700 text-red-200 rounded text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-red-400" />
                    <span>Download {activeTab}.ts</span>
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded text-xs transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied File Code!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>
              <pre className="bg-[#0b0b0d] border border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-96 select-all">
                {getCategoryTypeScriptCode(activeTab)}
              </pre>
            </div>
          ) : (
            /* Normal List & Add UI */
            <div className="space-y-4">
              {/* Add New Item Input */}
              <form onSubmit={handleAddItem} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Add a new ${currentCategory.shortName.toLowerCase()} option...`}
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  className="flex-1 bg-zinc-900/90 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  disabled={!newItemText.trim()}
                  className="px-4 py-2.5 bg-red-950/70 hover:bg-red-900 border border-red-700 text-red-200 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Option</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsBulkOpen(!isBulkOpen)}
                  className="px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Bulk Add
                </button>
              </form>

              {/* Bulk Add Textarea */}
              {isBulkOpen && (
                <div className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg space-y-2 animate-in fade-in duration-150">
                  <div className="text-xs text-zinc-300 font-medium">
                    Paste multiple options (one per line):
                  </div>
                  <textarea
                    rows={4}
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="An isolated research post in the Arctic...&#10;A secret floor of a high-end department store after hours...&#10;A masquerade banquet hosted by a rival family..."
                    className="w-full bg-[#0a0a0c] border border-zinc-700 rounded p-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBulkOpen(false)}
                      className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkAdd}
                      className="px-3 py-1.5 bg-red-950 border border-red-700 text-red-200 hover:bg-red-900 rounded text-xs font-medium cursor-pointer"
                    >
                      Import All Lines
                    </button>
                  </div>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder={`Search ${currentCategory.shortName} options...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filteredItems.map((item, idx) => {
                  const originalIndex = currentItems.indexOf(item);
                  const isEditing = editingIndex === originalIndex;

                  return (
                    <div
                      key={originalIndex}
                      className="group p-3 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 rounded-lg flex items-start justify-between gap-3 transition-colors"
                    >
                      {isEditing ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="flex-1 bg-black border border-red-500 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(originalIndex)}
                            className="p-1.5 bg-emerald-950 text-emerald-400 rounded hover:bg-emerald-900"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="p-1.5 bg-zinc-800 text-zinc-400 rounded hover:text-zinc-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-2.5 flex-1">
                            <span className="text-[11px] font-mono text-zinc-600 mt-0.5 select-none w-5">
                              {originalIndex + 1}.
                            </span>
                            <span className="text-xs text-zinc-200 leading-relaxed">
                              {item}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleStartEdit(originalIndex, item)}
                              title="Edit option"
                              className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(originalIndex)}
                              title="Delete option"
                              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-xs text-zinc-500">
                    No options match "{searchQuery}".
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Backup & Full Loadout Controls */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadAllFiles}
                title="Download all 5 category files (world.ts, role.ts, women.ts, dynamic.ts, taboo.ts)"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/80 rounded text-red-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-red-400" />
                <span>Download All 5 .ts Files</span>
              </button>

              <button
                onClick={handleCopyFullExport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedExport ? 'Copied Full JSON!' : 'Export All Loadouts JSON'}</span>
              </button>

              <button
                onClick={() => setShowImportArea(!showImportArea)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON Loadout</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (confirm('Reset ALL categories back to original defaults? This will erase all added custom items.')) {
                  onResetAll();
                  showToast('Reset all 5 categories to factory defaults.');
                }
              }}
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              Reset All 5 Categories to Default
            </button>
          </div>

          {showImportArea && (
            <div className="p-4 bg-zinc-900 border border-zinc-700/80 rounded-lg space-y-2 animate-in fade-in">
              <span className="text-xs text-zinc-300 font-medium">Paste exported loadout JSON:</span>
              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"categories": { "world": [...], "role": [...] }}'
                className="w-full bg-black border border-zinc-700 rounded p-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-red-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowImportArea(false)}
                  className="px-3 py-1 text-xs text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportJson}
                  className="px-3 py-1 bg-red-950 border border-red-700 text-red-200 rounded text-xs font-medium cursor-pointer"
                >
                  Apply Imported Loadout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
