import { CategoryConfig } from './types';

/**
 * Category 2: Your Role (The Protagonist)
 * Modify, add, or remove protagonist roles here.
 */
export const roleItems: string[] = [
  "The incredibly stressed personal assistant to a woman who refuses to respect boundaries.",
  "The naive new roommate who didn't read the fine print on the lease agreement.",
  "A private investigator hired to watch someone, completely unaware they are watching him back.",
  "The sole male heir to a family fortune, entirely surrounded by very ambitious step-relatives.",
  "A newly hired tutor for a wealthy, brilliantly manipulative young woman.",
  "The exhausted night-shift security guard who keeps finding things he isn't supposed to see.",
  "A skeptical journalist trying to expose a charismatic local organization, quickly losing his objectivity.",
  "The overly confident college student who lost a very, very serious wager.",
  "A disgraced former athlete desperate for a sponsor who demands total dedication.",
  "The quiet, observant librarian who accidentally translated the wrong incantation aloud.",
  "A reluctant participant in an experimental psychological study on obedience.",
  "The newly appointed manager of a team that has already decided they are going to break him.",
  "A delivery driver who made a drop-off at the wrong house and was politely invited inside.",
  "The skeptical landlord checking on a tenant who has very unusual methods of paying rent.",
  "A highly sought-after artist whose newest patron wants far more than just a painting.",
  "The deeply indebted gambler who was offered a highly unconventional way to clear his ledger.",
  "A cynical ghost hunter who suddenly finds himself trapped by a very tangible, very demanding spirit.",
  "The perfectly polite neighbor who was invited over for dinner and realizes he isn't meant to leave.",
  "A newly transferred student trying to navigate the complex social web of a very predatory clique.",
  "The loyal best friend who has been quietly pining, completely unaware that he was chosen a long time ago.",
  // Bonus expansive roles
  "The court-appointed conservator who gradually realizes his wealthy ward is pulling all the strings.",
  "An architectural photographer who stumbled upon a private gathering in the estate's closed west wing.",
  "A live-in personal physical therapist bound by an ironclad NDA and an eccentric client's daily demands.",
  "The gifted understudy pianist preparing for a debut under the relentless private tutelage of a ruthless virtuoso."
];

export const roleCategory: CategoryConfig = {
  id: 'role',
  index: 2,
  label: '2. Your Role (The Protagonist)',
  subtitle: 'Your position, vulnerabilities, obligations, and relationship to power.',
  shortName: 'Your Role',
  description: 'Who are you in this scenario? Establishes your perspective and leverage point.',
  icon: 'User',
  items: roleItems,
};

export default roleItems;
