import { AnyAppDataDocVersion } from '../generatedTypes'
import { DEFAULT_IPFS_READ_URI } from '../consts'

/**
 * @deprecated AppData is not longer stored on IPFS nor it's derived from IPFS content hashes
 *
 * @param cid
 * @param ipfsUri
 * @returns
 */
export async function fetchDocFromCid(cid: string, ipfsUri = DEFAULT_IPFS_READ_URI): Promise<AnyAppDataDocVersion> {
  const { default: fetch } = await import('cross-fetch')
  const response = await fetch(`${ipfsUri}/${cid}`)

  return await response.json()
}
