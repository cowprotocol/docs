import { latest } from './generatedTypes'

export type AppDataParams = Partial<Omit<latest.AppDataRootSchema, 'version'>>

export type IpfsHashInfo = {
  /**
   * IPFS's content identifier
   * See https://docs.ipfs.io/concepts/content-addressing/#identifier-formats
   */
  cid: string

  /**
   * Full appData content. It will be a the exact string that if hashed using keccak-256 you would get the returned appDataHex
   */
  appDataContent: string

  /**
   * appData hex for CoW Orders. Its value is the multihash part of the IPFS CID, therefore it points to a IPFS document.
   * Because its just the multihash, it doesn't have any infomation regarding the encoding and hashing algorithm. These parts are implicit.
   *
   * Currently, the implicit encoding is base16 and the implicit hashing algorithm is keccak256.
   * See https://github.com/cowprotocol/app-data/blob/app-data-v1/src/api/appDataToCid.ts#L102
   *
   * Previous versions used a different encoding and hashing algorithm (base58btc, dag-pb, sha2-256)
   *
   */
  appDataHex: string
}

export interface Ipfs {
  uri?: string
  writeUri?: string
  readUri?: string
  pinataApiKey?: string
  pinataApiSecret?: string
}

export type ValidationResult = {
  success: boolean
  errors?: string
}
