const { BITTE_API_KEY, BITTE_API_URL = 'https://ai-runtime-446257178793.europe-west1.run.app' } = process.env

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id } = req.query
    const url = `${BITTE_API_URL}/history?id=${id}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BITTE_API_KEY}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({ msg: errorText })
    }

    const result = await response.json()
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error in history API:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
