// The JS runtime is limited: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html

function handler(event) {
  // Request event format: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html
  // Response format: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-response, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-redirect-url.html
  var request = event.request
  var redirectUri = getRedirectTarget(request.uri, request.querystring)
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: redirectUri },
    },
  };
}

function getRedirectTarget(path, query) {
  // path always starts with a forward slash

  // Redirect subversions to the main version
  var match = /^\/pro\/v\/[^\/]*(\/.*)?$/.exec(path)
  if (match) {
    path = '/pro' + (match[1] || '')
  }

  // Initial page
  match = /^\/pro\/?$/.exec(path)
  if (match) {
    return 'https://dev.fingerprint.com/docs/introduction' + queryToString(query)
  }

  // JS agent guides
  match = /^\/pro\/js-agent\/(npm|cdn)\/?$/.exec(path)
  if (match) {
    return 'https://dev.fingerprint.com/docs/js-agent' + queryToString(query)
  }

  // Other 2nd level articles
  match = /^\/pro\/[^\/]*\/([^\/]+)\/?$/.exec(path)
  if (match) {
    return 'https://dev.fingerprint.com/docs/' + match[1] + queryToString(query)
  }

  // Other /pro pages, including root-level articles
  match = /^\/pro\/(.*)?$/.exec(path)
  if (match) {
    return 'https://dev.fingerprint.com/docs/' + match[1] + queryToString(query)
  }

  // Other
  return 'https://dev.fingerprint.com' + path + queryToString(query)
}

function queryToString(query) {
  // The value format description: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie
  if (!query) {
    return ''
  }
  var result = Object.keys(query)
    .map(function (key) {
      if (query[key].multiValue) {
        return query[key].multiValue
          .map(function (value) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(value.value)
          })
          .join('&')
      } else {
        return encodeURIComponent(key) + '=' + encodeURIComponent(query[key].value)
      }
    })
    .join('&')
  return (result && '?') + result
}
