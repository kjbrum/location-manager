import React from 'react'
import Head from 'next/head'

class Layout extends React.Component {
	render() {
		return (
			<main>
				<Head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>

					<title>Location Manager</title>
				</Head>

				{this.props.children}
			</main>
		)
	}
}

export default Layout
