import React from 'react';
import { Image, Typography } from 'antd';
import { TitleStyle } from '../titlestyle';
import { ImageWrapper } from '../image-wrapper';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;
enum Paths {
  CreateAProjectImg = 'helps/create-a-project.svg',
  EditProject = 'helps/edit-project.svg',
  EditProjects = 'helps/edit-projects.svg',
  DeleteProject = 'helps/delete-project.svg',
  CreateFolder = 'helps/create-folder.svg',
  EditFolder = 'helps/edit-folder.svg',
  DeleteFolder = 'helps/delete-folder.svg',
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
const { Text } = Typography;
const menuItems: Record<string, MenuItem> = {
  'sub1-1': {
    title: 'Manage Project',
    content: (
      <>
        <Text strong style={texttStyle}>
          Create a Project
        </Text>
        <ul style={{ color: '#808080' }}>
          <li>
            Click the <b>“Create New Project”</b> and navigate to the “Overview” page
          </li>
          <li>
            Type the <b>Name</b> of the Project
          </li>
          <li>Select color and Icon</li>
          <li>
            Type a short <b>Description</b>
          </li>
          <li>Choose Privacy:</li>
          <ul>
            <li>
              <b>Private </b>(Can see only owner)
            </li>
            <li>
              <b>Public </b>(Can see all users)
            </li>
          </ul>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.CreateAProjectImg}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Preview of the project
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>Double click on the Project and will open the Project preview</li>
          <li>
            Click the <b>“Open Project”</b> button and navigate to the “Overview” section
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.EditProjects}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Edit the Project
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click the <b>“Setting” </b>button on the current Project
          </li>
          <li>
            Click the <b>“Edit”</b> button and navigate to the “Overview” page
          </li>
          <li>Can edit Name, Color, Icon, Description and Privacy</li>
          <li>
            Click the <b>“Save” </b>button to keep changes
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.EditProject}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Delete the Project
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click the <b>“Setting”</b> button on the current Project
          </li>
          <li>
            Click the <b>“Delete” </b>button to delete the Project
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.DeleteProject}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub1-2': {
    title: 'Manage Folders',
    content: (
      <>
        <Text strong style={texttStyle}>
          Create a Folder
        </Text>
        <Text style={{ color: '#808080', fontSize: '16px', marginLeft: '6%' }}>
          On the “Home” page of your account:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Click <b>“Add Folder”</b> button
          </li>
          <li>
            Type the <b>Name</b> of the Folder
          </li>
          <li>
            Click <b>“Save”</b> button
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.CreateFolder}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Edit the Folder
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px', margin: '0' }}>
          <li>
            Click <b>“Setting”</b> button the current Folder
          </li>
          <li>
            Click <b>“Edit”</b> button and Edit Folder name
          </li>
          <li>
            Click <b>“Save”</b> button to keep changes
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.EditFolder}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Delete the Folder
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>“Setting”</b> button on the current Folder
          </li>
          <li>
            Click <b>“Delete” </b> button to delete the Folder
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.DeleteFolder}`} />
        </ImageWrapper>
      </>
    ),
  },
};

interface ProjectsFoldersProps {
  activeMenuItem: string;
}

export const ProjectsFolders: React.FC<ProjectsFoldersProps> = ({ activeMenuItem }) => {
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
