import React from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import Categories from './Components/Categories';
import pizzas from './assets/pizzas.json';

console.log(pizzas);

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://649ad76dbf7c145d0239920e.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

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
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
