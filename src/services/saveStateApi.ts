const USER = 'USER';

interface SaveState {
  roomID: string;
  userID: string;
}

const saveStateApi = {
  loadStateFromStorage: () => {
    const userData = localStorage.getItem(USER);
    if (userData) return JSON.parse(userData);
    return null;
  },
  saveStateToStorage: ({ roomID, userID }: SaveState) => {
    localStorage.setItem(USER, JSON.stringify({ roomID, userID }));
  },
  clearStorage: () => {
    localStorage.clear();
  },
};

export default saveStateApi;
