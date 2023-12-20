import React from 'react';

function Catigories({ value, onClickCategories }) {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoriesName, index) => (
          <li
            key={index}
            onClick={() => onClickCategories(index)}
            className={value === index ? 'active' : ''}>
            {categoriesName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catigories;
