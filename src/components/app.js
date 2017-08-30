import React, {Component} from 'react';

import SearchBar from '../containers/search_bar';
import HeadlineList from '../containers/headline_list';

export default class App extends Component {
    render() {
        return (
            <div style={{width: 500, margin: 'auto'}}>
                <h1 style={{margin: '50px 0 0 0', textAlign: 'center'}}>Library of Congress Headlines App</h1>
                <SearchBar/>
                <HeadlineList/>
            </div>
        );
    }
}
