

const validate = (obj) => {

    return true
}

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(500).json(
            { appStatus: 'error', detail: 'Unhandled HTTP method' }
        )
        throw new Error('Unhandled HTTP method')
    }

}

export default handler