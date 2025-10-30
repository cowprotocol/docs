import { extractDigest } from '../utils/ipfs'

/**
 * @deprecated AppData is not longer stored on IPFS nor it's derived from IPFS content hashes
 *
 * @param cid
 * @returns
 */
export async function cidToAppDataHex(cid: string): Promise<string> {
  return extractDigest(cid)
}
