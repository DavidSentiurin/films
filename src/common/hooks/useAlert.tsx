import { message } from 'antd';
import { ArgsProps } from 'antd/lib/message';
import { isFunction } from 'lodash';

export interface IAlert {
  showAlert: (config: ArgsProps) => void;
}

export const useAlert = (): IAlert => {
  const showAlert = (config: ArgsProps) => {
    if (!config.content) {
      return;
    }

    if (isFunction(message[config.type])) {
      message.open(config);
    }
  };

  return {
    showAlert,
  };
};
