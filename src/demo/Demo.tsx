import React, { Component, Props } from 'react'
import GoogleMapApi from '../GoogleMapApi'
import Map from '../Map'
import payload from './layers'

export interface IDemoState {
	layers?: any
}

export class Demo extends Component<Props<{}>, IDemoState> {
	constructor(props: Props<{}>) {
		super(props)
		this.state = {
			layers: undefined
		}
	}

	public render() {
		const { layers } = this.state
		return (
			<div style={{ width: '450px', height: '650px' }}>
				demo!!
				{process.env.GOOGLE_MAP_API_KEY}
				<GoogleMapApi apiKey={process.env.GOOGLE_MAP_API_KEY!}>
					<Map layers={layers} onDragged={(map) => console.log('dragged!', map.getBounds())} />
					<button onClick={() => this.handleOnAddLayers()}>add layer!</button>
					<button onClick={() => this.handleOnDeleteLayers()}>remove layer!</button>
				</GoogleMapApi>
			</div>
		)
	}

	private handleOnAddLayers() {
		this.setState({ layers: payload.features })
	}

	private handleOnDeleteLayers() {
		this.setState({ layers: undefined })
	}
}

export default Demo
