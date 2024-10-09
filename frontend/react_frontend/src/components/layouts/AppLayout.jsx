import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';


export default function AppLayout() {
    return (
        <>
            <div>
                <title>Banking product page</title>
                <meta property="og:title" content="Brytatutors official website" key="title" />
            </div>
            <div className="flex flex-row overflow-hidden bg-neutral-100">
                <Sidebar />
                <Header />
                <div className="flex flex-col flex-1">
                    <Outlet />
                </div>
            </div>

        </>
    );
}