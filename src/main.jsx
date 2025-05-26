import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './pages/Auth/AuthContext';
import { FavoritesProvider } from "./hooks/useFavorites";
import { SearchHistoryProvider } from "./hooks/useSearchHistory";
import { UserProvider } from "./hooks/UserContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <FavoritesProvider>
            <SearchHistoryProvider>
              <App />
            </SearchHistoryProvider>
          </FavoritesProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >
);
