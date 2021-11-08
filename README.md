# MyAnimeList API
[![npm version](https://badge.fury.io/js/myanimelist-api.svg)](https://www.npmjs.com/package/myanimelist-api) [![dependencies Status](https://img.shields.io/node/v/myanimelist-api)]() [![github issues](https://img.shields.io/github/issues-raw/aaditya/myanimelist-api)]()

This is a wrapper for the official MyAnimeList REST API V2. All the endpoints as defined in the documentation are supported including OAuth 2.0 authorization.

## Installation

```
npm install myanimelist-api
```

## Getting started

Generate API credentials by following [these instructions](https://myanimelist.net/blog.php?eid=835707).

Make sure to check the resource access is as per your requirements to prevent misuse of the API Keys.

## Setup

#### Initializing the client
```js
const MyAnimeList = require('myanimelist-api');

const mal = new MyAnimeList({
    'clientId': '<Your MAL Client ID>',
    'clientSecret': '<Your MAL Client Secret>',
});
```

### Options

| Option | Type | Required | Description |
--- | --- | --- | ---
| `clientId` | `String`  | yes | Your API Client ID |
| `clientSecret` | `String` | yes | Your API Client Secret |
| `accessToken` | `String` | yes | Your API Access Token |
| `refreshToken` | `String` | yes | Your API Refresh Token |
| `timeout` | `Number`  | no | Request Timeout |
| `axiosConfig` | `Object` | no | [Reference](https://github.com/axios/axios#request-config)

Requests are made with [Axios library](https://github.com/axios/axios) with [support to promises](https://github.com/axios/axios#promises).
Error Handling is same as how [Axios handles it](https://github.com/axios/axios#handling-errors).

#### Gerenate the Access Token and Refresh Token from Client

Since MAL V2 API uses oAuth 2 for authorization, you need to access MAL Web Page to allow your user to interact with your app.

```js
const { challengeCode, url } = mal.auth.getChallenge();
```

In the above snippet, `challengeCode` is a PKCE compliant 128 character key which is generated in the `getChallenge()` function. 

The user needs to be redirected to the `url` returned in the above snippet where they need to login with their MAL ID and allow access to your app.

After that, you will receive a `code` in the redirect URL from MAL.
Now, using that `code` and the `challengeCode`, you need to do the following:

```js
const { data } = await mal.auth.getRefreshToken(code, challengeCode);
```

The `data` has the access token as well as the refresh token.

#### Refresh your access token

```js
const { data } = await mal.auth.refreshAccessToken(refreshToken);
```

To reissue the refresh token, you need to re-authorize your user on MAL, Follow from step 1.

## API

To use the following methods, it is assumed that you have your access token as well as the refresh token, so you need to initialize the package a little differently.

```js
const MyAnimeList = require('myanimelist-api');

const mal = new MyAnimeList({
    accessToken: "<Your access token>", 
    refreshToken: "<Your refresh token>",    
});
```

### Anime

#### Details of a specific anime

```js
const { data } = await mal.anime.details(11757, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes | 
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_anime_id_get)

#### Search 

```js
const { data } = await mal.anime.list("Your Name", options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
key | String | Yes | 
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_get)

#### Seasonal Anime 

```js
const { data } = await mal.anime.seasonal("summer", 2012, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
season | String | Yes | Can be `summer`, `winter`, `fall`, `spring`
year | Number | Yes |
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_season_year_season_get)

#### Ranking 

```js
const { data } = await mal.anime.ranking("all", options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
rankingType | String | Yes | Follow Reference Below
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_ranking_get)

#### Suggested Anime 

```js
const { data } = await mal.anime.suggestions(options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_suggestions_get)

### Manga

#### Details of a specific Manga

```js
const { data } = await mal.manga.details(21479, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes | 
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/manga_manga_id_get)

#### Search 

```js
const { data } = await mal.manga.list("Your Name", options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
key | String | Yes | 
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/manga_get)

#### Ranking 

```js
const { data } = await mal.manga.ranking("all", options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
rankingType | String | Yes | Follow Reference Below
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/manga_ranking_get)

### Forum

#### Get Boards 

```js
const { data } = await mal.forum.boards(options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/forum_boards_get)

#### Get Topics 

```js
const { data } = await mal.forum.topics(options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
options | Object | Yes | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/forum_topics_get)

#### Get Topic Details

```js
const { data } = await mal.forum.details(17876, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/forum_topic_get)

### User

#### Details 

```js
const { data } = await mal.user.details(username, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
username | String | No | Defaults to `@me`
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/users_user_id_get)

#### Get Anime List 

```js
const { data } = await mal.user.listAnime(username, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
username | String | No | Defaults to `@me`
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/users_user_id_animelist_get)

#### Update Anime List Entry 

```js
const { data } = await mal.user.updateAnime(11757, body);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes | 
body | Object | Yes | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_anime_id_my_list_status_put)

#### Delete Anime List Entry 

```js
const { data } = await mal.user.deleteAnime(11757);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/anime_anime_id_my_list_status_delete)

#### Get Manga List 

```js
const { data } = await mal.user.listManga(username, options);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
username | String | No | Defaults to `@me`
options | Object | No | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/users_user_id_mangalist_get)

#### Update Manga List Entry 

```js
const { data } = await mal.user.updateManga(11757, body);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes | 
body | Object | Yes | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/manga_manga_id_my_list_status_put)

#### Delete Manga List Entry 

```js
const { data } = await mal.user.deleteManga(11757);
```

| Parameter | Type | Required | Reference
--- | --- | --- | ---
id | Number | Yes | [Reference](https://myanimelist.net/apiconfig/references/api/v2#operation/manga_manga_id_my_list_status_delete)
