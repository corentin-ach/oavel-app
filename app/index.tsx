import { Provider } from 'react-redux';
import Home from './home';
import { store } from '../redux/store';

export default function Root() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
