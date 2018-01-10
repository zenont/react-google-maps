import React, { Component, Props } from 'react'

export class Map extends Component<Props<{}>> {
	private _root: HTMLDivElement | null = null
	constructor(props: Props<{}>) {
		super(props)
		// new google.maps.Map()
	}

	public componentDidMount() {
		if (this.refs != null) {
			const map = new google.maps.Map(this._root)
		}
	}

	public render() {
		const { children } = this.props
		return (
			<div ref={(ref) => this.bindRef(ref)}>
				{children}
			</div>
		)
	}

	private bindRef(ref: HTMLDivElement | null) {
		this._root = ref
	}
}

export default Map
