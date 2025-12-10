import Footer from "./Footer";
import Navbar from "./Navbar";

const NotFound = () => {
    return (<>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl mt-2">Page Not Found</p>
        </div>
        <Footer />
    </>);
}

export default NotFound;