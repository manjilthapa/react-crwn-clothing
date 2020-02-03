import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
//import {createStructuredSelector} from 'reselect'
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container'
import CollectionPageContainer from '../collection/collection.container'

//import WithSpinner from '../../components/with-spinner/with.spinner.component'

//import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'

//const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
//const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component{

   /* state = {
        loading : true
    }

    unsubscribeFromSnapshot = null
    */

    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props
        fetchCollectionsStartAsync()

        /*const {updateCollectons} = this.props
        const collectionRef = firestore.collection('collections')
        this.unsubscribeFromSnapshot =  collectionRef.onSnapshot(async snapShop => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShop)
            updateCollectons(collectionsMap)
            this.setState({loading: false})
        })*/

    }

    render(){ 
        const {match} = this.props
       // const {loading} = this.state
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}  /*render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> } */ component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} /* render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} /> } */ component={CollectionPageContainer} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
})


export default connect(null, mapDispatchToProps)(ShopPage)