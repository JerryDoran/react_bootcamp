const pets = [
  { name: 'Meowmeow', species: 'cat', age: 5, id: 1 },
  { name: 'Dug', species: 'dog', age: 6, id: 2 },
  { name: 'Fluffy', species: 'rabbit', age: 2, id: 3 },
  { name: 'Purrsalot', species: 'cat', age: 1, id: 4 },
  { name: 'Paws', species: 'dog', age: 6, id: 5 },
];

const App = () => {
  return (
    <div>
      <Header />
      <TimeArea />
      <ul>
        {pets.map((pet) => (
          <Pet
            name={pet.name}
            species={pet.species}
            age={pet.age}
            key={pet.id}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

const Pet = ({ name, species, age }) => {
  return (
    <li>
      {name} is a {species} and is {age} years old
    </li>
  );
};

const Header = () => {
  return <h1 className='special'>My Amazing App Header</h1>;
};

const TimeArea = () => {
  return <p>The current time is {new Date().toLocaleString()}</p>;
};

const Footer = () => {
  return <small>Copyright footer text</small>;
};

setInterval(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
}, 1000);
