import { CategoryConfig } from './types';

/**
 * Category 4: The Dynamic / The Hook
 * Modify, add, or remove psychological hooks and relational dynamics here.
 */
export const dynamicItems: string[] = [
  "A slow, methodical campaign of blackmail that feels terrifyingly good to surrender to.",
  "An arrangement where every favor granted requires a deeply personal favor in return.",
  "A strict domestic discipline dynamic masked as simple 'household rules.'",
  "Fake dating a high-profile figure, only to realize the 'fake' part was a lie she told to trap you.",
  "A magical or hypnotic bond where she feels everything you feel, and she wants you constantly overwhelmed.",
  "Being slowly, completely isolated from your friends and family with your enthusiastic consent.",
  "A competitive game of cat and mouse where she always lets you think you're winning right up until the trap closes.",
  "A deep, agonizingly slow burn of unspoken tension that finally snaps when you are entirely alone.",
  "Being treated as an incredibly precious, highly guarded possession that isn't allowed to make decisions.",
  "A scenario where you are expected to earn your basic privileges through a series of increasingly blushing tasks.",
  "A fiercely protected secret arrangement that would ruin your reputation if anyone found out.",
  "An intense, deeply intoxicating reliance on her validation to get through the day.",
  "Being caught in a web of three deeply entangled women who completely share you.",
  "A dynamic where she actively encourages your worst impulses, dragging you down with her.",
  "A complete reversal of power, where the untouchable authority figure is reduced to begging for her approval.",
  "A scenario where you are heavily incentivized to surrender your autonomy piece by piece.",
  "An arrangement where your physical reactions are monitored, measured, and heavily critiqued.",
  "A slow realization that the 'coincidences' bringing you together were entirely, meticulously orchestrated by her.",
  "A dynamic where you are expected to be perfectly presentable in public, and completely undone behind closed doors.",
  "An intoxicating mix of harsh critique and overwhelming praise that leaves you entirely dependent on her moods.",
  // Bonus expansive dynamics
  "A contractual servitude clause hidden in what was supposed to be a standard employment renewal.",
  "A silent wager where every resistance you mount only increases the penalty of the eventual forfeiture.",
  "An escalating sequence of private dares conducted in crowded rooms where neither of you can break character.",
  "A psychological mirror game where she gently convinces you that your desires were always her ideas."
];

export const dynamicCategory: CategoryConfig = {
  id: 'dynamic',
  index: 4,
  label: '4. The Dynamic / The Hook',
  subtitle: 'The relational trap, power imbalance, emotional engine, or coercive mechanism.',
  shortName: 'The Dynamic',
  description: 'How do the characters interact? The psychological or contractual mechanism binding them.',
  icon: 'Flame',
  items: dynamicItems,
};

export default dynamicItems;
