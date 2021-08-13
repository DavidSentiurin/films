import React from 'react';
import { Form, Input, Button, Progress } from 'antd';
import { Typography } from 'antd';
import styles from '@/styles/common/components/SignIn/SignIn.module.scss';
import { ContentContainer } from '../../common/components';
import { REGEX } from '../../common/constants';
import { OnFinish } from '../containers';

interface ISignInProps {
  disableForm: boolean;
  loadingFormBtn: boolean;
  onFinish: OnFinish;
  done?: boolean | null;
  error?: boolean;
}

const { Title } = Typography;

export const SignIn: React.FC<ISignInProps> = ({
  disableForm,
  loadingFormBtn,
  onFinish = () => null,
  done,
  error,
}) => {
  return (
    <ContentContainer>
      <section className={styles['sign-in-wrapper']}>
        <div className={styles['sign-in']}>
          <div className={styles['sign-in-title']}>
            <Title>Sign In</Title>
          </div>

          {done || error ? (
            <Progress
              type="circle"
              percent={100}
              status={error ? 'exception' : 'success'}
            />
          ) : (
            <div className={styles['sign-in-form']}>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                validateTrigger={'onBlur'}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                    {
                      pattern: new RegExp(REGEX.USERNAME),
                      message: 'Incorrect username',
                    },
                  ]}
                >
                  <Input disabled={disableForm} />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 4,
                      message: 'Password must be at least 4 characters',
                    },
                  ]}
                >
                  <Input.Password disabled={disableForm} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={disableForm}
                    loading={loadingFormBtn}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </section>
    </ContentContainer>
  );
};
