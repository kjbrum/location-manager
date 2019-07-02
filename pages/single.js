import fetch from 'isomorphic-unfetch'

// Components
import Layout from '../components/Layout'
import Location from '../components/Location'

class Single extends React.Component {
    render() {
        const { title, address, notes } = this.props

        return (
            <Layout>
                <Location title={title} address={address} notes={notes} />
            </Layout>
        )
    }
}

Single.getInitialProps = async context => {
    const basePath =
        process.env.NODE_ENV === 'development'
            ? `http://localhost:${process.env.PORT || 3000}`
            : process.env.SITE_URL
    const { id } = context.query

    const res = await fetch(`${basePath}/api/location?id=${id}`)
    const airtableLocation = await res.json()

    return airtableLocation ? airtableLocation.data : {}
}

export default Single
