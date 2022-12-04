
async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.status(403).json({ appStatus: 'error', detail: 'Invalid HTTP Request' })
        throw new Error('403: Invalid HTTP Request')
    }

    res.status(200).json({ appStatus: 'success', detail: 'Yout password has been changed.'})

}

export default handler
