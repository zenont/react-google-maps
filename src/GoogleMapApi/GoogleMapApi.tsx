import React, { Component, Props } from 'react'

export interface IGoogleMapApiOptions {
	url: string
	apiKey: string
}

declare global {
	interface Window {
		isGoogleMapApiInitializing: boolean
		hasGoogleMapApiInitialized: boolean
		onGoogleMapsApiLoaded: () => void
	}
}

export function initGoogleApi(d: HTMLDocument, options: IGoogleMapApiOptions) {
	window.isGoogleMapApiInitializing = true
	window.hasGoogleMapApiInitialized = false
	const s = 'script'
	const id = 'google-maps-api'
	const gjs = d.getElementsByTagName(s)[0]
	if (d.getElementById(id)) {
		window.isGoogleMapApiInitializing = false
		window.hasGoogleMapApiInitialized = true
		return
	}
	const js = d.createElement(s); js.id = id
	const { url, apiKey } = options
	js.src = `${url}?key=${apiKey}&callback=onGoogleMapsApiLoaded`
	if (gjs.parentNode != null) {
		gjs.parentNode.insertBefore(js, gjs)
		window.isGoogleMapApiInitializing = false
		window.hasGoogleMapApiInitialized = true
	}
}

export interface IGoogleMapApiProps extends Props<{}> {
	url?: string
	apiKey: string
}

export interface IGoogleMapApiState {
	initialized: boolean
	initializing: boolean
}

export class GoogleMapApi extends Component<IGoogleMapApiProps, IGoogleMapApiState> {
	constructor(props: IGoogleMapApiProps) {
		super(props)
		this.state = {
			initializing: window.isGoogleMapApiInitializing === true,
			initialized: window.hasGoogleMapApiInitialized === true
		}
	}

	public componentDidMount() {
		const { initialized, initializing } = this.state
		const { apiKey, url = 'https://maps.googleapis.com/maps/api/js' } = this.props
		if (initialized !== true && initializing !== true) {
			window.onGoogleMapsApiLoaded = () => this.handleOnGoogleMapsApiLoaded()
			initGoogleApi(document, { apiKey, url })
		}
	}

	public render() {
		return null
	}

	private handleOnGoogleMapsApiLoaded() {
		this.setState({ initializing: false, initialized: true })
	}
}

export default GoogleMapApi
