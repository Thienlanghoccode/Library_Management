import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserRouters } from './routers/UserRouters';
import "./utils/setupFetch.js"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<UserRouters />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
