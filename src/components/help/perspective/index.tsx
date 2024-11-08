import React from 'react';
import { Image, Space, Typography } from 'antd';
import { TitleStyle } from '../titlestyle';
import { ImageWrapper } from '../image-wrapper';

const { Text } = Typography;

const texttStyle = {
  fontSize: '16px',
  paddingLeft: '6%',
  color: '#808080',
};

const helpUrl = `${process.env.REACT_APP_AWS_URL}`;

enum Paths {
  AllMembers = 'helps/all-members.svg',
  MainPerspective = 'helps/main-perspective.svg',
  AddNewPerspective = 'helps/add-new-perspective.svg',
  NewPerspective = 'helps/new-perspective.svg',
  SharePerspective = 'helps/share-perspective.svg',
}
interface MenuItem {
  title: string;
  content: JSX.Element;
  image?: JSX.Element;
}

const menuItems: Record<string, MenuItem> = {
  'sub6-1': {
    title: 'Tailored Views for Collaborative Flexibility ',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          In Araks, Perspectives” serve as a dynamic tool for project owners to create and manage customized views of
          their graph schema systems. This feature is vital for tailoring the data presentation to suit specific user
          roles or objectives, ensuring focused access and enhancing collaborative workflows while maintaining data
          integrity and security.
        </Space>
        <Text style={texttStyle}>Detailed Guide to Managing Perspectives:</Text>
        <Text strong style={texttStyle}>
          Creating a New Perspective:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Begin by clicking the <b>“+ Perspective”</b> button, illustrated in pic. 36 of the manual
          </li>
          <li>
            Enter a distinctive name for the new perspective and provide a detailed description. This description should
            convey the purpose and intended use of the perspective, aiding in future management and collaboration
          </li>
          <li>
            Consider the scope of the perspective: Is it for a specific project phase, a particular team, or a certain
            type of analysis
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.AddNewPerspective}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Configuring Node Type Visibility:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Within each perspective, node type visibility is a key feature. Use the “Eye” icon next to each node type to
            control which nodes are visible in this specific perspective
          </li>
          <li>
            This level of customization is crucial for focusing on relevant data without the distraction of unrelated
            information. For instance, a perspective for financial analysis might only display nodes related to budget
            and expenditure
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.MainPerspective}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Sharing and Collaborating:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            The <b>“Share”</b> button opens the sharing options. Here, you can select the perspective you wish to share
          </li>
          <li>
            Input the First name and/or Last name of your colleague and assign a role:
            <ul>
              <li>
                <b>Edit Role:</b> Allows users to modify the graph, add new nodes, and import/export data within the
                shared perspective
              </li>
              <li>
                <b>View Role:</b> Limits users to viewing the data, ideal for reviewers or team members who need
                informational access without editing capabilities
              </li>
            </ul>
          </li>
          <li>
            Click “Send Invite” to grant access to the chosen perspective. This allows for controlled collaboration,
            where team members access only what they need, ensuring data privacy and focus
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.SharePerspective}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Member Management and Perspective Removal:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            The <b>“See all members”</b> button leads to a comprehensive list of all users with access to a particular
            perspective. This is a key feature for project owners to manage team access and roles effectively
          </li>
          <li>
            As the project evolves, roles can be adjusted or removed. The ability to delete a perspective when it&#39;s
            no longer relevant ensures that the project stays organized and current
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.AllMembers}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Maximizing Collaboration with Perspectives:
        </Text>
        <Space style={texttStyle}>
          The Perspectives feature in Araks is more than just a tool for viewing data; it&#39;s a means to streamline
          collaboration, enhance project focus, and manage data access efficiently. By allowing project owners to create
          custom views and share these with specific team members, Araks ensures that each user interacts with the data
          most relevant to their role, enhancing both productivity and data security.
        </Space>
      </Space>
    ),
  },
};

interface PerspectiveProps {
  activeMenuItem: string;
}

export const Perspective: React.FC<PerspectiveProps> = ({ activeMenuItem }) => {
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
