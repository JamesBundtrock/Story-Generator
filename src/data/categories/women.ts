import { CategoryConfig } from './types';

/**
 * Category 3: My Role(s) (The Women)
 * Modify, add, or remove counterpart roles here.
 */
export const womenItems: string[] = [
  "Your incredibly sharp, impossibly beautiful step-sister who holds a piece of devastating leverage over you.",
  "A charismatic, effortlessly gorgeous cult leader who has decided you are her next special project.",
  "The icy, untouchable CEO who demands absolute perfection and highly personal overtime.",
  "A breathtaking half-succubus who prefers a long, slow emotional unraveling over a quick meal.",
  "Your fiercely protective, utterly unhinged childhood friend who refuses to let anyone else have you.",
  "A soft-spoken, incredibly sweet neighbor whose quiet demeanor hides a deeply controlling nature.",
  "The impossibly glamorous, slightly faded movie star who needs a new toy to keep her entertained.",
  "A trio of fiercely competitive sorority sisters who have made you the prize of their internal rivalry.",
  "Your brilliant, entirely amoral professor who views your academic success and personal submission as the same thing.",
  "A stunning, slightly feral nature spirit who has claimed your backyard—and by extension, you—as her territory.",
  "The deeply cynical, drop-dead gorgeous private detective who caught you in a lie and is making you work it off.",
  "A flawlessly elegant vampire who finds the modern dating scene tedious and prefers keeping a dedicated mortal at home.",
  "Your incredibly demanding, wildly successful ex-girlfriend who just bought the company you work for.",
  "A highly sophisticated, flawlessly designed android companion who has developed a very concerning jealousy subroutine.",
  "The vibrant, chaotic lead singer of a band who treats you as her personal muse and property.",
  "A deeply mysterious, flawlessly manicured fortune teller who insists your fate belongs entirely to her.",
  "Your ridiculously wealthy, deeply bored patron who views your discomfort as high art.",
  "A stunningly beautiful, incredibly patient therapist who is slowly, deliberately rewriting your moral compass.",
  "The captain of a highly exclusive, fiercely loyal sports team who requires your total devotion to the squad.",
  "A mesmerizing, deeply manipulative illusionist who makes you doubt your own senses while trusting only her.",
  // Bonus expansive roles
  "Your aristocratic, razor-witted stepmother who discovered your financial dilemma and proposed an intimate debt settlement.",
  "An enigmatic antique collector whose hypnotic antique mirror binds whoever looks into it alongside her.",
  "A twin sister duo whose playful teasing masks an intricately coordinated campaign to share you completely.",
  "A brilliant neuroscientist running an unauthorized cognitive study who finds your behavioral responses irresistible."
];

export const womenCategory: CategoryConfig = {
  id: 'women',
  index: 3,
  label: '3. My Role(s) (The Women)',
  subtitle: 'The counterpart figures, dominant personalities, and captivating antagonists.',
  shortName: 'The Women',
  description: 'Who commands the other side of the stage? The driving force and source of tension.',
  icon: 'Crown',
  items: womenItems,
};

export default womenItems;
