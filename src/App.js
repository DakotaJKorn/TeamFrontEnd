import './App.css';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {

  function handleSearchClick(){
    console.log("Search Clicked");
}


  return (
    <div>
      <Header Click={handleSearchClick}/>
      <Body />
      <Footer />
    </div>
  );
}

export default App;
