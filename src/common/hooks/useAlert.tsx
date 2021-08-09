import { message } from 'antd';
import { ArgsProps } from 'antd/lib/message';
import { isFunction } from 'lodash';

export const useAlert = () => {
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
