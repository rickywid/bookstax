import React, { Component } from 'react';
import {
  Form,
  Icon,
  Upload,
  message,
} from 'antd';
import PropTypes from 'prop-types';

export default class UploadFile extends Component {
  state = {
    fileList: [],
  };

  render() {
    const { fileList } = this.state;
    const { handleFileUpload } = this.props;

    const uploadProps = {
      name: 'file',
      multiple: false,
      accept: '.jpeg, .jpg, .png',
      fileList,
      customRequest: (file2) => {
        const data = new FormData();
        data.append('file', file2.file);

        fetch(`${process.env.REACT_APP_HOSTNAME}/upload/avatar`, {
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .then((url) => {
            file2.onProgress(e => console.log(e));
            file2.onSuccess(e => console.log(e));
            handleFileUpload(null, url.data);
          });
      },
      // action: 'http://localhost:5000/upload',
      onChange: (info) => {
        const { status } = info.file;

        if (status === 'done') {
          message.success(`${info.fileList[info.fileList.length - 1].name} uploaded successfully`);
        } else if (status === 'error') {
          message.error('File upload failed.');
        }
      },
      onRemove: (info) => {
        message.warning(`${info.name} removed.`);
        handleFileUpload('remove', info);
        this.setState({ fileList: [] });
      },
      beforeUpload: (info) => {
        const fileSize = info.size;
        const fileType = ['image/jpeg', 'image/jpg', 'image/png'];
        const validFileExt = fileType.includes(info.type);

        // check if file extension is valid
        if (!validFileExt) {
          message.warning('File type must be jpeg, jpg, png');
          return false;
        }

        // check file size
        if (fileSize > 1000000) {
          message.warning('File size must be smaller than 1MB');
          return false;
        }

        this.setState({ fileList: [...fileList, info] });

        return null;
      },
    };

    return (
      <div>
        <div className="form__section-body">
          <Form.Item>
            <div className="dropbox">
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </div>
          </Form.Item>
        </div>
      </div>
    );
  }
}

UploadFile.propTypes = {
  handleFileUpload: PropTypes.func.isRequired,
};
