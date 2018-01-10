import React, { Component, Props } from 'react'
import { IGoogleMapApiProps } from '../GoogleMapApi/GoogleMapApi';

export interface IMapProps extends Props<HTMLDivElement> {
	zoom?: number
	layers?: any
	center?: google.maps.LatLng | google.maps.LatLngLiteral
	onDragged?: (map: google.maps.Map) => void
}

export interface IMapState {
	map: google.maps.Map
}

export class Map extends Component<IMapProps, IMapState> {
	public static defaultProps: IMapProps = {
		zoom: 13,
		center: {
			lat: 37.774929,
			lng: -122.419416
		}
	}
	private _root: HTMLDivElement | null = null

	public componentWillReceiveProps(nextProps: IMapProps) {
		if (this.props.layers !== nextProps.layers) {
			this.handleOnLayerChanged(nextProps.layers)
		}
	}

	public componentDidMount() {
		const { center, zoom, onDragged } = this.props
		if (this._root != null) {
			const options: google.maps.MapOptions = { center, zoom }
			const map = new google.maps.Map(this._root, options)
			this.setState({ map })
			map.addListener('dragend', (event) => {
				if (onDragged != null) {
					onDragged(map)
				}
			})
		}
	}

	public render() {
		const { children } = this.props
		return (
			<div ref={(ref) => this.bindRef(ref)} style={{ width: '100%', height: '100%' }}>
				Map!
				{children}
			</div>
		)
	}

	private bindRef(ref: HTMLDivElement | null) {
		this._root = ref
	}

	private handleOnLayerChanged(layers: any) {
		const { map } = this.state
		if (layers != null) {
			map.data.addGeoJson(layers)
		} else {
			map.data.unbindAll()
		}
	}
}

export default Map
