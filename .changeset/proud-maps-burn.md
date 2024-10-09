---
'@backstage/backend-plugin-api': minor
'@backstage/plugin-catalog-backend': minor
'@backstage/backend-test-utils': minor
'@backstage/backend-defaults': patch
---

Added a `isSearchUrl(url: string): boolean` method to `UrlReaderService` implementations.
This allows each integration to determine if it supports wildcard search URLs.
