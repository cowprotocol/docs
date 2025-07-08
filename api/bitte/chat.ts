const { BITTE_API_KEY, BITTE_API_URL = 'https://ai-runtime-446257178793.europe-west1.run.app' } = process.env

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: Request): Promise<Response> {
  return fetch(`${BITTE_API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('content-type') ?? 'application/json',
      Authorization: `Bearer ${BITTE_API_KEY}`,
    },
    body: req.body,
    duplex: 'half',
  } as RequestInit & { duplex: 'half' })
}
