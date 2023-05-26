# Sample Test Instances

In this section, we provide sample instances following the json format described in the previous sections, along with the optimal solution, again in the appropriate json format. These can be used for testing purposes while developing a solver. We clarify that the solutions provided are optimal up to a very small factor (caused by rounding very small amounts).\
\
\- [Single order Instances](https://drive.google.com/file/d/1VIfuMVOG62bFHHbXAEOCtPG4ZTRiPi3O/view?usp=sharing)\
\- [Multiple-orders on single token pairs Instances](https://drive.google.com/file/d/13RaEsDaqt7IHnLcEefFLj\_yPIrlJHYX7/view?usp=sharing)\
\- [Multiple orders on multiple token pairs Instances](https://drive.google.com/file/d/10RuJ93gHwo5uBZ6xST4k7-UMTlXBbmj-/view?usp=sharing)\
\- [Example Instance with solution containing calldata](https://drive.google.com/file/d/1sOXd8t4dfckVxAMz2TAnsisUve3M6iiG/view?usp=sharing)\
\
\
In general, the instance json's of all recent auctions can be found in the following links:\
\- \[prod] https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/$AUCTION\_ID.json\
\- \[barn] https://solver-instances.s3.eu-central-1.amazonaws.com/staging-mainnet/$AUCTION\_ID.json\
\
In the above urls, one needs to replace the $AUCTION\_ID with an actual auction\_id. As a clarifcation, each auction taking place has a unique identifier that determines it. The easiest way to recover the id of an auction that resulted in a settlement taking place onchain is to start from the tx hash of the settlement, and use the competition endpoint to recover this id. Here is one such example.\
\
Here is a tx hash of a settlement that was executed onchain.\
\
0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240\
\
Starting from this hash, we can use the competition endpoint:\
\
[https://api.cow.fi/mainnet/api/v1/solver\_competition/by\_tx\_hash/0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240](https://api.cow.fi/mainnet/api/v1/solver\_competition/by\_tx\_hash/0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240)\
\
and then we can see that the auction id was 6462225. Note also that the competition endpoint reveals the calldata of all submitted solutions that successfully simulated and got ranked.\
\
Using this id, we can now recover the instance.json of that auction:\
[https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/6462225.json](https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/6462225.json)\
\
