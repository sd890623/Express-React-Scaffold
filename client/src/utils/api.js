import 'whatwg-fetch';
import _ from 'lodash';
import Promise from 'bluebird';
import EventEmitter from 'event-emitter';
import HttpError from 'standard-http-error';
import config from '../utils/conf';

const TIMEOUT = 120e3; // 120*10^3

export const BASE_URL = config.apiBaseUrl;

export const JSON_TYPE = 'application/json';
export const FORM_TYPE = 'application/x-www-form-urlencoded';
export const MULTI_PART_TYPE = 'multipart/form-data';

/**
 * All HTTP errors are emitted on this channel for interested listeners
 */
export const errors = new EventEmitter();

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}

function getRequestHeaders(contentType, body, token) {
  const headers = body
    ? { Accept: 'application/json', 'Content-Type': contentType }
    : { Accept: 'application/json' };

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

// try to get the best possible error message out of a response
// without throwing errors while parsing
async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return '';
    }

    // Optimal case is JSON with a defined message property
    const payload = JSON.parse(body);
    if (payload && payload.message) {
      return payload.message;
    }

    // Should that fail, return the whole response body as text
    return body;
  } catch (e) {
    // Unreadable body, return whatever the server returned
    return response;
  }
}

/**
 * Rejects a promise after `ms` number of milliseconds, it is still pending
 */
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

/**
 * Make best effort to turn a HTTP error or a runtime exception to meaningful error log message
 */
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error}`;
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  } else {
    console.error(`API request ${method.toUpperCase()} ${endpoint}
    failed with message "${error.message}"`);
  }
}

/**
 * Takes a relative path and makes it a full URL to API server
 */
export function url(path) {
  return BASE_URL + path;
}

/**
 * Transform body from object to form type
 * @param body
 */
export function transformBodyToForm(body) {
  const arrayBody = [];

  _.map(body, (value, key) => {
    if (value !== null && value.constructor === Array) {
      for (let i = 0; i < value.length; i++) {
        arrayBody.push(`${key}=${encodeURIComponent(value[i])}`);
      }
    } else {
      arrayBody.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  return _.join(arrayBody, '&');
}

/**
 * Return body to JSON or Form type
 * @param body
 * @param contentType
 */
export function constructBody(body, contentType) {
  switch (contentType) {
    case JSON_TYPE:
      return JSON.stringify(body);
    case FORM_TYPE:
      return transformBodyToForm(body);
    case MULTI_PART_TYPE:
    default:
      return body;
  }
}

export function transformBodyToUrl(body) {
  let parsed = (Object.keys(body).length !== 0) ? '?' : '';
  _.map(body, (value, key) => {
    parsed += `${key}=${encodeURIComponent(value)}&`;
  });
  return parsed;
}

/**
 * Build query string from an object
 * @param  {Object} obj the object which query string is built from
 * @param  {Boolean} questionMark if want to include the question mark
 * @return {String} query string without the question mark
 */
export function toQueryString(obj, questionMark = true) {
  const parts = Object.keys(obj).map(key =>
    `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  );
  const queryString = parts.join('&');
  return questionMark ? `?${queryString}` : queryString;
}

/**
 * Constructs and fires a HTTP request
 */
async function sendRequest(method, path, contentType, body) {
  try {
    const endpoint = url(path);
    const headers = getRequestHeaders(contentType, body);
    const credentials = 'include';
    const options = body
      ? { method, headers, credentials, body: constructBody(body, contentType) }
      : { method, headers, credentials };

    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Receives and reads a HTTP response
 */
async function handleResponse(path, response) {
  try {
    const status = response.status;
    // `fetch` promises resolve even if HTTP status indicates failure. Reroute
    // promise flow control to interpret error responses as failures
    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const error = new HttpError(status, message);

      // emit events on error channel, one for status-specific errors and other for all errors
      errors.emit(status.toString(), { path, message: error.message });
      errors.emit('*', { path, message: error.message }, status);

      throw error;
    }

    // parse response text
    const responseBody = await response.text();

    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null
    };
  } catch (e) {
    throw e;
  }
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} contentType JSON_TYPE, FORM_TYPE, or MULTI_PART_TYPE
 * @param {Object} body Anything that you can pass to JSON.stringify or Form Data
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 */
export async function request(method, path, contentType, body, suppressRedBox) {
  try {
    const response = await sendRequest(method, path, contentType, body, suppressRedBox);

    return handleResponse(
      path,
      response
    );
  } catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
    throw error;
  }
}

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @param {Object} contentType JSON_TYPE, FORM_TYPE, or MULTI_PART_TYPE
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise} of response body
 */
export async function get(path, contentType, suppressRedBox = false) {
  return bodyOf(request('get', path, contentType, null, suppressRedBox));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} contentType JSON_TYPE, FORM_TYPE, or MULTI_PART_TYPE
 * @param {Object} body Anything that you can pass to JSON.stringify or Form Data
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function post(path, contentType, body, suppressRedBox = false) {
  return bodyOf(request('post', path, contentType, body, suppressRedBox));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} contentType JSON_TYPE, FORM_TYPE, or MULTI_PART_TYPE
 * @param {Object} body Anything that you can pass to JSON.stringify or Form Data
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function put(path, contentType, body, suppressRedBox = false) {
  return bodyOf(request('put', path, contentType, body, suppressRedBox));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} contentType JSON_TYPE, FORM_TYPE, or MULTI_PART_TYPE
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function del(path, contentType, suppressRedBox = false) {
  return bodyOf(request('delete', path, contentType, null, suppressRedBox));
}

export function registerListeners({ xhr, progress, resolve }) {
  xhr.upload.addEventListener('progress', (event) => {
    if (!progress) return false;
    progress(Math.round((event.loaded / event.total) * 100));
    return null;
  });
  xhr.addEventListener('load', () => {
    let response;
    try {
      response = JSON.parse(xhr.response);
    } catch (e) {
      response = xhr.response;
    }
    resolve({
      response,
      error: xhr.status !== 200 && xhr.status !== 201,
      status: xhr.status,
    });
  });
  xhr.addEventListener('error', (error) => {
    resolve({ error, status: xhr.status, response: xhr.response });
  });
  xhr.addEventListener('abort', (aborted) => {
    resolve({ aborted });
  });
}

export function uploadFilesWithProgress({ requests, files, progress }) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    registerListeners({ xhr, resolve, progress });
    xhr.open(requests.method || 'POST', requests.url);
    xhr.withCredentials = requests.withCredentials || false;

    if (requests.headers) {
      Object.keys(requests.headers).forEach(header =>
        xhr.setRequestHeader(header, requests.headers[header]));
    }
    if (!requests.fileName && !requests.fields) return xhr.send(files[0]);

    const formData = new FormData();
    Array.from(files).forEach(file =>
      formData.append(requests.fileName || 'file', file));

    if (requests.fields) {
      Object.keys(requests.fields).forEach(field =>
        formData.append(field, requests.fields[field]));
    }
    xhr.send(formData);
    return null;
  });
}
