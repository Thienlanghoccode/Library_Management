import { useEffect, useState } from 'react';
import { Footer } from '../Components/Footer/Footer';
import { Header } from '../Components/Header/Header';
import { TableProductDetails } from './TableProductDetails';

import BookModel from '../../../models/BookModel';
import { SpinnerLoading } from '../../Utils/SprinnerLoading';
import { StarsReview } from '../../Utils/StarsReview';
import BorrowBookButton from './CheckoutBook';

export const ProductDetail = () => {
    const [httpError, setHttpError] = useState(null);

    const bookId = window.location.pathname.split('/')[2];

    const [isLoadingBook, setIsLoadingBook] = useState(true);
    const [book, setBook] = useState<BookModel>();

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8000/books/${bookId}`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();

            const responseData = responseJson.result;

            const loadedBook: BookModel = {
                id: responseData.id,
                name: responseData.name,
                inventory_number: responseData.inventoryNumber,
                ratings_star: responseData.ratingsStar ?? 0,
                price: responseData.price,
                description: responseData.description,
                language: responseData.language,
                size: responseData.size,
                weight: responseData.weight,
                page_number: responseData.pageNumber,
                publishing_year: responseData.publishingYear,

                publisher: {
                    id: responseData.publisher.id,
                    name: responseData.publisher.name,
                },

                author: {
                    name: responseData.author.name,
                    id: responseData.author.id,
                    date_of_birth: responseData.author.dateOfBirth,
                    description: responseData.author.description,
                },

                category: {
                    name: responseData.category.name,
                    id: responseData.category.id,
                },
            };
            setBook(loadedBook);
            setIsLoadingBook(false);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchBook().catch((error: any) => {
            setIsLoadingBook(false);
            setHttpError(error.message);
        });
    }, [bookId]);

    if (isLoadingBook) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
            <Header />
            <main id="tg-main" className="tg-main tg-haslayout">
                {/*************************************
					News Grid Start
			**************************************/}
                <div className="tg-sectionspace tg-haslayout">
                    <div className="container">
                        <div className="row">
                            <div id="tg-twocolumns" className="tg-twocolumns">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-right">
                                    <div id="tg-content" className="tg-content">
                                        <div className="tg-productdetail">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                                    <div className="tg-postbook">
                                                        <figure className="tg-featureimg">
                                                            <img
                                                                src="/images/books/img-07.jpg"
                                                                alt="image description"
                                                            />
                                                        </figure>
                                                        <div className="tg-postbookcontent">
                                                            <span className="tg-bookprice">
                                                                <ins>Giá Mượn: {book?.price}</ins>
                                                            </span>
                                                            <span>
                                                                Số lượng còn:{' '}
                                                                <span
                                                                    className="text-success "
                                                                    style={{ fontSize: 20, fontWeight: 600 }}
                                                                >
                                                                    {book?.inventory_number}
                                                                </span>
                                                                <span> cuốn</span>
                                                            </span>
                                                            {/* <a
                                                                className="tg-btn tg-active tg-btn-lg"
                                                            >
                                                                Mượn Sách
                                                            </a> */}
                                                            
                                                            {bookId !== undefined && book?.name && <BorrowBookButton bookId={book.id} bookName={book.name} />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                                    <div className="tg-productcontent">
                                                        <ul className="tg-bookscategories">
                                                            <li>
                                                                <a href="javascript:void(0);">{book?.category?.name}</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tg-themetagbox">
                                                            <span className="tg-themetag">sale</span>
                                                        </div>
                                                        <div className="tg-booktitle">
                                                            <h3>{book?.name}</h3>
                                                        </div>
                                                        <span className="tg-bookwriter">
                                                            By: <a href="javascript:void(0);">{book?.author?.name}</a>
                                                        </span>
                                                        <StarsReview
                                                            rating={book?.ratings_star ?? 0}
                                                            size={18}
                                                            key={book?.id}
                                                        />
                                                        <div className="tg-description">
                                                            <p>{book?.description}</p>
                                                        </div>
                                                        <TableProductDetails book={book} />
                                                    </div>
                                                </div>
                                                {/* <ProductDescription /> */}
                                                <div className="tg-aboutauthor">
                                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                        <div className="tg-sectionhead">
                                                            <h2>Về Tác Giả</h2>
                                                        </div>
                                                        <div className="tg-authorbox">
                                                            <figure className="tg-authorimg">
                                                                <img
                                                                    src="/images/author/imag-24.jpg"
                                                                    alt="image description"
                                                                />
                                                            </figure>
                                                            <div className="tg-authorinfo">
                                                                <div className="tg-authorhead">
                                                                    <div className="tg-leftarea">
                                                                        <div className="tg-authorname">
                                                                            <h2>{book?.author?.name}</h2>
                                                                            <span>
                                                                                Author Since:{' '}
                                                                                {book?.author?.date_of_birth}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tg-rightarea">
                                                                        <ul className="tg-socialicons">
                                                                            <li className="tg-facebook">
                                                                                <a href="javascript:void(0);">
                                                                                    <i className="fa fa-facebook" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="tg-twitter">
                                                                                <a href="javascript:void(0);">
                                                                                    <i className="fa fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="tg-linkedin">
                                                                                <a href="javascript:void(0);">
                                                                                    <i className="fa fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="tg-googleplus">
                                                                                <a href="javascript:void(0);">
                                                                                    <i className="fa fa-google-plus" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="tg-rss">
                                                                                <a href="javascript:void(0);">
                                                                                    <i className="fa fa-rss" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="tg-description">
                                                                    <p>{book?.author?.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*************************************
					News Grid End
			**************************************/}
            </main>
            <Footer />
        </div>
    );
};
