import { Menu } from '../menu';
import { ListUsers } from '../list-users'
import './app.css';
import { useObserver } from 'mobx-react-lite';

function App() {
  return useObserver(() => (
    <>
      <div className="app">
        {/* <DevTools/> */}
        <Menu/>
        <ListUsers/>
      </div>
    </>
  ));
}

export default App;
