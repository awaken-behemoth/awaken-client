/**
 * The request state represent the different states that a specific action can have.
 *
 * **REST** : Not any action is being preformed;
 * **FAILED** : The action resulted in a failure;
 * **SUCCESS** : The action succeeded ;
 * **LOADING** : The action is currently being evaluated;
 */
enum AttemptState {
  REST,
  FAILURE,
  SUCCESS,
  LOADING
}

export default AttemptState;
