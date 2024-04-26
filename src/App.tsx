import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRouterElements from './useRouterElements';

function App() {
    const routeElements = useRouterElements();
    return (
        <div>
            {routeElements}
            <ToastContainer position="top-right" />
        </div>
    );
}

export default App;
