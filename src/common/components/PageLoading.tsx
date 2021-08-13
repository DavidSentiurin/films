import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
import styles from '@/styles/common/components/PageLoading.module.scss';

interface IPageLoadingProps {
  spinConfig?: SpinProps;
}

export const PageLoading = ({
  spinConfig = {
    size: 'large',
  },
}: IPageLoadingProps) => {
  return (
    <div className={styles['page_loading']}>
      <Spin {...spinConfig} />
    </div>
  );
};
