export type Status = 'read' | 'reading' | 'to-read'
export type Category = 'Business' | 'Mind' | 'Philosophy' | 'Science' | 'History' | 'Fiction'

export interface Book {
  title: string
  author: string
  category: Category
  status: Status
  isFavorite: boolean
  year: number
  cover: string
}

export const BOOKS: Book[] = [
  { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', category: 'Business', status: 'read', isFavorite: true, year: 2014, cover: '/img/books/the_hard_thing_about_hard_things.jpg' },
  { title: 'Zero to One', author: 'Peter Thiel', category: 'Business', status: 'read', isFavorite: false, year: 2014, cover: '/img/books/Zero_to_One.jpg' },
  { title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', status: 'read', isFavorite: false, year: 2011, cover: '/img/books/Lean_Startup.png' },
  { title: 'Traction', author: 'Gabriel Weinberg', category: 'Business', status: 'read', isFavorite: true, year: 2015, cover: '/img/books/TRACTION.jpg' },
  { title: 'Who: The A Method for Hiring', author: 'Geoff Smart & Randy Street', category: 'Business', status: 'read', isFavorite: false, year: 2008, cover: '/img/books/WHO.jpg' },
  { title: 'Sell More Faster', author: 'Amos Schwartzfarb', category: 'Business', status: 'read', isFavorite: true, year: 2019, cover: '/img/books/sell_more_faster.jpg' },
  { title: '7 Powers', author: 'Hamilton Helmer', category: 'Business', status: 'read', isFavorite: false, year: 2016, cover: '/img/books/7_powers.jpg' },
  { title: 'Never Enough', author: 'Howard Schultz', category: 'Business', status: 'read', isFavorite: false, year: 2024, cover: '/img/books/never_enough.webp' },
  { title: 'The Making of a Manager', author: 'Julie Zhuo', category: 'Business', status: 'read', isFavorite: false, year: 2019, cover: '/img/books/the_making_of_a_manager.jpg' },
  { title: '$100M Leads', author: 'Alex Hormozi', category: 'Business', status: 'read', isFavorite: false, year: 2023, cover: '/img/books/$100M_leads.jpg' },
  { title: '$100M Offers', author: 'Alex Hormozi', category: 'Business', status: 'read', isFavorite: false, year: 2021, cover: '/img/books/$100M_offers.jpg' },
  { title: 'High Output Management', author: 'Andrew S. Grove', category: 'Business', status: 'read', isFavorite: false, year: 1983, cover: '/img/books/high_output_management.jpg' },
  { title: 'The Lean Product Playbook', author: 'Dan Olsen', category: 'Business', status: 'read', isFavorite: true, year: 2015, cover: '/img/books/the_lean_product_playbook.jpg' },
  { title: 'Principles', author: 'Ray Dalio', category: 'Business', status: 'read', isFavorite: false, year: 2017, cover: '/img/books/principles.jpg' },
  { title: "Poor Charlie's Almanack", author: 'Charlie Munger', category: 'Business', status: 'read', isFavorite: false, year: 2005, cover: "/img/books/poor_charlie's_almanack.jpg" },
  { title: 'Skin in the Game', author: 'Nassim Nicholas Taleb', category: 'Business', status: 'read', isFavorite: false, year: 2018, cover: '/img/books/skin_in_the_game.jpg' },
  { title: "The Innovator's Dilemma", author: 'Clayton Christensen', category: 'Business', status: 'reading', isFavorite: false, year: 1997, cover: "/img/books/the_innovator's_dilemma.jpg" },
  { title: 'The Five Dysfunctions of a Team', author: 'Patrick Lencioni', category: 'Business', status: 'reading', isFavorite: false, year: 2002, cover: '/img/books/the_five_dysfunctions_of_a_team.jpg' },
  { title: 'Reality Transurfing', author: 'Vadim Zeland', category: 'Mind', status: 'read', isFavorite: false, year: 2004, cover: '/img/books/reality_transurfing.jpg' },
  { title: 'Unlimited Power', author: 'Tony Robbins', category: 'Mind', status: 'read', isFavorite: false, year: 1986, cover: '/img/books/unlimited_power.jpg' },
  { title: "Man's Search for Meaning", author: 'Viktor Frankl', category: 'Mind', status: 'read', isFavorite: false, year: 1946, cover: "/img/books/man's_search_for_meaning.webp" },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', category: 'Mind', status: 'read', isFavorite: false, year: 1989, cover: '/img/books/7_habits_of_highly_effective_people.jpg' },
  { title: '101 Essays That Will Change the Way You Think', author: 'Brianna Wiest', category: 'Mind', status: 'read', isFavorite: false, year: 2016, cover: '/img/books/101_essays_that_will_change_the_way_you_think.jpg' },
  { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', category: 'Mind', status: 'read', isFavorite: false, year: 2020, cover: '/img/books/the_almanack_of_naval_ravikant.jpg' },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Mind', status: 'read', isFavorite: false, year: 2018, cover: '/img/books/atomic_habits.jpg' },
  { title: 'The 5 AM Club', author: 'Robin Sharma', category: 'Mind', status: 'read', isFavorite: false, year: 2018, cover: '/img/books/the_5_am_club.jpg' },
  { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', category: 'Mind', status: 'read', isFavorite: false, year: 1936, cover: '/img/books/how_to_win_friends_and_influence_people.jpg' },
  { title: 'Crucial Conversations: Tools for Talking When Stakes Are High', author: 'Joseph Grenny, Kerry Patterson, Ron McMillan, Al Switzler, Emily Gregory', category: 'Mind', status: 'reading', isFavorite: false, year: 2021, cover: '/img/books/crucial_conversations.jpg' },
  { title: 'On Writing Well', author: 'William Zinsser', category: 'Mind', status: 'reading', isFavorite: false, year: 2006, cover: '/img/books/on_writing_well.jpg' },
  { title: 'The Power of Now', author: 'Eckhart Tolle', category: 'Mind', status: 'read', isFavorite: false, year: 1997, cover: '/img/books/the_power_of_now.jpg' },
  { title: 'The Art of Happiness', author: 'Dalai Lama', category: 'Mind', status: 'read', isFavorite: false, year: 1998, cover: '/img/books/the_art_of_happiness.jpg' },
  { title: 'The Alchemist', author: 'Paulo Coelho', category: 'Mind', status: 'read', isFavorite: false, year: 1988, cover: '/img/books/the_alchemist.jpg' },
  { title: 'Meditations', author: 'Marcus Aurelius', category: 'Philosophy', status: 'read', isFavorite: false, year: 180, cover: '/img/books/meditations.jpg' },
  { title: 'Human, All Too Human', author: 'Friedrich Nietzsche', category: 'Philosophy', status: 'read', isFavorite: false, year: 1878, cover: '/img/books/human_all_too_human.jpg' },
  { title: 'Treatise on Toleration', author: 'Voltaire', category: 'Philosophy', status: 'read', isFavorite: false, year: 1763, cover: '/img/books/treatise_on_toleration.jpg' },
  { title: 'Meditations on First Philosophy', author: 'Rene Descartes', category: 'Philosophy', status: 'read', isFavorite: false, year: 1641, cover: '/img/books/meditations_on_first_philosophy.jpg' },
  { title: 'The Social Contract', author: 'Jean-Jacques Rousseau', category: 'Philosophy', status: 'read', isFavorite: false, year: 1762, cover: '/img/books/the_social_contract.jpg' },
  { title: 'The Little Book of Stoicism', author: 'Jonas Salzgeber', category: 'Philosophy', status: 'read', isFavorite: false, year: 2019, cover: '/img/books/the_little_book_of_stoicism.jpg' },
  { title: 'The Origin of Species', author: 'Charles Darwin', category: 'Science', status: 'read', isFavorite: false, year: 1859, cover: '/img/books/the_origin_of_species.jpg' },
  { title: 'Six Easy Pieces', author: 'Richard Feynman', category: 'Science', status: 'read', isFavorite: false, year: 1994, cover: '/img/books/six_easy_pieces.jpg' },
  { title: 'Learning Python Design Patterns', author: 'Chetan Giridhar', category: 'Science', status: 'read', isFavorite: false, year: 2016, cover: '/img/books/learning_python_design_patterns.jpg' },
  { title: 'The RLHF Book', author: 'Nathan Lambert', category: 'Science', status: 'read', isFavorite: false, year: 2025, cover: '/img/books/the_rlhf_book.webp' },
  { title: 'The Little Book of Deep Learning', author: 'François Fleuret', category: 'Science', status: 'read', isFavorite: false, year: 2023, cover: '/img/books/the_little_book_of_deep_learning.jpg' },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'reading', isFavorite: false, year: 1988, cover: '/img/books/a_brief_history_of_time.jpg' },
  { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Gamma, Helm, Johnson, Vlissides', category: 'Science', status: 'to-read', isFavorite: false, year: 1994, cover: '/img/books/design_patterns_big_four.webp' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'read', isFavorite: false, year: 2011, cover: '/img/books/sapiens.jpg' },
  { title: 'The Lessons of History', author: 'Will & Ariel Durant', category: 'History', status: 'read', isFavorite: false, year: 1968, cover: '/img/books/the_lessons_of_history.jpg' },
  { title: 'Einstein: His Life and Universe', author: 'Walter Isaacson', category: 'History', status: 'read', isFavorite: false, year: 2007, cover: '/img/books/einstein.jpg' },
  { title: 'Elon Musk', author: 'Walter Isaacson', category: 'History', status: 'read', isFavorite: false, year: 2023, cover: '/img/books/elon_musk.jpg' },
  { title: 'Leonardo da Vinci', author: 'Walter Isaacson', category: 'History', status: 'read', isFavorite: false, year: 2017, cover: '/img/books/leonardo_da_vinci.jpg' },
  { title: 'Foundation', author: 'Isaac Asimov', category: 'Fiction', status: 'read', isFavorite: false, year: 1951, cover: '/img/books/foundation.jpg' },
  { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', category: 'Fiction', status: 'read', isFavorite: false, year: 2006, cover: '/img/books/half_of_a_yellow_sun.jpg' },
  { title: 'Stranger in a Strange Land', author: 'Robert A. Heinlein', category: 'Fiction', status: 'read', isFavorite: false, year: 1961, cover: '/img/books/stranger_in_a_strange_land.jpg' },
  { title: 'The Talisman', author: 'Stephen King & Peter Straub', category: 'Fiction', status: 'read', isFavorite: false, year: 1984, cover: '/img/books/the_talisman.jpg' },
  { title: 'Neuromancer', author: 'William Gibson', category: 'Fiction', status: 'read', isFavorite: false, year: 1984, cover: '/img/books/neuromancer.jpg' },
  { title: 'Ghost Story', author: 'Peter Straub', category: 'Fiction', status: 'read', isFavorite: false, year: 1979, cover: '/img/books/ghost_story.jpg' },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', category: 'Fiction', status: 'read', isFavorite: false, year: 1952, cover: '/img/books/the_old_man_and_the_sea.jpg' },
]
