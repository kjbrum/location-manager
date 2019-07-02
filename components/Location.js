import Markdown from 'react-markdown'

class Location extends React.Component {
	render() {
		const { title, address, notes } = this.props

		return (
			<div className="location">
				<h1 className="location-title">{title}</h1>

				<div className="location-address">{address}</div>

				<div className="location-notes">
					{notes && <Markdown source={notes} />}
				</div>
			</div>
		)
	}
}

export default Location
