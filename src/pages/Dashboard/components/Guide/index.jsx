import React, { useState } from 'react';
import { Button, Form, Input, Upload, Icon, Message } from '@alifd/next';
import styles from './index.module.scss';

const Guide = () => {
  const [postData, setValue] = useState({});

  const formChange = (value) => {
    setValue({ ...postData, value });
  };

  const handleSubmit = async (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      Message.error('创建失败');
      return;
    }
    console.log(values);
    Message.success('创建成功');
  };

  const uploadSuccess = (value) => {
    const url = value.response.url;
    // console.log(value);
    // console.log(url);
    setValue({ ...postData, cover: url });
  };

  const uploadError = (err) => {
    Message.error('上传失败');
  };

  const UploadCover = () => (
    <Upload.Dragger
      listType="image"
      action="https://songkeys.top/api/pic"
      method="post"
      formatter={(res, file) => {
        // 函数里面根据当前服务器返回的响应数据
        // 重新拼装符合组件要求的数据格式
        return {
          success: res.hasOwnProperty('data'),
          url: res.data,
        };
      }}
      accept="image/png, image/jpg, image/jpeg"
      limit={1}
      onSuccess={uploadSuccess}
      onError={uploadError}
    >
      <div className="next-upload-drag">
        <p className="next-upload-drag-icon">
          <Icon type="upload" />
        </p>
        <p className="next-upload-drag-text">点击或者拖动文件到虚线框内上传</p>
        <p className="next-upload-drag-hint">支持 PNG, JPG, JPEG 文件</p>
      </div>
    </Upload.Dragger>
  );

  return (
    <div className={styles.container}>
      <Form responsive labelAlign="top" value={postData} onChange={formChange}>
        <Form.Item
          colSpan={12}
          label="标题"
          maxLength={15}
          required
          requiredMessage="必填"
        >
          <Input name="title" placeholder="投票标题" />
        </Form.Item>
        <Form.Item colSpan={12} label="封面">
          <UploadCover />
        </Form.Item>
        <Form.Item
          colSpan={12}
          style={{
            marginTop: 32,
          }}
        >
          <Form.Submit
            type="primary"
            validate
            onClick={handleSubmit}
            style={{ display: 'block', margin: '0 auto' }}
          >
            确定
          </Form.Submit>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Guide;
