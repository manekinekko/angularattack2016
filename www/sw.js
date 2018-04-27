/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","b5a9c5870fb1e0409ae5a01cff0cf646"],["build/components/angie/angie.html","20142db44834a0c1512d48855bb3e6f0"],["build/css/app.ios.css","2a048a77730265e5080b9a43743b51d3"],["build/css/app.md.css","a6ce0df3fb008647b5e47fb7fb6dc389"],["build/css/app.wp.css","efe42bdc52182bdc5d6ce9584574beba"],["build/fonts/ionicons.ttf","74c652671225d6ded874a648502e5f0a"],["build/fonts/ionicons.woff","81414686e99c00d2921e03dd53c0ab04"],["build/fonts/ionicons.woff2","311d81961c5880647fec7eaca1221b2a"],["build/fonts/noto-sans-bold.ttf","a165a42685795361b25593effb32fdb1"],["build/fonts/noto-sans-regular.ttf","2fd9c16b805724d590c0cff96da070a4"],["build/fonts/roboto-bold.ttf","1f4fd7e4df65487f07ba9148f7ca095d"],["build/fonts/roboto-bold.woff","43183beef21370d8a4b0d64152287eba"],["build/fonts/roboto-light.ttf","9ff15bd34ea83e4dd3f23c20c7f5090e"],["build/fonts/roboto-light.woff","7e2d32e7141050d758a38b4ec96390c0"],["build/fonts/roboto-medium.ttf","a937e2cae14e68262a45aa91204c2fdf"],["build/fonts/roboto-medium.woff","0f3b7101a8adc1afe1fbe89775553c32"],["build/fonts/roboto-regular.ttf","07f8fb6acbabeb10d3fad9ab02d65e0b"],["build/fonts/roboto-regular.woff","f94d5e5102359961c44a1da1b58d37c9"],["build/js/Reflect.js","3e2f12c50659230feac24c06ecfa9f50"],["build/js/app.bundle.js","fe8c8c83f0b8eac59817c8e09669fadf"],["build/js/es6-shim.min.js","9d4304d9f51104986bc088e39fdf5d0d"],["build/js/zone.js","2222385d52aafe3cf4568d0173483fc6"],["build/pages/home/home.html","08c60cbbc05e2b37bb23dc5b28771e94"],["cordova.js","d41d8cd98f00b204e9800998ecf8427e"],["favicon.png","2d285ba901360c6e4a19af1a6d26d271"],["images/attila.png","6ff2d2ed69e3e12bf5cb7240c7dc8323"],["images/icon.png","d9802d1525f604c28cff0a7c84c27f35"],["images/letmesee.png","1caf22a67e203304da18f9331ab3d9ad"],["images/logo.png","488b9a9ccf745a64f442cdbdc08d5cf2"],["images/ng-show.mp3","a37c9ed9a87028ae5ff3bbd6633634cc"],["images/pwa/android-chrome-36x36.png","f2177d6683f1f15882d890de1a95bb62"],["images/pwa/android-chrome-48x48.png","9476b07e92718c92abfb2fac62f0a8b3"],["images/pwa/android-chrome-72x72.png","b8b2caa41e3bb170742997079bfa306b"],["images/pwa/android-chrome-96x96.png","c692f5b8705a974ebbda54d96872c190"],["images/pwa/apple-touch-icon-114x114.png","f9f12be465498a7bddab18cd9b7e673c"],["images/pwa/apple-touch-icon-120x120.png","f06d2444b7285ac69c51c178f98a912d"],["images/pwa/apple-touch-icon-57x57.png","f63093d3ff298e8be43c15955cf587de"],["images/pwa/apple-touch-icon-60x60.png","24136ec0c7a67cfb49d53450f6c623d6"],["images/pwa/apple-touch-icon-72x72.png","b5362e3c1a11a9bc387b92a1d3de0a41"],["images/pwa/apple-touch-icon-76x76.png","3dde2e009b6cc106583968b0439224e0"],["images/pwa/apple-touch-icon-precomposed.png","9bb93bc4070f2a6acd9152b9e0057d3d"],["images/pwa/apple-touch-icon.png","60dc6245bc876878dcc564b023c3184d"],["images/pwa/favicon-16x16.png","72026434d6ddaeadd99c370e725d7d7c"],["images/pwa/favicon-32x32.png","ff6c1a26ba6ff122d6e2d50c82ad8aca"],["images/pwa/favicon-96x96.png","c692f5b8705a974ebbda54d96872c190"],["images/pwa/icon.png","d9802d1525f604c28cff0a7c84c27f35"],["images/pwa/mstile-150x150.png","53350332972028060ac2bb4b132a1dcb"],["images/pwa/mstile-310x150.png","3eceb46bdb20d956526ef0f8882740e1"],["images/pwa/mstile-70x70.png","0357685c2f72338d7ef994f483f89548"],["images/pwa/safari-pinned-tab.svg","fc93b99a24fc46df30fca909e6fd903a"],["images/urish.png","8f46ed72c8e0585d96c152d14ac383a0"],["images/wassim.png","25331e697b07d536248f4580ce0e468b"],["index.html","24a7085db8e6625458c8b7d5de2adcc6"],["manifest.json","4a961ec9052d8cbd8ea13937e9660963"],["responsivevoice.js","f39bdd7aaccb3a8128122a069ba8c580"]];
var cacheName = 'sw-precache-v2-let-me-see-v1-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/./];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







