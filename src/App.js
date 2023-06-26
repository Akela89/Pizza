import React from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import Categories from './Components/Categories';
import pizzas from './assets/pizzas.json';

console.log(pizzas);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock
                title={obj.title}
                price={obj.price}
                image={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
