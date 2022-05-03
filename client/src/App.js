import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = useContext(Context);


  //ligne 12 jai enlevé le setLoading ___voila comment cetait const [setLoading] = useState(true); ___,
  // et ici ligne 20 apres finally jai enlevé ce setloding ___voila comment cetait }).finally(() => setLoading(false))___
  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally()
  }, [user])//ici entre crochet vide normalement





  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
