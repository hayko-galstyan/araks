import React from 'react';
import { Space, Typography, Image } from 'antd';
import { TitleStyle } from '../titlestyle';
import { ImageWrapper } from '../image-wrapper';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;

const { Text } = Typography;

enum Paths {
  ProjectName = 'helps/project-name.svg',
  AllMembers = 'helps/all-members.svg',
  Comments = 'helps/comments.svg',
}
interface MenuItem {
  title: string;
  content: JSX.Element;
  image?: JSX.Element;
}
const texttStyle = {
  fontSize: '16px',
  paddingLeft: '6%',
  color: '#808080',
};
const menuItems: Record<string, MenuItem> = {
  'sub4-1': {
    title: 'Project Overview',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          You should click on “Create a project” and then you navigate to the Overview page. Here you name the project,
          add color and icon to it, fill in the description field and save it.
        </Space>
        <Text strong style={texttStyle}>
          Edit the Project
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Click to the Edit icon and change:</li>
          <li>Project name</li>
          <li>Project Image icon</li>
          <li>Project Image color</li>
          <li>
            Project Privacy
            <ul>
              <li>Private - the project can see only owner</li>
              <li>Public - the project can see all Users (view permission)</li>
            </ul>
          </li>
        </ul>
        <ImageWrapper>
          <Image src={`${helpUrl}${Paths.ProjectName}`} rootClassName="help-image" />
        </ImageWrapper>
      </Space>
    ),
  },
  'sub4-3': {
    title: 'Comments and Likes',
    content: (
      <>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Users can add comments and view likes for the project on the “Overview” page. The “Comments and Likes”
            section allows users to engage in collaborative discussions, receive project-related feedback, and
            acknowledge appreciation through the <b>“Like”</b> feature.Users can share comments related to the project
          </li>
          <li>
            Users can add comments to the project and specific nodes. Mentioning users is achieved by including their
            <b>@Member email</b>
          </li>
          <li>
            Users have the option to delete their own comments. Deleted comments are promptly removed from the
            project&#39;s comment history
          </li>
          <li>
            Users can easily view all comments associated with the project or nodes. The <b>“Like” </b>feature enables
            users to express positive sentiments toward the entire project
          </li>
        </ul>
        <ImageWrapper>
          <Image src={`${helpUrl}${Paths.Comments}`} rootClassName="help-image" />
        </ImageWrapper>
      </>
    ),
  },
};
interface OverviewSectionProps {
  activeMenuItem: string;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <div style={{ fontSize: '16px' }}>
        <TitleStyle>{menuItem.title}</TitleStyle>
        <div style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(100vh - 64px)' }}>
          {menuItem.content}
        </div>
      </div>
    );
  }

  return null;
};
