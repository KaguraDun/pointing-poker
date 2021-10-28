const USER = 'USER';

interface SaveState {
  roomID: string;
  userID: string;
}

const saveStateApi = {
  loadStateFromStorage: () => {
    const userData = sessionStorage.getItem(USER);
    if (userData) return JSON.parse(userData);
    return null;
  },
  saveStateToStorage: ({ roomID, userID }: SaveState) => {
    sessionStorage.setItem(USER, JSON.stringify({ roomID, userID }));
  },
  clearStorage: () => {
    sessionStorage.clear();
  },
};

export default saveStateApi;
