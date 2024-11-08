import React from 'react';
import { Image, Space, Typography } from 'antd';
// import { ReactComponent as DataType } from 'components/help/datatype.svg';
import { TitleStyle } from '../titlestyle';
import { ImageWrapper } from '../image-wrapper';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;

enum Paths {
  AddNewProperty = 'helps/add-new-property.svg',
  EditDeleteProperty = 'helps/edit-delete-property.svg',
  CreateConnection = 'helps/create-connection.svg',
  EditDeleteConnection = 'helps/edit-delete-connection.svg',
  AddConnectionProperty = 'helps/add-connection-property.svg',
  SearchInSchema = 'helps/search-in-schema.svg',
  CreateNewType = 'helps/create-new-type.svg',
  EditDeleteType = 'helps/edit-delete-type.svg',
}
const { Text } = Typography;
const texttStyle = {
  fontSize: '16px',
  padding: '0 6%',
  color: '#808080',
};
const sections: Record<
  string,
  {
    title: string;
    content: JSX.Element;
  }
> = {
  'sub2-1': {
    title: 'Creating and Managing Types',
    content: (
      <>
        <Text strong style={texttStyle}>
          Adding Node Types
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Initiate by clicking<b> &#39;+&#39;</b> and selecting a location on the canvas. This action triggers the
            <b>“Add New Type”</b> pop-up
          </li>
          <ul>
            <li>Input the Node Type Name (required)</li>
            <li>Select a Parent Type (if applicable)</li>
            <li>Select color and Icon (required and unique)</li>
          </ul>
          <li>
            Click the <b>“Save”</b> button and create new Type
          </li>
          <li>This step is crucial for establishing the primary entities of your data</li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.CreateNewType}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Editing and Deleting Types
        </Text>
        <Space style={texttStyle}>
          To keep your schema adaptive and relevant, the type settings provide options to edit or delete types. This
          functionality is essential for refining the data model as the project&#39;s scope evolves:
        </Space>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Click <b>“Setting”</b> the current Type
          </li>
          <li>Edit Type Name, Parents and Color</li>
          <li>
            Click <b>“Save”</b> button to keep changes
          </li>
          <li>
            Click <b>“Delete”</b> button (The system will remove if the Type is Empty)
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.EditDeleteType}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub2-2': {
    title: 'Property Management in Schema',
    content: (
      <>
        <Text strong style={texttStyle}>
          Adding Properties
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            By clicking <b>&#39;+ Add property&#39;</b>, you can append new properties to your types, thereby enhancing
            their definition and making them more descriptive and useful
          </li>
          <li>
            Type the <b>Property Name</b> (required and First character must be letter)
          </li>
          <li>
            Select <b>Data type*</b> - Text, Date, Date time, Integer, Decimal, Boolean, Location, URL, Image URL,
            Document, Rich Text, Connection, (each Data type has specific validation criteria, limits, and features to
            ensure data integrity and proper representation in the system)
          </li>
          <li>Select Required, Multiple or Set field as unique</li>
          <li>
            Click the <b>“Save”</b> button and create new Property
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.AddNewProperty}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Modifying Properties
        </Text>
        <Space style={texttStyle}>
          The properties of a type can be edited or removed, allowing for dynamic updates and maintenance of the
          schema&#39;s accuracy:
        </Space>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Click <b>“Setting”</b> the current Type
          </li>
          <li>
            Edit the <b>Property Name</b> (required and First character must be letter )
          </li>
          <li>Change Data type</li>
          <li>Change Required, Multiple or Set field as unique.</li>
          <li>
            Click <b>“Save”</b> button to keep changes
          </li>
          <li>
            Click <b>“Delete”</b> button (The property will be deleted if there are no data.)
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.EditDeleteProperty}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub2-3': {
    title: 'Connection Management in Schema',
    content: (
      <>
        <Text strong style={texttStyle}>
          Establishing Connections
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Create connections by dragging lines between types, then specifying the details in the
            <b>“Add Connection”</b> pop-up
          </li>
          <li>Type the Connection name (required)</li>
          <li>Source - select from the dropdown, displaying a list of available types</li>
          <li>Target - dropdown (there will show the list of types)</li>
          <li>Inverse - (Relevant when the source and target are the same type)</li>
          <li>
            Click the <b>“Save”</b> button to finalize and create the new connection
          </li>
        </ul>
        <Space style={texttStyle}>
          This step is vital for illustrating the relationships and interactions between different data types
        </Space>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.CreateConnection}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Edit or Delete the Connection
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Users have the flexibility to <b>“Edit”</b> connection types based on their project&#39;s evolving needs
          </li>
          <li>If the connection type already contains data, users can modify only the connection name</li>
          <li>
            In cases where theres no existing data associated with the connection type, users gain the additional
            capability to change both the Target and Source
          </li>
          <li>
            This adaptable approach ensures accurate representation and alignment with the project&#39;s data structure
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.EditDeleteConnection}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub2-4': {
    title: 'Connection  Property Management in Schema',
    content: (
      <>
        <Text strong style={texttStyle}>
          Adding Connection&#39;s Properties
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            By clicking <b>&#39;+ Add property&#39;</b>, you can append new properties to your connection, thereby
            enhancing their definition and making them more descriptive and useful
          </li>
          <li>
            Type the <b> Property Name </b>(required and First character must be letter)
          </li>
          <li>
            Select<b> Data type*</b> - Text, Date, Date time, Integer, Decimal
          </li>
          <li>
            Click the <b>“Save”</b>button and create Connection&#39;s Property
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.AddConnectionProperty}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Modifying Connection&#39;s Properties
        </Text>
        <Space style={texttStyle}>The properties of a connection can be edited or removed</Space>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Click on the property and the system will open “Edit connection property” pop-up</li>
          <li>Edit the Property Name (required and First character must be letter)</li>
          <li>
            Change <b>“Data type”</b> (every Data type has own types to change)
          </li>
          <li>
            Click <b>“Save”</b> button to keep changes
          </li>
          <li>
            Click <b>“Delete”</b> button (The property will be deleted if there are no data)
          </li>
        </ul>
      </>
    ),
  },
  'sub2-5': {
    title: 'Search Management in Schema',
    content: (
      <>
        <Space style={texttStyle}>
          In the Schema section, users can perform searches to find specific nodes, types, properties, connections, and
          connection properties. The search results are based on various criteria, and users can access detailed
          information about the elements they find
        </Space>
        <Text strong style={texttStyle}>
          Users can search for
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>Type: Shows all nodes of the selected type</li>
          <li>Node Name (Type Name): Displays the exact node matching the name</li>
          <li>Property Name (Type Name): Reveals all nodes with the specified property.</li>
          <li>
            Property Value (Type Name, Node Name): Shows the exact node with the property having the specified value
          </li>
          <li>Connection (Connection Name, Target-Source): Displays all nodes with the specified connection</li>
          <li>
            Connection Property (Connection Name, Property, Target- Source): Shows nodes with the specified connection
            and property
          </li>
        </ul>
        <Space style={texttStyle}>
          Users can choose to view all results (nodes, types, properties, etc.) by entering a search term and clicking
          the search button
        </Space>
        <Space style={texttStyle}>
          If the system finds a node in the results, the user can click on the node name. This action clears all nodes
          and shows only the selected result
        </Space>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.SearchInSchema}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub2-6': {
    title: 'Node Data Types',
    content: (
      <>
        <Space style={texttStyle}>
          In Araks, properties for node and connection types can be assigned various data types, each serving a specific
          purpose in data modeling. These data types allow users to define the nature of the data they are working with,
          ensuring accurate and meaningful representation of their knowledge graph.
        </Space>
        <Space style={texttStyle}>
          Here&#39;s a detailed table summarizing the data types, their user-set requirements, and a description for
          each:
        </Space>
        {/* <DataType style={{ margin: '20px' }} /> */}
      </>
    ),
  },
};

interface SchemaSectionProps {
  activeMenuItem: string;
}

export const SchemaSection: React.FC<SchemaSectionProps> = ({ activeMenuItem }) => {
  const section = sections[activeMenuItem];

  if (section) {
    return (
      <div style={{ fontSize: '16px' }}>
        <TitleStyle>{section.title}</TitleStyle>
        <div style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(100vh - 64px)' }}>{section.content}</div>
      </div>
    );
  }

  return null;
};
