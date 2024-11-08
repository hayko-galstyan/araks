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
  ImportData = 'helps/Import+Data.png',
  ImportCleaning = 'helps/Import+Cleaning.png',
  ImportMapping = 'helps/Import+Mapping.png',
  ImportSetRules = 'helps/Import+Set+Rules.png',
}
interface MenuItem {
  title: string;
  content: JSX.Element;
  image?: JSX.Element;
}

const menuItems: Record<string, MenuItem> = {
  'sub7-1': {
    title: 'Integrating External Data into Araks',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          The Import feature in Araks allows users to seamlessly incorporate external data, typically from Excel (Xlsx)
          or CSV files, into the platform. This capability is crucial for creating a comprehensive knowledge graph by
          integrating diverse datasets
        </Space>
        <Text strong style={texttStyle}>
          Step-by-Step Import Process:
        </Text>
        <Text strong style={texttStyle}>
          Initiating Import
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Start in the Datasheet section (Tables) and click the <b>“Import”</b>butto
          </li>
          <li>Choose either an XLS or CSV file to begin the import process</li>
        </ul>
        <Text strong style={texttStyle}>
          Selecting the Data Sheet for Import
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Choose the specific sheet within your file for importing</li>
          <li>Click “Next” to proceed with the import</li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.ImportData}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Data Cleaning Process
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Specify if you need to skip top rows by entering the number in the “Skip top rows” input</li>
          <li>
            Determine if the first row contains column names and select <b>“Yes”</b> or <b>“No”</b> accordingly.
            Selecting <b>“Yes”</b>
            will use the first row as column headers, while “No” will default to alphabetical headers (A, B, C, etc)
          </li>
          <li>
            After cleaning, click <b>“Next”</b> to continue
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.ImportCleaning}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Mapping and Validation
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Initially, select the Default Property (other properties will be disabled initially)</li>
          <li>Proceed to select additional properties for your data</li>
          <li>
            During the Matching Process, the system will validate and match all rows of the selected column. If
            validation errors are detected, you can choose to <b>“Ignore Errors”</b> which will omit the erroneous rows
          </li>
          <li>
            Click <b>“Next”</b> to review the columns to be imported
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.ImportMapping}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Setting Import Rules
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            After mapping, set the import rules
            <ul>
              <li>
                <b>Skip:</b> The system will ignore existing row
              </li>
              <li>
                <b>Overwrite:</b> New importing data will update existing rows
              </li>
            </ul>
          </li>
          <li>Click the “Import” button to start the import process</li>
        </ul>
        <Text strong style={texttStyle}>
          Merging and Finalizing
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Click the “Import” button to start the import process</li>
          <li>Click “Ok” to conclude the import process and navigate back to the data sheet section</li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.ImportSetRules}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Streamlined Data Integration in Araks:
        </Text>
        <Space style={texttStyle}>
          The Import feature in Araks is designed to be user-friendly and efficient, enabling users to incorporate
          external data into their projects with precision and ease. From selecting the data sheet to setting import
          rules and merging the data, each step is structured to ensure a smooth integration of external datasets into
          the Araks platform.
        </Space>
      </Space>
    ),
  },
};

interface PerspectiveProps {
  activeMenuItem: string;
}

export const Import: React.FC<PerspectiveProps> = ({ activeMenuItem }) => {
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
