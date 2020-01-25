import React, { Component } from 'react'
import './directory.styles.scss'
import MenuItem from '../components/menu-item/menu-item.component'


export class Directory extends Component{
    constructor(){
        super()
        this.state = {
            sections : [
                {
                    title: 'hats',
                    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                    id: 1

                },{
                    title: 'jackets',
                    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2

                },
                {
                    title: 'sneakers',
                    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3
                },
                {
                    title: 'Women',
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    id: 4,
                    size: 'large'
                },
                {
                    title: 'Men',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    id: 5,
                    size: 'large'

                },    
            ]
        }
    }

    render(){
        return(
            <div className="directory-menu">
                {this.state.sections.map(({id, title, imageUrl, size}) => (
                    <MenuItem key = {id} title = {title} imageUrl = {imageUrl} size = {size}/>
                ))}
            </div>
        )
    }
}