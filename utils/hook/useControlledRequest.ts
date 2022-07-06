import { useState } from 'react';

import AttemptState from '../../enum/AttemptState';

import useAtomicState from './useAtomicState';

/**
 *
 * Utility function to help handle state of http request. Controls success, failure, error and rest state.
 *
 * @param successfulStatusCode a list of response status codes considered successful : default to [200]
 * @param delayBeforeRest time before which a failed or successful state is reset to rest;
 * @returns requestController with method to control the request state;
 */
const useControlledRequest = (
  delayBeforeRest = 5000,
  successfulStatusCode: number[] = [200]
) => {
  const [status, setStatus] = useState<number>(undefined);

  const [state, setState] = useAtomicState<number>(AttemptState.REST);

  /**
   * Makes an api request while updating the request state;
   *
   * @param request request function that returns a promise
   * @param config configurations
   */
  async function makeRequest<
    T extends {
      status: number;
    }
  >(
    request: () => Promise<T>,
    config?: {
      delayBeforeRest: number;
    }
  ) {
    const updateStateAtomically = setState(AttemptState.LOADING);

    const response = await request();

    if (successfulStatusCode.includes(response.status)) {
      updateStateAtomically(AttemptState.SUCCESS);
    } else {
      updateStateAtomically(AttemptState.FAILURE);
    }

    setStatus(response.status);

    setTimeout(() => {
      updateStateAtomically(AttemptState.REST);
    }, config?.delayBeforeRest || delayBeforeRest);
  }

  return {
    makeRequest,
    state,
    status
  };
};

export default useControlledRequest;
