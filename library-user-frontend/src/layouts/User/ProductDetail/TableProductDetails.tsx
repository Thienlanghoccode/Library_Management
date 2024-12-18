import BookModel from '../../../models/BookModel';

export const TableProductDetails: React.FC<{ book?: BookModel }> = (props) => {
    return (
        <>
            <div className="tg-sectionhead">
                <h2>Thông Tin Chi Tiết</h2>
            </div>
            <ul className="tg-productinfo">
                <li>
                    <span>Số trang:</span>
                    <span>{props.book?.page_number} trang</span>
                </li>
                <li>
                    <span>Kích Thước:</span>
                    <span>
                        {props.book?.size} mm 
                    </span>
                </li>
                <li>
                    <span>Khối lượng:</span>
                    <span>{props.book?.weight} g</span>
                </li>
                <li>
                    <span>Năm Xuất Bản:</span>
                    <span>{props.book?.publishing_year}</span>
                </li>
                <li>
                    <span>Nhà Xuất Bản:</span>
                    <span>{props.book?.publisher?.name}</span>
                </li>
                <li>
                    <span>Ngôn Ngữ:</span>
                    <span>{props.book?.language}</span>
                </li>
            </ul>
            <div className="tg-alsoavailable">
                <figure>
                    <img src="/images/img-02.jpg" alt="image description" />
                    <figcaption>
                        <h3>Lợi ích khi mượn sách:</h3>
                        <ul>
                            <li>
                                <span>Nâng cao kiến thức</span>
                            </li>
                            <li>
                                <span>Giá mượn phải chăng</span>
                            </li>
                            <li>
                                <span>Hoàn trả tiền khi trả sách đúng hạn</span>
                            </li>
                        </ul>
                    </figcaption>
                </figure>
            </div>
        </>
    );
};
