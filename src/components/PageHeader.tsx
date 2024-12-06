import React from 'react';
import Logo from "../assets/icons/logo.svg";

const PageHeader: React.FC = () => {
  return (
    <div className="page-header">
      <div className="title">
        <h1>Тестовое задание</h1>
        <div className="developer">
          Frontend-разработчик: Игорь Батухтин
        </div>
      </div>
      <img
        src={ Logo }
        className="logo"
        width={ 154 }
        height={ 100 }
        alt='App logo'
      />
    </div>
  );
};

export default PageHeader;
