import React from 'react';
import EditableTable from './components/EditableTable';
import PageHeader from './components/PageHeader';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <PageHeader />
        <EditableTable />
      </div>
    </div>
  );
};

export default App;
