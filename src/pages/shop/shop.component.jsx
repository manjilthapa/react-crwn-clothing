import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'

import WithSpinner from '../../components/with-spinner/with.spinner.component'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { UpdateCollections } from '../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component{

    state = {
        loading : true
    }

    unsubscribeFromSnapshot = null

    componentDidMount(){
        const {updateCollectons} = this.props
        const collectionRef = firestore.collection('collections')
        this.unsubscribeFromSnapshot =  collectionRef.onSnapshot(async snapShop => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShop)
            updateCollectons(collectionsMap)
            this.setState({loading: false})
        })

    }

    render(){ 
        const {match} = this.props
        const {loading} = this.state
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}  render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> } /*component={CollectionOverview}*/ />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } /*component={CollectionPage}*/ />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollectons : collectionsMap => dispatch(UpdateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage)