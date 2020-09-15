const useState = React.useState;
const useEffect = React.useEffect;

const App = () => {
  const [pets, setPets] = useState([]);

  // only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem('petData')) {
      setPets(JSON.parse(localStorage.getItem('petData')));
    }
  }, []);

  // run every time our pet state changes
  useEffect(() => {
    localStorage.setItem('petData', JSON.stringify(pets));
  }, [pets]);

  return (
    <div>
      <Header />
      <LikeArea />
      <TimeArea />
      <AddPetForm setPets={setPets} />
      <ul>
        {pets.map((pet) => (
          <Pet
            setPets={setPets}
            id={pet.id}
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

const AddPetForm = ({ setPets }) => {
  const [name, setName] = useState();
  const [species, setSpecies] = useState();
  const [age, setAge] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPets((previousState) => [
      ...previousState,
      { name: name, species: species, age: age, id: Date.now() },
    ]);
    setName('');
    setSpecies('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='form-control'>
        <legend>Add New Pet</legend>
        <input
          onChange={(e) => setName(e.target.value)}
          type='text'
          name='name'
          placeholder='Name'
          value={name}
        />
        <input
          onChange={(e) => setSpecies(e.target.value)}
          type='text'
          name='species'
          placeholder='species'
          value={species}
        />
        <input
          onChange={(e) => setAge(e.target.value)}
          type='number'
          name='age'
          placeholder='age in years'
          value={age}
        />
        <button>Add Pet</button>
      </fieldset>
    </form>
  );
};

const LikeArea = () => {
  const [likeCount, setLikeCount] = useState(0);

  const increaseLikeHandler = () => {
    setLikeCount((prev) => prev + 1);
  };

  const decreaseLikeHandler = () => {
    setLikeCount((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return 0;
    });
  };
  return (
    <React.Fragment>
      <button onClick={increaseLikeHandler}>Increase likes</button>
      <button onClick={decreaseLikeHandler}>Decrease likes</button>
      <h2>This page has been liked {likeCount} times</h2>
    </React.Fragment>
  );
};

const Pet = ({ id, name, species, age, setPets }) => {
  const handleDelete = () => {
    setPets((previousState) => previousState.filter((pet) => pet.id !== id));
  };
  return (
    <li>
      {name} is a {species} and is {age} years old
      <button className='btn-delete' onClick={handleDelete}>
        delete
      </button>
    </li>
  );
};

const Header = () => {
  return <h1 className='special'>App Header</h1>;
};

const TimeArea = () => {
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(new Date().toLocaleString()),
      1000
    );

    // clean up function for side effects of rendering this component
    return () => clearInterval(interval);
  }, []);

  return <p>The current time is {time}</p>;
};

const Footer = () => {
  return <small>Copyright footer text</small>;
};

ReactDOM.render(<App />, document.getElementById('app'));
