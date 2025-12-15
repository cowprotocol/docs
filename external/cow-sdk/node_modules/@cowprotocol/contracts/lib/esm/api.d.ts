import { BigNumber, BigNumberish } from "ethers";
import { Order, OrderKind, Timestamp, HashLike, OrderBalance } from "./order";
import { Signature } from "./sign";
export declare enum Environment {
    Dev = 0,
    Prod = 1
}
export declare const LIMIT_CONCURRENT_REQUESTS = 5;
export declare function apiUrl(environment: Environment, network: string): string;
export interface ApiCall {
    baseUrl: string;
}
export interface EstimateTradeAmountQuery {
    sellToken: string;
    buyToken: string;
    kind: OrderKind;
    amount: BigNumberish;
}
export interface PlaceOrderQuery {
    order: Order;
    signature: Signature;
    from?: string;
}
export interface GetExecutedSellAmountQuery {
    uid: string;
}
export type SellAmountBeforeFee = {
    kind: OrderKind.SELL;
    sellAmountBeforeFee: BigNumberish;
};
export type SellAmountAfterFee = {
    kind: OrderKind.SELL;
    sellAmountAfterFee: BigNumberish;
};
export type BuyAmountAfterFee = {
    kind: OrderKind.BUY;
    buyAmountAfterFee: BigNumberish;
};
export type QuoteQuery = CommonQuoteQuery & (SellAmountBeforeFee | SellAmountAfterFee | BuyAmountAfterFee);
export interface CommonQuoteQuery {
    sellToken: string;
    buyToken: string;
    receiver?: string;
    validTo?: Timestamp;
    appData?: HashLike;
    partiallyFillable?: boolean;
    sellTokenBalance?: OrderBalance;
    buyTokenBalance?: OrderBalance;
    from: string;
    priceQuality?: QuotePriceQuality;
}
export declare enum QuotePriceQuality {
    FAST = "fast",
    OPTIMAL = "optimal"
}
export interface OrderDetailResponse {
    executedSellAmount: string;
}
export interface GetQuoteResponse {
    quote: Order;
    from: string;
    expiration: Timestamp;
    id?: number;
}
export interface ApiError {
    errorType: string;
    description: string;
}
export interface CallError extends Error {
    apiError?: ApiError;
}
export declare enum GetQuoteErrorType {
    SellAmountDoesNotCoverFee = "SellAmountDoesNotCoverFee",
    NoLiquidity = "NoLiquidity"
}
export declare class Api {
    network: string;
    baseUrl: string;
    constructor(network: string, baseUrlOrEnv: string | Environment);
    private apiCallParams;
    estimateTradeAmount(query: EstimateTradeAmountQuery): Promise<BigNumber>;
    placeOrder(query: PlaceOrderQuery): Promise<string>;
    getExecutedSellAmount(query: GetExecutedSellAmountQuery): Promise<BigNumber>;
    getQuote(query: QuoteQuery): Promise<GetQuoteResponse>;
}
