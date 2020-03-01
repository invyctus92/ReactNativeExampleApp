import {CHANGE_STATUS} from './ActionTypes';

export function changeConnectionStatus(status) {
  return {
    type: CHANGE_STATUS,
    connectiontype: status.type,
    effectiveType: status.effectiveType,
    isConnected: status.isConnected,
  };
}
