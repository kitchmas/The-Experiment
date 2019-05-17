import React from 'react';

import '../../../content/css/sound-board.css';

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        opened: false
    }
    _toggleCategorySelect = () => {
        this.setState((prev) => ({
            opened: prev.opened ? false : true
        }));
    }
    render() {
        const list = this.props.categorys.map((category) =>
            <li key={category.id}
                className={this.props.selectedCategory.id === category.id ? "category-list-item selected" : "category-list-item"}
                onClick={() => { this.props.onChange(category.id) }}>{category.name}</li>);
        return (
            <div className="category-selector">
            <h1>Movies</h1>
                <div onClick={this._toggleCategorySelect} className="selected-category">
                    {this.props.selectedCategory.name}
                    <i className={this.state.opened ? "arrow up" : "arrow down"}></i>
                </div>
                <ul onClick={this._toggleCategorySelect} className={this.state.opened ? "category-list opened" : "category-list closed"}>
                    {list}
                </ul>
            </div>
        );
    }
}

export default CategorySelector