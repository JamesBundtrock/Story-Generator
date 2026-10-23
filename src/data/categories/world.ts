import { CategoryConfig } from './types';

/**
 * Category 1: The World (Setting)
 * Modify, add, or remove settings here.
 */
export const worldItems: string[] = [
  "A secluded, snowed-in mountain lodge during a massive blizzard, miles from any cell tower.",
  "A sprawling, heavily secured luxury estate where the staff are expected to cater to every whim.",
  "A modern university campus where a specific, highly exclusive sorority is rumored to practice old-world hypnosis.",
  "A deeply isolated summer camp during the off-season, meant only for the counselors to prepare.",
  "A high-end corporate retreat at a private island resort, where the team-building exercises cross several professional lines.",
  "A quiet, upscale suburban neighborhood where the housewives seem far too coordinated and far too interested in the new neighbor.",
  "An underground, invite-only auction house where the bidding is done with favors rather than money.",
  "A luxury sleeper train traveling across a vast, empty countryside for three uninterrupted days.",
  "A prestigious, heavily cloistered academy where the grading curve is entirely dependent on private tutoring sessions.",
  "A modern penthouse apartment that belongs to a coven of incredibly modern, incredibly demanding witches.",
  "A high-security research facility where the subjects are entirely too fond of the head researcher.",
  "A quiet, dimly lit archiving basement in a massive library, where the oldest books seem to whisper.",
  "A private, ultra-exclusive country club where the initiation rites are fiercely guarded secrets.",
  "A small, tightly-knit coastal town that always seems to know exactly where you are and who you're with.",
  "A luxurious, sprawling botanical garden after hours, overseen by a very possessive caretaker.",
  "A high-rise corporate office after midnight, completely empty except for the executive suite.",
  "A secluded wellness retreat that focuses entirely on shedding inhibitions and submitting to the process.",
  "A quiet monastery hidden in the mountains, heavily populated by deeply devoted, highly curious initiates.",
  "A pristine, highly advanced smart-home that has suddenly locked all its doors from the inside.",
  "A sleepy, rain-drenched motel on a forgotten stretch of highway, where the other guests seem to share a single mind.",
  // Bonus expansive settings
  "A neon-drenched penthouse lounge above an endless cyberpunk metropolis, accessible only via biometric invitation.",
  "An old-money Parisian salon concealed behind a labyrinthine art gallery during fashion week.",
  "A private yacht drifting anchored in international waters under an eternal moonlit fog.",
  "A historic Victorian manor undergoing restoration, where the secret passages aren't entirely documented."
];

export const worldCategory: CategoryConfig = {
  id: 'world',
  index: 1,
  label: '1. The World (Setting)',
  subtitle: 'The atmosphere, isolation, and environmental rules governing the stage.',
  shortName: 'The World',
  description: 'Where does the scenario unfold? Sets the physical boundaries and seclusion.',
  icon: 'Compass',
  items: worldItems,
};

export default worldItems;
