export const inspirationalQuotes = [
  {
    quote: "You are stronger than you think, braver than you believe, and loved more than you know.",
    author: "A.A. Milne"
  },
  {
    quote: "Every day may not be good, but there is something good in every day.",
    author: "Alice Morse Earle"
  },
  {
    quote: "The sun will rise, and we will try again.",
    author: "Twenty One Pilots"
  },
  {
    quote: "You are not a burden. You are a human being with feelings that deserve to be heard.",
    author: "Unknown"
  },
  {
    quote: "It's okay to not be okay. It's okay to ask for help.",
    author: "Unknown"
  },
  {
    quote: "This too shall pass. Like clouds after rain, better days are coming.",
    author: "Persian Proverb"
  },
  {
    quote: "You matter. Your feelings matter. Your story matters.",
    author: "Unknown"
  },
  {
    quote: "Healing is not linear. Every small step forward is still progress.",
    author: "Unknown"
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    quote: "The darkest hour has only sixty minutes.",
    author: "Morris Mandel"
  },
  {
    quote: "You have survived 100% of your worst days. You're doing amazing.",
    author: "Unknown"
  },
  {
    quote: "Be gentle with yourself. You're doing the best you can.",
    author: "Unknown"
  },
  {
    quote: "Stars can't shine without darkness.",
    author: "Unknown"
  },
  {
    quote: "Your present situation is not your final destination.",
    author: "Unknown"
  },
  {
    quote: "Every storm runs out of rain.",
    author: "Maya Angelou"
  }
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
  return inspirationalQuotes[randomIndex];
};
