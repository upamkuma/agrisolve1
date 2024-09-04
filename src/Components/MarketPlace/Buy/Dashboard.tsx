import React from 'react';
import ProductCard from './ProductCard';

const Dashboard = () => {
  const products = [
    {
      image: 'https://th.bing.com/th?id=OPAC.r4FA8rRTeM4uhA474C474&w=220&h=210&c=17&o=5&dpr=1.3&pid=21.1',
      name: 'Hero Product',
      description: 'This is a description for the hero product.',
      price: '200',
    },
    {
      image: 'https://th.bing.com/th?id=OPAC.cAFrdaY%2fYGZczg474C474&w=220&h=210&c=17&o=5&dpr=1.3&pid=21.1',
      name: 'Product 1',
      description: 'This is a description for product 1.',
      price: '550',
    },
    {
      image: 'https://th.bing.com/th?id=OPAC.jxuPGvoHGnVS1g474C474&w=220&h=210&c=17&o=5&dpr=1.3&pid=21.1',
      name: 'Product 2',
      description: 'This is a description for product 2.',
      price: '750',
    },
    {
      image: 'https://th.bing.com/th?id=OPAC.ZKMrQCcn45MfIg474C474&w=220&h=210&c=17&o=5&dpr=1.3&pid=21.1',
      name: 'Product 3',
      description: 'This is a description for product 3.',
      price: '1000',
    },
    {
      image: 'https://th.bing.com/th?id=OPAC.OqpRweeqyMA7jA474C474&w=220&h=210&c=17&o=5&dpr=1.3&pid=21.1',
      name: 'Product 4',
      description: 'This is a description for product 4.',
      price: '300',
    },
    {
      image: 'https://th.bing.com/th?id=OPAC.niYOywdbh9vGVA474C474&w=220&h=210&c=17&o=5&dpr=1.3&pid=21.1',
      name: 'Product 5',
      description: 'This is a description for product 5.',
      price: '800',
    },
    
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-dark-green">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );

};

export default Dashboard;
