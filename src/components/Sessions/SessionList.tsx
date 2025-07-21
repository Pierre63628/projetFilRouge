import React, { useState } from 'react';
import { useSession } from '../../contexts/SessionContext.tsx';
import SessionCard from './SessionCard.tsx';
import './SessionList.css';

const SessionList: React.FC = () => {
  const { sessions } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const filteredAndSortedSessions = sessions
    .filter(session => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === 'all' || session.difficulty === difficultyFilter;
      
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'low' && session.price <= 30) ||
                          (priceFilter === 'medium' && session.price > 30 && session.price <= 40) ||
                          (priceFilter === 'high' && session.price > 40);
      
      return matchesSearch && matchesDifficulty && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration - b.duration;
        case 'difficulty':
          const difficultyOrder = { 'Facile': 1, 'Intermédiaire': 2, 'Difficile': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  return (
    <div className="session-list-container">
      <div className="session-list-header">
        <h1>🏚️ Nos Sessions d'Escape Game</h1>
        <p>Découvrez nos expériences immersives d'horreur et de mystère</p>
      </div>

      <div className="session-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="search">Rechercher:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nom, thème, description..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty">Difficulté:</label>
            <select
              id="difficulty"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">Toutes</option>
              <option value="Facile">Facile</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="price">Prix:</label>
            <select
              id="price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">Tous les prix</option>
              <option value="low">≤ 30€</option>
              <option value="medium">31-40€</option>
              <option value="high"> 40€</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Trier par:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nom</option>
              <option value="price">Prix</option>
              <option value="duration">Durée</option>
              <option value="difficulty">Difficulté</option>
            </select>
          </div>
        </div>

        <div className="results-info">
          {filteredAndSortedSessions.length} session(s) trouvée(s)
        </div>
      </div>

      <div className="sessions-grid">
        {filteredAndSortedSessions.map(session => (
          <SessionCard key={session.id} session={session} />
        ))}
        
        {filteredAndSortedSessions.length === 0 && (
          <div className="no-sessions-found">
            <div className="no-sessions-icon">🔍</div>
            <h3>Aucune session trouvée</h3>
            <p>
              {searchTerm || difficultyFilter !== 'all' || priceFilter !== 'all'
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Aucune session n\'est actuellement disponible.'
              }
            </p>
            {(searchTerm || difficultyFilter !== 'all' || priceFilter !== 'all') && (
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                  setPriceFilter('all');
                }}
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionList;
