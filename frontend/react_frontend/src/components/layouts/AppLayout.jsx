import Sidebar from './Sidebar';

export default function AppLayout({children}) {
    return (
        <>
            <div>
                <title>Banking product page</title>
            </div>
            <div className="bg-neutral-100 overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    {children}
                </div>
            </div>
            
        </>
    );
}