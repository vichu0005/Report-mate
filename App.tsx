import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { TemplatesPage } from './components/TemplatesPage';
import { ReportMateAIPage } from './components/ReportMateAIPage';
import { ChatbotFab } from './components/ChatbotFab';
import { GuideChatbot } from './components/GuideChatbot';
import { LoginPage } from './components/LoginPage';
import { YourDesignsPage } from './components/YourDesignsPage';
import { DesignPreviewModal } from './components/DesignPreviewModal';
import { Page, Design } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<Page>('Home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [recentDesigns, setRecentDesigns] = useState<Design[]>([]);
  const [viewingDesign, setViewingDesign] = useState<Design | null>(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');

  const addRecentDesign = useCallback((design: Design) => {
    // Add new designs to the front and limit the total number of saved designs.
    setRecentDesigns(prev => [design, ...prev].slice(0, 20));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);
  
  const toggleChatbot = useCallback(() => {
    setIsChatbotOpen(prev => !prev);
  }, []);

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setRecentDesigns([]);
    setActivePage('Home');
  };

  const handleSearch = useCallback((query: string) => {
    setInitialSearchQuery(query);
    setActivePage('Templates');
  }, []);

  const clearInitialSearch = useCallback(() => {
    setInitialSearchQuery('');
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <HomePage setActivePage={setActivePage} username={username} recentDesigns={recentDesigns.slice(0, 4)} onViewDesign={setViewingDesign} onSearch={handleSearch} />;
      case 'Templates':
        return <TemplatesPage initialQuery={initialSearchQuery} onClearInitialQuery={clearInitialSearch} />;
      case 'ReportMate AI':
        return <ReportMateAIPage onReportGenerated={addRecentDesign} />;
      case 'Your Designs':
        return <YourDesignsPage designs={recentDesigns} onViewDesign={setViewingDesign} />;
      default:
        return <HomePage setActivePage={setActivePage} username={username} recentDesigns={recentDesigns.slice(0, 4)} onViewDesign={setViewingDesign} onSearch={handleSearch} />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar isOpen={isSidebarOpen} activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} username={username} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative">
          {renderPage()}
          <ChatbotFab onClick={toggleChatbot} />
          <GuideChatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
          <DesignPreviewModal design={viewingDesign} onClose={() => setViewingDesign(null)} />
        </main>
      </div>
    </div>
  );
};

export default App;