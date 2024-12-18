import CategoryModel from '../../../../models/CategoryModel';

export const MenuCategories: React.FC<{
    categorySelected: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleCategorySelected: any;
    categories: CategoryModel[];
}> = (props) => {
    return (
        <div className="tg-widget tg-catagories">
            <div className="tg-widgettitle">
                <h3>Danh mục</h3>
            </div>
            <div className="tg-widgetcontent">
                <ul>
                    {props.categories.map((category) => (
                        <li key={category.id} onClick={() => props.handleCategorySelected(category.id)}>
                            <a
                                href="javascript:void(0);"
                                className={props.categorySelected === category.id ? 'active_item' : ''}
                            >
                                <span>{category.name}</span>
                                <em>{category.total_book}</em>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
