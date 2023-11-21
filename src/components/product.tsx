import { useEffect, useState } from "react";
import "../style/products.css";
import { HandleProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import NavBar from './navbar';
import { useLocation } from 'react-router-dom';


const Products = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const search_query = searchParams.get('q');

    const [product, setproduct] = useState<any>([])
    const [searchquery, setsearchquery] = useState<any>(search_query ? search_query : "")
    const [currentPage, setCurrentPage] = useState<any>(page ? page : 1);
    const [totalPages, setTotalPages] = useState(8);
    const productsPerPage = 8; // Number of products to display per page
    const dt = {
        limit: productsPerPage,
        search: searchquery,
        skip: (currentPage - 1) * productsPerPage,
    }
    const myProduct = async () => {
        const products = await HandleProducts(dt);
        setproduct(products?.data?.products || []);
        const totalProducts = products?.data?.total || 0;
        setTotalPages(Math.ceil(totalProducts / productsPerPage));
    }
    useEffect(() => {
        myProduct();

    }, [searchquery, currentPage])

    const checkToken: any = localStorage.getItem("vite-react-ts-pwa_token");

    if (!checkToken && window.location.pathname == '/products') {
        navigate('/');
    }

    const goToPage = (page: number, searchQuery?: string) => {
        if (page >= 1 && page <= totalPages) {

            setCurrentPage(page);
            setsearchquery(searchQuery);

            if (page && searchQuery) {
                navigate(`/products?page=${page}&q=${searchQuery}`);
            } else if (page) {
                navigate(`/products?page=${page}`);
            } else if (searchQuery) {
                navigate(`/products?q=${searchQuery}`);
            }
            else {
                navigate(`/products`);
            }

        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {

            pages.push(
                <a key={i} onClick={() => goToPage(i, searchquery)} className={parseInt(page ? page : currentPage) === i ? 'active' : ''}>
                    {i}
                </a>
            );
        }
        return pages;
    };

    const handleSearch = (e: any) => {

        setsearchquery(e.target.value);
        goToPage(1, e.target.value)

    }

    return (
        <>
            <div className="body-container">
                <NavBar />
                {checkToken && product && (
                    <div className="contain-container">
                        <div className='inputsearcgcont'>
                            <input id="search" type="search" value={searchquery} placeholder="Search products..."
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>
                        <div className="Product-container">
                            {product && product.map((data: any, key: any) => {
                                return (
                                    <div className="card" key={key}>
                                        <img src={data?.thumbnail
                                        } className='productimage' alt="Denim Jeans" />
                                        <h2>{data?.brand
                                        }</h2>
                                        <p className="price">$ {data?.price}</p>
                                        <p>{data?.description?.substring(0, 30) + '...'}</p>
                                        <p><button>Add to Cart</button></p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pagination">
                            {renderPagination()}
                        </div>
                    </div>)}
            </div>
        </>
    );
}
export default Products;
