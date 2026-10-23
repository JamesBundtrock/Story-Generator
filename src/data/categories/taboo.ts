import { CategoryConfig } from './types';

/**
 * Category 5: The Twist / The Taboo
 * Modify, add, or remove twists, taboos, and stakes here.
 */
export const tabooItems: string[] = [
  "Intense sensory deprivation, focusing entirely on anticipation and loss of control.",
  "Deep, inescapable hypnosis where your waking desires are no longer your own.",
  "A highly pressurized situation requiring complete silence and stillness while being profoundly overwhelmed.",
  "Heavy, unavoidable voyeurism, where performance for an unseen audience is mandatory.",
  "Total financial and social dependence, orchestrated so quietly you didn't notice until it was too late.",
  "A deep, compelling descent into domestic servitude, blurring the lines of step-family boundaries.",
  "Highly negotiated but intensely strict consensual non-consent (CNC) scenarios.",
  "A focus on public risk—maintaining perfect composure while enduring intense, hidden stimulation.",
  "A deeply psychological undoing of your traditional masculinity, replacing it with something softer and more compliant.",
  "An extreme focus on endurance, where release is entirely dictated by her timeline.",
  "A deeply tangled polyamorous dynamic where you belong equally to a highly coordinated group.",
  "The slow, willing surrender of your own memories or sense of reality, leaning entirely on her version of events.",
  "Heavy, aesthetic restraint, focusing on elegance and immobility.",
  "A dynamic heavily reliant on the sharing of deeply personal, compromising secrets to ensure loyalty.",
  "A highly concentrated focus on your physical vulnerability, utilizing sleep or extreme exhaustion to bypass your defenses.",
  "The introduction of sensory manipulation, where she controls exactly what you see, hear, and feel.",
  "A deeply possessive branding dynamic, whether through literal marks or inescapable social signifiers.",
  "A scenario deeply rooted in intense, overwhelming adulation, treating her as a flawless idol.",
  "An extreme focus on size or power disparity, emphasizing your complete inability to physically resist the situation.",
  "The final, terrifying realization that you never wanted to escape in the first place, and that you would gladly ask for more.",
  // Bonus expansive twists
  "A clandestine photographic or video record compiled of your compromises, held as collateral against your obedience.",
  "A total inversion of public status where you must address her with reverent formality in private and feign indifference in public.",
  "A conditioning regimen utilizing audio triggers and subtle physical touches that bypass conscious hesitation.",
  "A captive masquerade where identities remain shielded behind ornate masks while boundaries dissolve."
];

export const tabooCategory: CategoryConfig = {
  id: 'taboo',
  index: 5,
  label: '5. The Twist / The Taboo',
  subtitle: 'The forbidden boundary crossed, psychological vulnerability, or inescapable stakes.',
  shortName: 'The Taboo',
  description: 'What makes this scenario dangerous, thrilling, or irreversible? The taboo threshold.',
  icon: 'Sparkles',
  items: tabooItems,
};

export default tabooItems;
