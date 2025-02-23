import { useEffect, useState } from 'react';
import AuthorModel from '../../../../models/AuthorModel';
import { SpinnerLoading } from '../../../Utils/SprinnerLoading';

export const TopSellingAuthors = () => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            const baseUrl: string = `http://localhost:8000/authors`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;

            const loadedAuthors: AuthorModel[] = [];
            for (const key in responseData) {
                loadedAuthors.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    total_book: responseData[key].totalBook,
                });
            }
            setAuthors(loadedAuthors.slice(0, 3));

            setIsLoadingAuthors(false);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchAuthors().catch((error: any) => {
            setIsLoadingAuthors(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoadingAuthors) {
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
        <div className="tg-footercol tg-widget tg-widgettopsellingauthors">
            <div className="tg-widgettitle">
                <h3>Top Selling Authors</h3>
            </div>
            <div className="tg-widgetcontent">
                <div>
                    {authors.map((author) => (
                        <div key={author.id} className="tg-authoritem">
                            {' '}
                            {/* Sử dụng div thay vì li */}
                            <figure>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <img src="/images/author/imag-09.jpg" alt="image description" />
                                </a>
                            </figure>
                            <div className="tg-authornamebooks">
                                <h4>
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        {author.name}
                                    </a>
                                </h4>
                                <p>{author.total_book} Published Books</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
