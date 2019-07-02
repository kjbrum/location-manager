import Link from 'next/link'

class Location extends React.Component {
	render() {
		const { id, title } = this.props

		return (
			<div className="location-block">
				<Link href={`/location/${id}`}>
					<a title={title}>{title}</a>
				</Link>
			</div>
		)
	}
}

export default Location
