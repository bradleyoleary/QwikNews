import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Drawer, Radio, Space } from 'antd';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';

class UserProfile extends React.Component {
  state = { visible: false, placement: 'bottom' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Space>
          <Radio.Group
            defaultValue={placement}
            onChange={this.onChange}></Radio.Group>
          <IconButton>
            <PersonIcon
              type='primary'
              onClick={this.showDrawer}
              style={{ fontSize: 34 }}
            />
          </IconButton>
        </Space>
        <Drawer
          title='Profile'
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}>
          <Wrap>
            <p>Saved Articles</p>
            <p>Settings</p>
            <Button>Sign Out</Button>
          </Wrap>
        </Drawer>
      </>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
  background: red;
  color: white;
  border-radius: 5px;
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default UserProfile;
