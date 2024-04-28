import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRouterElements from './useRouterElements';

function App() {
    const routeElements = useRouterElements();
    return (
        <div>
            {routeElements}
            <ToastContainer position="top-right" autoClose={1500} />
        </div>
    );
}

export default App;
