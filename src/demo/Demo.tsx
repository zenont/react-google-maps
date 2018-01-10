import React, { Component } from 'react'
import GoogleMapApi from '../GoogleMapApi'
import Map from '../Map'

export class Demo extends Component {
	public render() {
		console.log('process!@', process.env.GOOGLE_MAP_API_KEY)
		return (
			<div style={{ width: '450px', height: '750px' }}>
				demo!!
				{process.env.GOOGLE_MAP_API_KEY}
				<GoogleMapApi apiKey={process.env.GOOGLE_MAP_API_KEY!}>
					<Map onDragged={(map) => console.log('dragged!', map.getBounds())}/>
				</GoogleMapApi>
			</div>
		)
	}
}

export default Demo
