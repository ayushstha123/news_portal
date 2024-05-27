import React from 'react';

const categories = ['Breaking News', 'Global', 'World', 'Entertainment', 'Technology', 'Health', 'Science', 'Sports'];

const CategoryNav = ({ onCategorySelect }) => {
  return (
    <div className='category-nav'>
      {categories.map((category) => (
        <button key={category} onClick={() => onCategorySelect(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
