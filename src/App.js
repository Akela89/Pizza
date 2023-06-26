import React from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Category from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Category />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Четыре сыра" price={350} />
            <PizzaBlock title="Салями" price={450} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
