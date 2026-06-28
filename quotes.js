// quotes.js — FocuslyNow Quote Library
// 204 quotes across 6 categories: consistency, motivation, growth, hard-work, smart-work, heartbreak

var MF_QUOTES = [
// ── CONSISTENCY ──
{ text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", cat: "consistency" },
{ text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", cat: "consistency" },
{ text: "It's not what we do once in a while that shapes our lives, but what we do consistently.", author: "Tony Robbins", cat: "consistency" },
{ text: "Small disciplines repeated with consistency every day lead to great achievements.", author: "John C. Maxwell", cat: "consistency" },
{ text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock", cat: "consistency" },
{ text: "Motivation gets you going. Discipline keeps you growing.", author: "John C. Maxwell", cat: "consistency" },
{ text: "Consistency is more important than perfection.", author: "Unknown", cat: "consistency" },
{ text: "A river cuts through rock not because of its power, but because of its persistence.", author: "Jim Watkins", cat: "consistency" },
{ text: "Long-term consistency beats short-term intensity.", author: "Bruce Lee", cat: "consistency" },
{ text: "Dripping water hollows out stone, not through force but through persistence.", author: "Ovid", cat: "consistency" },
{ text: "You don't rise to the level of your goals, you fall to the level of your systems.", author: "James Clear", cat: "consistency" },
{ text: "The difference between who you are and who you want to be is what you do.", author: "Unknown", cat: "consistency" },
{ text: "Consistency is what transforms average into excellence.", author: "Unknown", cat: "consistency" },
{ text: "What you do every day matters more than what you do once in a while.", author: "Gretchen Rubin", cat: "consistency" },
{ text: "Show up every day. That's the whole strategy.", author: "Unknown", cat: "consistency" },
{ text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear", cat: "consistency" },
{ text: "Fall in love with the process and the results will follow.", author: "Unknown", cat: "consistency" },
{ text: "The habit of persistence is the habit of victory.", author: "Herbert Kaufman", cat: "consistency" },
{ text: "Build good habits, and they will build you.", author: "Unknown", cat: "consistency" },
{ text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", cat: "consistency" },
{ text: "Great works are performed not by strength but by perseverance.", author: "Samuel Johnson", cat: "consistency" },
{ text: "If you are persistent you will get it. If you are consistent you will keep it.", author: "Unknown", cat: "consistency" },
{ text: "The pain of discipline is far less than the pain of regret.", author: "Unknown", cat: "consistency" },
{ text: "Repetition is the mother of skill.", author: "Tony Robbins", cat: "consistency" },
{ text: "Success is earned through daily habits, not once-in-a-while leaps.", author: "Unknown", cat: "consistency" },

// ── MOTIVATION ──
{ text: "The only way to do great work is to love what you do.", author: "Steve Jobs", cat: "motivation" },
{ text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", cat: "motivation" },
{ text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", cat: "motivation" },
{ text: "The secret of getting ahead is getting started.", author: "Mark Twain", cat: "motivation" },
{ text: "It does not matter how slowly you go, as long as you do not stop.", author: "Confucius", cat: "motivation" },
{ text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", cat: "motivation" },
{ text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", cat: "motivation" },
{ text: "Push yourself because no one else is going to do it for you.", author: "Unknown", cat: "motivation" },
{ text: "Great things never come from comfort zones.", author: "Unknown", cat: "motivation" },
{ text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", cat: "motivation" },
{ text: "It always seems impossible until it's done.", author: "Nelson Mandela", cat: "motivation" },
{ text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown", cat: "motivation" },
{ text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery", cat: "motivation" },
{ text: "Your only limit is your mind.", author: "Unknown", cat: "motivation" },
{ text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", cat: "motivation" },
{ text: "Opportunities don't happen. You create them.", author: "Chris Grosser", cat: "motivation" },
{ text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown", cat: "motivation" },
{ text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", cat: "motivation" },
{ text: "Whether you think you can or think you can't, you're right.", author: "Henry Ford", cat: "motivation" },
{ text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey", cat: "motivation" },
{ text: "Every morning we are born again. What we do today matters most.", author: "Buddha", cat: "motivation" },
{ text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", cat: "motivation" },
{ text: "Action is the foundational key to all success.", author: "Pablo Picasso", cat: "motivation" },
{ text: "A winner is a dreamer who never gives up.", author: "Nelson Mandela", cat: "motivation" },
{ text: "Your attitude determines your direction.", author: "Unknown", cat: "motivation" },

// ── GROWTH ──
{ text: "Growth is painful. Change is painful. But nothing is as painful as staying stuck.", author: "Mandy Hale", cat: "growth" },
{ text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", cat: "growth" },
{ text: "You don't grow by playing it safe.", author: "Unknown", cat: "growth" },
{ text: "The only person you should try to be better than is who you were yesterday.", author: "Unknown", cat: "growth" },
{ text: "Every next level of your life will demand a different version of you.", author: "Unknown", cat: "growth" },
{ text: "Growth begins at the end of your comfort zone.", author: "Neale Donald Walsch", cat: "growth" },
{ text: "Don't fear failure. Fear being in the exact same place next year.", author: "Unknown", cat: "growth" },
{ text: "Be not afraid of growing slowly; be afraid only of standing still.", author: "Chinese Proverb", cat: "growth" },
{ text: "A comfort zone is a beautiful place, but nothing ever grows there.", author: "Unknown", cat: "growth" },
{ text: "Your current situation is not your final destination.", author: "Unknown", cat: "growth" },
{ text: "Change is the end result of all true learning.", author: "Leo Buscaglia", cat: "growth" },
{ text: "Difficulties in life are intended to make us better, not bitter.", author: "Dan Reeves", cat: "growth" },
{ text: "The biggest room in the world is the room for improvement.", author: "Helmut Schmidt", cat: "growth" },
{ text: "Sometimes you win, sometimes you learn.", author: "John C. Maxwell", cat: "growth" },
{ text: "Your life does not get better by chance, it gets better by change.", author: "Jim Rohn", cat: "growth" },
{ text: "Invest in yourself. It pays the best interest.", author: "Benjamin Franklin", cat: "growth" },
{ text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", cat: "growth" },
{ text: "Evolve or remain as you are. The choice is yours.", author: "Unknown", cat: "growth" },
{ text: "Don't limit your challenges. Challenge your limits.", author: "Unknown", cat: "growth" },
{ text: "The secret of change is to focus all your energy on building the new.", author: "Socrates", cat: "growth" },
{ text: "Today I will do what others won't so tomorrow I can do what others can't.", author: "Jerry Rice", cat: "growth" },
{ text: "There is no elevator to success. You have to take the stairs.", author: "Unknown", cat: "growth" },
{ text: "Every moment of your life is a second chance.", author: "Unknown", cat: "growth" },
{ text: "Don't be afraid of being a beginner.", author: "Unknown", cat: "growth" },
{ text: "Growth is never by mere chance; it is the result of forces working together.", author: "James Cash Penney", cat: "growth" },

// ── HARD WORK ──
{ text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke", cat: "hard-work" },
{ text: "There are no shortcuts to any place worth going.", author: "Beverly Sills", cat: "hard-work" },
{ text: "The price of success is hard work and dedication.", author: "Vince Lombardi", cat: "hard-work" },
{ text: "Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work.", author: "Stephen King", cat: "hard-work" },
{ text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison", cat: "hard-work" },
{ text: "Work hard in silence. Let your success be your noise.", author: "Frank Ocean", cat: "hard-work" },
{ text: "Hustle until you no longer need to introduce yourself.", author: "Unknown", cat: "hard-work" },
{ text: "If people knew how hard I worked to get my mastery, it wouldn't seem so wonderful.", author: "Michelangelo", cat: "hard-work" },
{ text: "A dream doesn't become reality through magic; it takes sweat, determination, and hard work.", author: "Colin Powell", cat: "hard-work" },
{ text: "Don't wish it were easier, wish you were better.", author: "Jim Rohn", cat: "hard-work" },
{ text: "You have to fight through some bad days to earn the best days of your life.", author: "Unknown", cat: "hard-work" },
{ text: "I never dreamed about success. I worked for it.", author: "Estée Lauder", cat: "hard-work" },
{ text: "Be so good they can't ignore you.", author: "Steve Martin", cat: "hard-work" },
{ text: "Your dreams don't work unless you do.", author: "John C. Maxwell", cat: "hard-work" },
{ text: "The harder you work, the luckier you get.", author: "Gary Player", cat: "hard-work" },
{ text: "Do what you have to do until you can do what you want to do.", author: "Oprah Winfrey", cat: "hard-work" },
{ text: "Some people dream of success, while other people get up every morning and make it happen.", author: "Wayne Huizenga", cat: "hard-work" },
{ text: "Put in the work when no one is watching.", author: "Unknown", cat: "hard-work" },
{ text: "Without hard work, nothing grows but weeds.", author: "Gordon B. Hinckley", cat: "hard-work" },
{ text: "Success is no accident. It is hard work, perseverance, learning, and love of what you are doing.", author: "Pele", cat: "hard-work" },
{ text: "The expert in anything was once a beginner.", author: "Helen Hayes", cat: "hard-work" },
{ text: "Good things come to those who work for it.", author: "Unknown", cat: "hard-work" },
{ text: "The fight is won far away from witnesses — behind the lines, in the gym, out there on the road.", author: "Muhammad Ali", cat: "hard-work" },
{ text: "Sweat more in training, bleed less in battle.", author: "Unknown", cat: "hard-work" },
{ text: "Outwork everyone around you and the results will speak for themselves.", author: "Unknown", cat: "hard-work" },

// ── SMART WORK ──
{ text: "Work smarter, not harder.", author: "Allen F. Morgenstern", cat: "smart-work" },
{ text: "Efficiency is doing things right. Effectiveness is doing the right things.", author: "Peter Drucker", cat: "smart-work" },
{ text: "Focus on being productive instead of busy.", author: "Tim Ferriss", cat: "smart-work" },
{ text: "Strategy is about making choices, trade-offs; it's about deliberately choosing to be different.", author: "Michael Porter", cat: "smart-work" },
{ text: "The key is not to prioritize what's on your schedule but to schedule your priorities.", author: "Stephen Covey", cat: "smart-work" },
{ text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", cat: "smart-work" },
{ text: "Until we can manage time, we can manage nothing else.", author: "Peter Drucker", cat: "smart-work" },
{ text: "Plan your work for today and every day, then work your plan.", author: "Margaret Thatcher", cat: "smart-work" },
{ text: "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.", author: "Abraham Lincoln", cat: "smart-work" },
{ text: "Don't confuse activity with productivity.", author: "Unknown", cat: "smart-work" },
{ text: "Leverage is everything. Multiply your effort through systems.", author: "Unknown", cat: "smart-work" },
{ text: "The 80/20 principle: 80% of results come from 20% of efforts.", author: "Vilfredo Pareto", cat: "smart-work" },
{ text: "Stop majoring in minor things.", author: "Jim Rohn", cat: "smart-work" },
{ text: "Create systems, not goals. Goals are outcomes; systems are what produce them.", author: "James Clear", cat: "smart-work" },
{ text: "Know the difference between being busy and being productive.", author: "Unknown", cat: "smart-work" },
{ text: "Productivity is never an accident. It is always the result of intelligent planning and focused effort.", author: "Paul J. Meyer", cat: "smart-work" },
{ text: "Eliminate the unnecessary so the necessary may speak.", author: "Hans Hofmann", cat: "smart-work" },
{ text: "Think like a person of action, act like a person of thought.", author: "Henri Bergson", cat: "smart-work" },
{ text: "Concentrate all your thoughts upon the work at hand.", author: "Alexander Graham Bell", cat: "smart-work" },
{ text: "Measure twice, cut once.", author: "Proverb", cat: "smart-work" },
{ text: "Results, not efforts, are the true measure of smart work.", author: "Unknown", cat: "smart-work" },
{ text: "Thinking ahead and planning smart saves double the effort later.", author: "Unknown", cat: "smart-work" },
{ text: "A smart person knows how to get out of a problem faster than how they got into it.", author: "Unknown", cat: "smart-work" },
{ text: "Automate, delegate, eliminate — then execute.", author: "Unknown", cat: "smart-work" },
{ text: "Working on the right thing is more important than working hard.", author: "Unknown", cat: "smart-work" },

// ── HEARTBREAK ──
{ text: "The heart was made to be broken.", author: "Oscar Wilde", cat: "heartbreak" },
{ text: "Pain makes you stronger. Tears make you braver. Heartbreak makes you wiser.", author: "Unknown", cat: "heartbreak" },
{ text: "Never allow someone to be your priority while allowing yourself to be their option.", author: "Mark Twain", cat: "heartbreak" },
{ text: "Sometimes you have to forget what you feel and remember what you deserve.", author: "Unknown", cat: "heartbreak" },
{ text: "The hottest love has the coldest end.", author: "Socrates", cat: "heartbreak" },
{ text: "It's hard to forget someone who gave you so much to remember.", author: "Unknown", cat: "heartbreak" },
{ text: "Sometimes good things fall apart so better things can fall together.", author: "Marilyn Monroe", cat: "heartbreak" },
{ text: "You can't start the next chapter if you keep re-reading the last one.", author: "Unknown", cat: "heartbreak" },
{ text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo", cat: "heartbreak" },
{ text: "Letting go doesn't mean giving up, but accepting that there are things that cannot be.", author: "Unknown", cat: "heartbreak" },
{ text: "Don't cling to a mistake just because you spent a long time making it.", author: "Unknown", cat: "heartbreak" },
{ text: "Sometimes it takes a heartbreak to shake us awake.", author: "Mandy Hale", cat: "heartbreak" },
{ text: "You will heal. Give it time. Be kind to yourself.", author: "Unknown", cat: "heartbreak" },
{ text: "Not all storms come to disrupt your life; some come to clear your path.", author: "Unknown", cat: "heartbreak" },
{ text: "The most painful goodbyes are the ones never said and never explained.", author: "Unknown", cat: "heartbreak" },
{ text: "Grief is the price we pay for love. And it is worth every penny.", author: "Unknown", cat: "heartbreak" },
{ text: "What hurts you today makes you stronger tomorrow.", author: "Unknown", cat: "heartbreak" },
{ text: "I may have lost someone who didn't love me, but you lost someone who truly loved you.", author: "Unknown", cat: "heartbreak" },
{ text: "Crying is how your body speaks when your mouth can't explain the pain you feel.", author: "Unknown", cat: "heartbreak" },
{ text: "Don't cry when the sun is gone, because the tears won't let you see the stars.", author: "Violeta Parra", cat: "heartbreak" }
];

// ── QUOTE ENGINE ──
function getMFQuote() {
  try {
    var now = Date.now();
    var windowMs = 90 * 1000;
    var stored = sessionStorage.getItem('fl_quote_seed');
    var sessionSeed = stored ? parseInt(stored) : Math.floor(Math.random() * 9999);
    sessionStorage.setItem('fl_quote_seed', sessionSeed);
    var windowIndex = Math.floor(now / windowMs);
    var idx = (sessionSeed + windowIndex) % MF_QUOTES.length;
    return MF_QUOTES[idx];
  } catch(e) {
    return MF_QUOTES[Math.floor(Math.random() * MF_QUOTES.length)];
  }
}

function msMFNextWindow() {
  var windowMs = 90 * 1000;
  return windowMs - (Date.now() % windowMs);
}
