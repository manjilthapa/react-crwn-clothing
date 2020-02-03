import ShopActionTypes from './shop.types'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

export const UpdateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTION,
    payload: collectionsMap
})

export const fectchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START,
})
export const fectchCollectionsSuccess = (collectionsMap) => (
    {
        type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
        payload : collectionsMap
    }
)

export const fectchCollectionsFailure = (errorMessage) => (
    {
        type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
        payload : errorMessage
    }
)

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')
        dispatch(fectchCollectionsStart())
        collectionRef.get().then(snapShop => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShop)
            dispatch(fectchCollectionsSuccess(collectionsMap))
        
        }).catch(error => dispatch(fectchCollectionsFailure(error.message)))

    }
}