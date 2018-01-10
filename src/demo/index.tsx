// import '../../styles/sass/all'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Demo } from './Demo'

const app = document.getElementById('app')

const hotRender = (HotReloadComponent: any) => {
	render(
		<AppContainer>
			<HotReloadComponent />
		</AppContainer>,
		app
	)
}

hotRender(Demo)

if (module.hot) {
	module.hot.accept('./Demo', () => hotRender(Demo))
}
