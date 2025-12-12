import React, { useState } from 'react';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { TheoryStudy } from './components/TheoryStudy';
import { VocabQuiz } from './components/VocabQuiz';
import { ProgressDashboard } from './components/ProgressDashboard';
import { TabView } from './types';

const App: React.FC = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabView>(TabView.CHAT);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (currentTab) {
      case TabView.CHAT:
        return <ChatInterface />;
      case TabView.THEORY:
        return <TheoryStudy />;
      case TabView.QUIZ:
        return <VocabQuiz />;
      case TabView.PROGRESS:
        return <ProgressDashboard />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
