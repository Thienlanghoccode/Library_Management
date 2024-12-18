export const RefineSearch: React.FC<{
    isLastPage: boolean;
    currentPage: number;
    pageSize: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSelectChange: any;
    totalElements: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSelectSortByChange: any;
    sortBy: string;
}> = (props) => {
    return (
        <div className="tg-refinesearch">
            <span>
                showing {(props.currentPage - 1) * props.pageSize + 1} to{' '}
                {!props.isLastPage ? (props.currentPage - 1) * props.pageSize + props.pageSize : props.totalElements} of{' '}
                {props.totalElements} total
            </span>
            <form className="tg-formtheme tg-formsortshoitems">
                <fieldset>
                    <div className="form-group">
                        <label>Lọc:</label>
                        <span className="tg-select">
                            <select
                                value={props.sortBy}
                                onChange={(e) => props.handleSelectSortByChange(e.target.value)}
                            >
                                <option value="id">id</option>
                                <option value="name">Tên Sách</option>
                                <option value="author">Tác Giả</option>
                            </select>
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Show:</label>
                        <span className="tg-select">
                            <select value={props.pageSize} onChange={(e) => props.handleSelectChange(e.target.value)}>
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="20">20</option>
                            </select>
                        </span>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};
