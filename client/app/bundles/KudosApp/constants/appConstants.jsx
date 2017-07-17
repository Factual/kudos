// See https://www.npmjs.com/package/mirror-creator
// Allows us to set up constants in a slightly more concise syntax. See:
// client/app/bundles/HelloWorld/actions/helloWorldActionCreators.jsx
import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'POSTED_KUDO',
  'INITIALIZE',
  'SERVER_RECEIVED_KUDO',
  'SERVER_REJECTED_KUDO',
  'SERVER_ACCEPTED_LIKE',
  'SERVER_ACCEPTED_UNLIKE',
  'SERVER_REJECTED_LIKE',
  'RESET_ERROR_MESSAGE',
  'SET_ACTIVE_TAB',
  'SERVER_ACCEPTED_EMAIL_SUBSCRIBE',
  'SERVER_ACCEPTED_EMAIL_UNSUBSCRIBE',
  'SERVER_REJECTED_EMAIL_SUB_TOGGLE',
  'FETCH_KUDOS_REQUEST',
  'FETCH_KUDOS_FAILURE',
  'FETCH_KUDOS_SUCCESS',
]);

// actionTypes = {HELLO_WORLD_NAME_UPDATE: "HELLO_WORLD_NAME_UPDATE"}
// Notice how we don't have to duplicate HELLO_WORLD_NAME_UPDATE twice
// thanks to mirror-creator.
export default actionTypes;
