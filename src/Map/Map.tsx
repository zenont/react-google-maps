import React, { Component, Props } from 'react'

export interface IMapProps extends Props<HTMLDivElement> {
	zoom?: number
	center?: google.maps.LatLng | google.maps.LatLngLiteral
	onDragged?: (map: google.maps.Map) => void
}

export class Map extends Component<IMapProps> {
	public static defaultProps: IMapProps = {
		zoom: 13,
		center: {
			lat: 37.774929,
			lng: -122.419416
		}
	}
	private _root: HTMLDivElement | null = null

	public componentDidMount() {
		const { center, zoom, onDragged } = this.props
		if (this._root != null) {
			const options: google.maps.MapOptions = { center, zoom }
			const map = new google.maps.Map(this._root, options)
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
}

export default Map
