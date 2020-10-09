import React from 'react';
import {Route} from 'react-router'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {createStructuredSelector} from 'reselect';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import {connect} from 'react-redux';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    unsubscribeFromSnapshot = null;
    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }
    render(){
        const {match} = this.props;
        const {isCollectionFetching} = this.props;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={props=>(
                    <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>
                )}/>
                <Route path={`${match.path}/:collectionId`} render={props=>(
                    <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props}/>
                )}/>
            </div>
        );
    }
}
    
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync : ()=> dispatch(fetchCollectionsStartAsync())
});

export const mapStateToProps = createStructuredSelector({
    isCollectionFetching : selectIsCollectionFetching
});

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);