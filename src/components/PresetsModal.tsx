import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { ScenarioState } from '../data/categories/types';

interface PresetItem {
  id: string;
  title: string;
  theme: string;
  scenario: ScenarioState;
}

const CURATED_PRESETS: PresetItem[] = [
  {
    id: 'snowbound-lodge',
    title: 'The Snowbound Leverage',
    theme: 'Atmospheric Isolation & Step-Family Tension',
    scenario: {
      world: 'A secluded, snowed-in mountain lodge during a massive blizzard, miles from any cell tower.',
      role: 'The sole male heir to a family fortune, entirely surrounded by very ambitious step-relatives.',
      women: 'Your incredibly sharp, impossibly beautiful step-sister who holds a piece of devastating leverage over you.',
      dynamic: 'A slow, methodical campaign of blackmail that feels terrifyingly good to surrender to.',
      taboo: 'A deep, compelling descent into domestic servitude, blurring the lines of step-family boundaries.',
    },
  },
  {
    id: 'corporate-overtime',
    title: 'The Midnight Executive',
    theme: 'Corporate Power Dynamics & Total Dependence',
    scenario: {
      world: 'A high-rise corporate office after midnight, completely empty except for the executive suite.',
      role: 'The incredibly stressed personal assistant to a woman who refuses to respect boundaries.',
      women: 'The icy, untouchable CEO who demands absolute perfection and highly personal overtime.',
      dynamic: 'An intense, deeply intoxicating reliance on her validation to get through the day.',
      taboo: 'Total financial and social dependence, orchestrated so quietly you didn\'t notice until it was too late.',
    },
  },
  {
    id: 'sorority-hypnosis',
    title: 'The Secret Society Arc',
    theme: 'Academic Secrets & Cognitive Control',
    scenario: {
      world: 'A modern university campus where a specific, highly exclusive sorority is rumored to practice old-world hypnosis.',
      role: 'A skeptical journalist trying to expose a charismatic local organization, quickly losing his objectivity.',
      women: 'A trio of fiercely competitive sorority sisters who have made you the prize of their internal rivalry.',
      dynamic: 'A magical or hypnotic bond where she feels everything you feel, and she wants you constantly overwhelmed.',
      taboo: 'Deep, inescapable hypnosis where your waking desires are no longer your own.',
    },
  },
  {
    id: 'private-island-retreat',
    title: 'The Tropical Reversal',
    theme: 'High-Stakes Surrender & Isolation',
    scenario: {
      world: 'A high-end corporate retreat at a private island resort, where the team-building exercises cross several professional lines.',
      role: 'The overly confident college student who lost a very, very serious wager.',
      women: 'Your ridiculously wealthy, deeply bored patron who views your discomfort as high art.',
      dynamic: 'A scenario where you are expected to earn your basic privileges through a series of increasingly blushing tasks.',
      taboo: 'A focus on public risk—maintaining perfect composure while enduring intense, hidden stimulation.',
    },
  },
  {
    id: 'supernatural-coven',
    title: 'The Penthouse Coven',
    theme: 'Gothic Modern & Complete Submission',
    scenario: {
      world: 'A modern penthouse apartment that belongs to a coven of incredibly modern, incredibly demanding witches.',
      role: 'The naive new roommate who didn\'t read the fine print on the lease agreement.',
      women: 'A breathtaking half-succubus who prefers a long, slow emotional unraveling over a quick meal.',
      dynamic: 'A complete reversal of power, where the untouchable authority figure is reduced to begging for her approval.',
      taboo: 'The final, terrifying realization that you never wanted to escape in the first place, and that you would gladly ask for more.',
    },
  },
];

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (scenario: ScenarioState) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121215] border border-zinc-800 rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-100 font-cinzel">
              Curated Thematic Loadouts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-xs text-zinc-400">
            Select any pre-configured scenario loadout to populate all 5 categories at once.
          </p>

          <div className="grid gap-3">
            {CURATED_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset.scenario);
                  onClose();
                }}
                className="w-full text-left p-4 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-red-900/80 rounded-lg transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-red-400 font-cinzel tracking-wide flex items-center gap-2">
                    <span>{preset.title}</span>
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-red-400/80 group-hover:text-red-300">
                    <span>Load</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 mb-2 font-medium">
                  {preset.theme}
                </div>

                <div className="text-xs text-zinc-400 line-clamp-2 italic bg-black/40 p-2 rounded border border-zinc-800/60">
                  "{preset.scenario.world} {preset.scenario.role} {preset.scenario.dynamic}"
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
