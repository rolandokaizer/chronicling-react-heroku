import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchHeadline} from "../actions/index";
import Headline from '../components/headline';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

class HeadlineList extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.renderHeadline = this.renderHeadline.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    renderHeadline(item, index) {
        const BASE_URL = 'http://chroniclingamerica.loc.gov';
        const currentPage = this.props.headline.page;

        let startRow = ((currentPage % 5) * 10) - 10;
        if(currentPage%5 === 0){
            startRow = 40;
        }

        let endRow = startRow + 10;

        if (index >= startRow && index < endRow) {
            const title = item.title;
            const url = BASE_URL + item.id;
            const style = {
                padding: '5px 0'
            };

            return (
                <div style={style} key={index}><Headline title={title} url={url}/></div>
            );
        }
    }

    onChange(page) {
        this.props.fetchHeadline(this.props.headline.terms, page);
    }

    handlePrevClick(){
        this.props.fetchHeadline(this.props.headline.terms, (this.props.headline.page - 1));
    }

    handleNextClick(){
        this.props.fetchHeadline(this.props.headline.terms, (this.props.headline.page + 1));
    }

    render() {
        if (this.props.headline.headline.items !== undefined) {
            let isPrevDisabled = false;
            let isNextDisabled = false;

            if(this.props.headline.page === 1){
                isPrevDisabled = true;

                if(this.props.headline.headline.totalItems <= 10){
                    isNextDisabled = true;
                }
            }else{
                if(Math.ceil(this.props.headline.headline.totalItems / 10) === this.props.headline.page){
                    isNextDisabled = true;
                }
            }

            return (
                <div>
                    <div style={{marginBottom: 10}}>
                        {this.props.headline.headline.items.map(this.renderHeadline)}
                    </div>
                    <Pagination
                        style={{marginTop: 30, textAlign: 'center'}}
                        onChange={this.onChange}
                        pageSize={10}
                        defaultCurrent={1}
                        current={this.props.headline.page}
                        total={this.props.headline.headline.totalItems}/>
                    <div style={{marginTop: 10, textAlign: 'center'}}>
                        <Button
                            type="primary"
                            disabled={isPrevDisabled}
                            onClick={this.handlePrevClick}>
                            <Icon type="left" /> Newer
                        </Button>
                        <div style={{display: 'inline-block', width: 150}}>&nbsp;</div>
                        <Button
                            type="primary"
                            disabled={isNextDisabled}
                            onClick={this.handleNextClick}>
                            Older <Icon type="right" />
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

function mapStateToProps({headline}) {
    return {headline}
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHeadline: (terms, page) => dispatch(fetchHeadline(terms, page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineList);