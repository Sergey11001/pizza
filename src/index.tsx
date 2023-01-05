
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from './redux/store'
import {Provider} from "react-redux";
const findRoot=document.getElementById('root')
if(findRoot){
    const root = ReactDOM.createRoot(findRoot);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
}

