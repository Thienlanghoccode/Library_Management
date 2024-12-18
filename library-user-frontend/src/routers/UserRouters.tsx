import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../layouts/User/HomePage/HomePage';
import { ContactUs } from '../layouts/User/ContactUs/ContactUs';
import { ProductsPage } from '../layouts/User/ProductsPage/ProductsPage';
import { AboutUs } from '../layouts/User/AboutUs/AboutUs';
import { AuthorDetail } from '../layouts/User/AuthorDetail/AuthorDetail';
import { NewsDetail } from '../layouts/User/NewsDetail/NewsDetail';
import { NewsList } from '../layouts/User/NewsList/NewsList';
import { NewsGrid } from '../layouts/User/NewsGrid/NewsGrid';
import { ProductDetail } from '../layouts/User/ProductDetail/ProductDetail';
import { Authors } from '../layouts/User/Authors/Authors';
import { Login } from '../layouts/User/LogIn/Login';

export const UserRouters = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to={'/products'} />} />

            <Route path="/home" element={<HomePage />} />

            <Route path="/contactus" element={<ContactUs />} />

            <Route path="products/:categoryId" element={<ProductsPage />} />

            <Route path="products" element={<ProductsPage />} />

            <Route path="/aboutus" element={<AboutUs />} />

            <Route path="/authors/:authorId" element={<AuthorDetail />} />

            <Route path="/newsdetail" element={<NewsDetail />} />

            <Route path="/newsgrid" element={<NewsGrid />} />

            <Route path="/newslist" element={<NewsList />} />

            <Route path="/productdetails/:bookId" element={<ProductDetail />} />

            <Route path="/authors" element={<Authors />} />
            <Route path="/auth/login" element={<Login />} />
        </Routes>
    );
};
