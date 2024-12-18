import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchInput: React.FC<{ handleSearchKey: any }> = (props) => {
    const [valueSearch, setValueSearch] = useState('');

    return (
        <div className="tg-widget tg-widgetsearch">
            <form className="tg-formtheme tg-formsearch">
                <div className="form-group">
                    <button
                        type="button"
                        onClick={() => {
                            props.handleSearchKey(valueSearch);
                            setValueSearch('');
                        }}
                    >
                        <i className="icon-magnifier" />
                    </button>
                    <input
                        type="search"
                        name="search"
                        className="form-group"
                        value={valueSearch}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => setValueSearch(e.target.value)}
                        placeholder="Tác Giả, Từ Khóa,..."
                    />
                </div>
            </form>
        </div>
    );
};
