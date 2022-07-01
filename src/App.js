import './App.css';
import Navbar from './Navbar';
import Container from './Container';

function App() {
  return (
    <div className="App bg-dark vh-100">
      <Navbar />
      <Container />
      <footer className='text-secondary fs-6 text-center d-flex justify-content-around align-items-center bg-dark'>
        <p className=''>Utviklet av <a href="https://github.com/bekkos">Martin Isaksen Bekkos</a></p>
        <p>Ikoner fra <a href="https://www.flaticon.com/free-icons/bus" title="bus icons">Flaticon</a></p>
      </footer>
    </div>
  );
}

export default App;
