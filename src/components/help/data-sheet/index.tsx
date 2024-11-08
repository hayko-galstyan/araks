import React from 'react';
import { Image, Space, Typography } from 'antd';
// import { ReactComponent as SearchNode } from 'components/help/searchnode.svg';
// import { ReactComponent as DocSearch } from 'components/help/docsearch.svg';
import { TitleStyle } from '../titlestyle';
import { ImageWrapper } from '../image-wrapper';

const helpUrl = `${process.env.REACT_APP_AWS_URL}`;

const texttStyle = {
  fontSize: '16px',
  paddingLeft: '6%',
  color: '#808080',
};
enum Paths {
  NewConnection = 'helps/new-connection.svg',
  NodeInConnection = 'helps/node-incon.svg',
  AddNode = 'helps/add-node.svg',
  ViewNode = 'helps/view-node.svg',
}

interface MenuItem {
  title: string;
  content: JSX.Element;
  image?: JSX.Element;
}
const { Text } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub3-1': {
    title: 'Tabular Node Addition and Connection Management',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          The Datasheet section in Araks complements the Project Schema by providing a more operational perspective. It
          focuses on the practical aspect of adding and managing nodes and connections in a tabular layout, facilitating
          data entry and organization.
        </Space>
        <Space style={texttStyle}>
          In the Data Sheet section, users can seamlessly create types and properties similar to the data schema
          creation process described above, providing a unified and efficient experience for managing their
          project&#39;s structure and attributes.
        </Space>
        <Text strong style={texttStyle}>
          Data Entry
        </Text>
        <ul style={{ fontSize: '16px', color: '#808080', margin: '0' }}>
          <li>
            The Datasheet&#39;s tabular format simplifies the process of adding nodes, making data entry organized and
            efficient
          </li>
          <li>
            By clicking <b>“+ Add Node”</b> button, you can Create new node
          </li>
          <li>Type the Node Name (required and max 50 character)</li>
          <li>Fill the Properties, (read more in the Data Type)</li>
          <li>
            Click the <b>“Save”</b> button and New node will appear on the Datasheet
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.AddNode}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Node View
        </Text>
        <ul style={{ fontSize: '16px', color: '#808080', margin: '0' }}>
          <li>
            Clicking on the “Node Name” opens the <b>“Node View”</b> drawer in the Datasheet section, providing a
            detailed view and options for the selected node.
          </li>
          <li>
            Interacting with the <b>“Edit”</b> icon enables users to modify the node&#39;s details
          </li>
          <li>
            Clicking on the <b>“Visualization”</b>icon navigates users to the Visualization section, displaying the node
            along with its con- nections
          </li>
          <li>For exporting node information to PDF, users can click on the “Export” button</li>
          <li>
            Clicking the <b>“Delete”</b> icon removes the selected node
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.ViewNode}`} />{' '}
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Node Connections
        </Text>
        <Space style={texttStyle}>
          This section enables you to link nodes, as shown in pic. 20, offering a user-friendly approach to establishing
          and managing connections between different data points
        </Space>
        <ul style={{ fontSize: '16px', color: '#808080', margin: '0' }}>
          <li>
            By clicking <b>“+”</b> button, you can Create new node connection
          </li>
          <li>Search and select node for the Source Type</li>
          <li>Search and select node for the Target Type</li>
          <li>Type the Connection&#39;s properties</li>
          <li>
            Click the <b>“Save”</b>button and New Node Connection will ap- pear on the Connection list
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.NewConnection}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Modifying Nodes Connection
        </Text>
        <Text style={texttStyle}>The Nodes Connection can be edited or removed:</Text>
        <ul style={{ fontSize: '16px', color: '#808080', margin: '0' }}>
          <li>
            Click <b>“Target-Source”</b>of the current connection
          </li>
          <li>The system will open “Edit Connection Type” pop-up</li>
          <li>
            Edit the <b>“Connection name”</b> (if there are no data)
          </li>
          <li>Source - dropdown (there will show the list of types, if there are no data)</li>
          <li>Target - dropdown (there will show the list of types, if there are no data)</li>
          <li>Inverse - (if the source and target the same type)</li>
          <li>
            Click <b>“Save”</b> button to keep changes
          </li>
          <li>
            Click <b>“Delete”</b> button (The Connection will be deleted if there are no data)
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.NodeInConnection}`} />
        </ImageWrapper>
      </Space>
    ),
  },
  'sub3-2': {
    title: 'Comprehensive Data Handling',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          The “All Data” section in Araks serves as a centralized hub for comprehensive data management, allowing users
          to efficiently navigate and explore their entire dataset. This section integrates powerful search
          functionality, leveraging Elasticsearch to facilitate quick and accurate data retrieval. Users can find
          documents based on their names and textual content, leveraging Elasticsearchs capabilities. Below is an
          overview of the key features and functionalities within the “All Data” section:
        </Space>
        <ul style={{ color: '#808080' }}>
          <li>
            Navigate to the <b>“All Data”</b> section in Araks. Utilize the search functionality for extensive results
          </li>
          <li>
            Users can search based on: <b>All data</b> (nodes) or <b>Search in Documents</b> (document)
          </li>
          <li>
            Users can refine searches using filters, specifying whether to search in all data or focus exclusively on
            documents
          </li>
          <li>
            When a user initiates a search <b>Node</b>, the system displays results that match node names. Nodes are
            presented in a tabular format, showcasing relevant details
          </li>
        </ul>
        {/* <SearchNode style={{ margin: '20px' }} /> */}
        <Text strong style={texttStyle}>
          In Search Results
        </Text>
        <Text style={texttStyle}> The system utilizes Elasticsearch for accurate document retrieval, including:</Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Document names and/or Context within the document</li>
          <li>In the The search result provides a count of matching, higlhghting the result of documents </li>
          <li>Clicking on a document name navigates the user to the node view, highlighting the selected document</li>
          <li>In the node view, users can explore and interact with the document content</li>
          <li>The system ensures visibility of matching documents and their count in the result set</li>
          <li>Araks supports document types such as .doc, .docx, and .pdf for comprehensive search capabilities</li>
          {/* <DocSearch /> */}
        </ul>
      </Space>
    ),
  },
};

interface DataSheetSectionProps {
  activeMenuItem: string;
}

export const DataSheetSection: React.FC<DataSheetSectionProps> = ({ activeMenuItem }) => {
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
