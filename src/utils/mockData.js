const mockDecks = {
  data: [
  { name: 'Deck A', id: '1', authorId: '1', logo: 'favicon.png', shortDesc: 'Deck A is a deck' },
  { name: 'Deck B', id: '2', authorId: '2', logo: 'favicon.png', shortDesc: 'Deck B is a deck' },
  { name: 'Deck C', id: '3', authorId: '3', logo: 'favicon.png', shortDesc: 'Deck C is a deck' },
  { name: 'Deck D', id: '4', authorId: '4', logo: 'favicon.png', shortDesc: 'Deck D is a deck' },
  { name: 'Deck E', id: '5', authorId: '5', logo: 'favicon.png', shortDesc: 'Deck E is a deck' },
  { name: 'Deck F', id: '6', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck F is a deck' },
  { name: 'Deck G', id: '7', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck G is a deck' },
  { name: 'Deck H', id: '8', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck H is a deck' },
  { name: 'Deck I', id: '9', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck I is a deck' },
  { name: 'Deck J', id: '10', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck J is a deck' },
  { name: 'Deck K', id: '11', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck K is a deck' },
  { name: 'Deck L', id: '12', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck L is a deck' },
  { name: 'Deck M', id: '13', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck M is a deck' },
  { name: 'Deck N', id: '14', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck N is a deck' },
  { name: 'Deck O', id: '15', authorId: '6', logo: 'favicon.png', shortDesc: 'Deck O is a deck' },
]};

const mockUsers = {
  data: [
  { id: '1', email: 'a@a.com', gamesPlayed: 0, gamesWon: 0, profilePicture: 'favicon.png', friends: [], decks: ['1'], name: 'Richard Richardson' }, 
  { id: '2', email: 'a@a.com', gamesPlayed: 0, gamesWon: 0, profilePicture: 'favicon.png', friends: ['3', '4'], decks: ['2'], name: 'Adam Adamson' }, 
  { id: '3', email: 'a@a.com', gamesPlayed: 0, gamesWon: 0, profilePicture: 'favicon.png', friends: ['2'], decks: ['3'], name: 'Thomas Thompson' }, 
  { id: '4', email: 'a@a.com', gamesPlayed: 0, gamesWon: 0, profilePicture: 'favicon.png', friends: ['3'], decks: ['4'], name: 'Angela Angel' }, 
  { id: '5', email: 'a@a.com', gamesPlayed: 0, gamesWon: 0, profilePicture: 'favicon.png', friends: ['6'], decks: ['5'], name: 'Ruth Ruthson' },
  { id: '6', email: 'a@a.com', gamesPlayed: 0, gamesWon: 0, profilePicture: 'favicon.png', friends: ['5'], decks: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], name: 'Fredrick Fredrickson' },
]};

export {
  mockDecks,
  mockUsers
} 
