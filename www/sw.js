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

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["build/components/angie/angie.html","20142db44834a0c1512d48855bb3e6f0"],["build/css/app.ios.css","94fd44169c7c75f2193a429cf2539592"],["build/css/app.md.css","01fdaa88db4f7888908b9e90d44b8625"],["build/css/app.wp.css","28799d1790ab59b06d4200d402e6ae70"],["build/fonts/ionicons.ttf","74c652671225d6ded874a648502e5f0a"],["build/fonts/ionicons.woff","81414686e99c00d2921e03dd53c0ab04"],["build/fonts/ionicons.woff2","311d81961c5880647fec7eaca1221b2a"],["build/fonts/noto-sans-bold.ttf","a165a42685795361b25593effb32fdb1"],["build/fonts/noto-sans-regular.ttf","2fd9c16b805724d590c0cff96da070a4"],["build/fonts/roboto-bold.ttf","1f4fd7e4df65487f07ba9148f7ca095d"],["build/fonts/roboto-bold.woff","43183beef21370d8a4b0d64152287eba"],["build/fonts/roboto-light.ttf","9ff15bd34ea83e4dd3f23c20c7f5090e"],["build/fonts/roboto-light.woff","7e2d32e7141050d758a38b4ec96390c0"],["build/fonts/roboto-medium.ttf","a937e2cae14e68262a45aa91204c2fdf"],["build/fonts/roboto-medium.woff","0f3b7101a8adc1afe1fbe89775553c32"],["build/fonts/roboto-regular.ttf","07f8fb6acbabeb10d3fad9ab02d65e0b"],["build/fonts/roboto-regular.woff","f94d5e5102359961c44a1da1b58d37c9"],["build/js/angular2-polyfills.js","af2cc3d241323ca3eaa599baf8341c4b"],["build/js/app.bundle.js","2076f9556b1e4e449dd7721ce11d19bf"],["build/js/es6-shim.min.js","9d4304d9f51104986bc088e39fdf5d0d"],["build/pages/home/home.html","c0c5d4efc07b225315bba017f92e509a"],["cordova.js","d41d8cd98f00b204e9800998ecf8427e"],["favicon.png","2d285ba901360c6e4a19af1a6d26d271"],["images/attila.png","6ff2d2ed69e3e12bf5cb7240c7dc8323"],["images/icon.png","d9802d1525f604c28cff0a7c84c27f35"],["images/letmesee.png","1caf22a67e203304da18f9331ab3d9ad"],["images/logo.png","a214369dc3d96ba36e8841bc8fd863a7"],["images/ng-show.mp3","a37c9ed9a87028ae5ff3bbd6633634cc"],["images/pwa/android-chrome-36x36.png","f2177d6683f1f15882d890de1a95bb62"],["images/pwa/android-chrome-48x48.png","9476b07e92718c92abfb2fac62f0a8b3"],["images/pwa/android-chrome-72x72.png","b8b2caa41e3bb170742997079bfa306b"],["images/pwa/android-chrome-96x96.png","c692f5b8705a974ebbda54d96872c190"],["images/pwa/apple-touch-icon-114x114.png","f9f12be465498a7bddab18cd9b7e673c"],["images/pwa/apple-touch-icon-120x120.png","f06d2444b7285ac69c51c178f98a912d"],["images/pwa/apple-touch-icon-57x57.png","f63093d3ff298e8be43c15955cf587de"],["images/pwa/apple-touch-icon-60x60.png","24136ec0c7a67cfb49d53450f6c623d6"],["images/pwa/apple-touch-icon-72x72.png","b5362e3c1a11a9bc387b92a1d3de0a41"],["images/pwa/apple-touch-icon-76x76.png","3dde2e009b6cc106583968b0439224e0"],["images/pwa/apple-touch-icon-precomposed.png","9bb93bc4070f2a6acd9152b9e0057d3d"],["images/pwa/apple-touch-icon.png","60dc6245bc876878dcc564b023c3184d"],["images/pwa/favicon-16x16.png","72026434d6ddaeadd99c370e725d7d7c"],["images/pwa/favicon-32x32.png","ff6c1a26ba6ff122d6e2d50c82ad8aca"],["images/pwa/favicon-96x96.png","c692f5b8705a974ebbda54d96872c190"],["images/pwa/icon.png","d9802d1525f604c28cff0a7c84c27f35"],["images/pwa/mstile-150x150.png","53350332972028060ac2bb4b132a1dcb"],["images/pwa/mstile-310x150.png","3eceb46bdb20d956526ef0f8882740e1"],["images/pwa/mstile-70x70.png","0357685c2f72338d7ef994f483f89548"],["images/pwa/safari-pinned-tab.svg","fc93b99a24fc46df30fca909e6fd903a"],["images/urish.png","8f46ed72c8e0585d96c152d14ac383a0"],["images/wassim.png","25331e697b07d536248f4580ce0e468b"],["index.html","dc3f26c15f5847e39485e310bd2c6f6c"],["manifest.json","4a961ec9052d8cbd8ea13937e9660963"],["responsivevoice.js","f39bdd7aaccb3a8128122a069ba8c580"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-let-me-see-v1-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/./];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
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

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
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


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




