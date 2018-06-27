import React, { Component, Fragment } from 'react';

import { storage } from '../utils/storage';
import { headerUtil, setAuthToken }  from '../index';
import { initializeApi } from '../utils/initializeApi';

import { createApiGatewayStateObject } from './utils';
import { fetchAuthenticationToken } from './api';

/** ApiGateWayContext
 * This is created to use the React context API
 * ApiGateWayContext is exposed by the package so it can be consued
*/
export const ApiGateWayContext = React.createContext()
// export const ApiGateWayContext = React.createContext({
//   setAuthUserToken: (token) => {
//     const storage = storage()
//     this.setState({
//       // get sessionStorage item and merge with token
//     })
//   }
// });

/** ApiGateWayWrapper
 * This is a React Wrapper Component that sits around the complete application
 * Purpose of this is to make intergration to this package when using react easier
 * This acts as a interface to extract configuration from applications to this package
*/
class ApiGateWayWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = createApiGatewayStateObject({ valid: false })
  }
  componentDidMount() {
    // storage interface
    const storage = storage(this.props.sessionStorage)

    // retrevie storage items
    const gatewayAuthData = storage.get(this.props.storageKey)
    const { valid, gatewayAuthToken, sessionId } = gatewayAuthData

    /** fetchAuthenticationToken
     * This is an intial call for the api auth token
     * wrapped in a check for current state, checking if a valid token exists
     * id a valid token exsits, skip the api call and initialize, if no valid token, call for one and than initialize
    */
    if (!valid && !token) {
      return fetchAuthenticationToken(this.props.authenticationEndPoint)
        .then(response => {
          // initialize
          return this.initialize(this.props, response.data.token.access_token, this.createSessionId())
        })
        .catch(error => {
          // set error
          // TODO: add in Alert component to handle failure
          return this.setState(createApiGatewayStateObject({ valid: false, error }))
        })
    }

    // if valid and has token, initialize with these exiting values
    return this.initialize(this.props, gatewayAuthToken, sessionId)
  }
  /** createSessionId
   * create sessionId for passing to each api call, this is IAG standard
  */
  createSessionId() {
    return headerUtil.sessionIdHeader.createId()
  }
  /** createBearerBasedToken
   * create string with token, prefixed with `Bearer`
   * TODO: come back and look at this, current state is `Bearer` but needs looking at in case of change
  */
  createBearerBasedToken(token) {
    return `Bearer ${token}`
  }
  /** updateGateWayAuthenticationState
   * util used to update updateGateWayAuthenticationState
  */
  updateGateWayAuthenticationState(item, valid) {
    this.setState(
      createApiGatewayStateObject({
        ...item,
        valid
      })
    )
  }
  /** initialize
   * initialize is a wrapper function for reqsuired actions that takes for each initialize
   * access `storage` interface for setting updated values
   * setAuthToken for use within lib, TODO: might look at other soultions later (potentially completly driven by storage)
   * set sessionId for use within lib
   * set state and storage
   * initialize lib use initApi
  */
  initialize(props, token, sessionId, brand) {
    // storage interace
    const storage = storage(this.props.sessionStorage)

    // create bearer string
    const gatewayAuthToken = createBearerBasedToken(token);

    // set values for lib
    setAuthToken(gatewayAuthToken);
    headerUtil.sessionIdHeader.setId(sessionId);
    headerUtil.brandHeader.setBrand(props.brand)
    // if (headersReducer.userAuth.isSet && headersReducer.userAuth.token !== null) setUserAuth(headersReducer.userAuth.value)

    // create object with values
    const apiGatewayStateObject = createApiGatewayStatObject(token, sessionId)

    // update state
    this.updateGateWayAuthenticationState(storage.set(this.props.storageKey, apiGatewayStateObject), true)

    // initApi
    this.initApi(props)
  }
  /** initApi
   * initApi wraps initializeApi for re use and destructeing purposes
  */
  initApi({ apiBaseUrl, apiOverrides, consumer, product, testLocal }) {
    initializeApi({ apiBaseUrl, apiOverrides, consumer, product, testLocal })
  }
  render() {
    <Fragment>
      <ApiGateWayContext.Provider value={{ gateWayAuthentication: this.state.gateWayAuthentication }}>
        {this.state.valid && this.props.children}
      </ApiGateWayContext.Provider>
    </Fragment>
  }
}

/** storageKey
 * This is a default storage key, this can be passed in for customization
*/
ApiGateWayWrapper.defaultProps = {
  storageKey: '@IAG_ApiGateWayWrapper'
}

export default ApiGateWayWrapper;
