import fetch from 'isomorphic-unfetch'

// Styles
import '../css/style.css'

// Components
import Layout from '../components/Layout'
import LocationBlock from '../components/LocationBlock'

class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            airtableLocations: [],
        }
    }

    componentDidMount() {
        const { props } = this

        const transferLocations = new Promise(resolve => {
            const collectPosts = []

            Object.keys(props).map(item => {
                // Filter out other props like 'url', etc.
                if (typeof props[item].id !== 'undefined') {
                    collectPosts.push(props[item])
                }
            })

            resolve(collectPosts)
        })

        Promise.resolve(transferLocations).then(data => {
            this.setState({ airtableLocations: data })
        })
    }

    render() {
        const { airtableLocations } = this.state

        // Loading Airtable data
        if (!Array.isArray(airtableLocations) || !airtableLocations.length) {
            return (
                <Layout>
                    <p>Loading&hellip;</p>
                </Layout>
            )
        } else {
            return (
                <Layout>
                    update here
                    {airtableLocations.map(location => (
                        <LocationBlock
                            key={location.id}
                            id={location.id}
                            title={location.title}
                            address={location.address}
                            notes={location.notes}
                        />
                    ))}
                </Layout>
            )
        }
    }
}

Home.getInitialProps = async context => {
    const basePath =
        process.env.NODE_ENV === 'development'
            ? `http://localhost:${process.env.PORT || 3000}`
            : process.env.SITE_URL

    const res = await fetch(`${basePath}/api/locations`)
    const airtableLocations = await res.json()

    return airtableLocations ? airtableLocations.data : {}
}

export default Home
