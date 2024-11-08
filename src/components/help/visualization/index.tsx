import React from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';
import { TitleStyle } from '../titlestyle';
import { ImageWrapper } from '../image-wrapper';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;
enum Paths {
  VisualizationAddNode = 'helps/visualization-add-node.svg',
  VisualizationAddNodes = 'helps/visualization-add-nodes.svg',
  VisualizationEdit = 'helps/visualization-edit.svg ',
  Filters = 'helps/filters.svg',
  Queries = 'helps/queries.svg',
  Styling = 'helps/styling.svg',
  Style = 'helps/style.svg',
  Focus = 'helps/focus.svg',
  Expand = 'helps/expand.svg',
}
interface MenuItem {
  title: string;
  content: JSX.Element;
  image?: JSX.Element;
}
const { Text } = Typography;

const texttStyle = {
  fontSize: '16px',
  paddingLeft: '6%',
  color: '#808080',
};

const menuItems: Record<string, MenuItem> = {
  'sub5-1': {
    title: 'Adding and Connecting New Nodes',
    content: (
      <Space direction="vertical">
        <Text style={texttStyle}>
          To add a new node, right-click on the canvas, select <b>“Create node”</b>
        </Text>
        <Text style={texttStyle}>
          This opens the<b>“Add New Node”</b> drawer
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>Choose the Type of the node. The system will then display the relevant properties for that type</li>
          <li>Fill in the properties and select other nodes to create connections</li>
          <li>
            Click <b>“Save”</b> to add the new node to the canvas, where it will be visually represented
          </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image rootClassName="help-image" src={`${helpUrl}${Paths.VisualizationAddNode}`} />
          </Col>
          <Col span={12}>
            <Image rootClassName="help-image" src={`${helpUrl}${Paths.VisualizationAddNodes}`} />
          </Col>
        </Row>
      </Space>
    ),
  },
  'sub5-2': {
    title: 'Node Viewing, Editing, and Deletion',
    content: (
      <>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click on any node name to open the <b>“Node View”</b> drawer
          </li>
          <li>For editing, click the Edit icon. You can modify the properties and adjust connections as needed.</li>
          <li>The Comment feature allows for adding contextual notes or additional information to a node</li>
          <li>
            To save changes, click <b>“Save”</b>
          </li>
          <li>
            To remove a node, click the <b>“Delete”</b> icon, and it will be permanently removed from the canvas
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.VisualizationEdit}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub5-3': {
    title: 'Efficient Use of Filters',
    content: (
      <>
        <ul style={{ color: '#808080' }}>
          <li>
            Filters are a crucial aspect of visualization in Araks. Click the checkbox next to a node type to display
            only nodes of that type on the canvas (refer to pic.26 for guidance)
          </li>
          <li>
            This feature is particularly useful for focusing on specific categories of data or simplifying complex
            graphs for better un- derstanding
          </li>
          <li>The “Reset” button returns the visualization to its origi- nal state, showing all node types</li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Filters}`} />
        </ImageWrapper>
      </>
    ),
  },
  'sub5-4': {
    title: 'Queries',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          Araks offers a user-friendly and intuitive querying interface, allowing users to easily navigate and extract
          specific data from their knowledge graphs. This section explains how to use the visual query tools for
          efficient data retrieval
        </Space>
        <Text strong style={texttStyle}>
          How to Start a Query:
        </Text>
        <ul style={{ color: '#808080' }}>
          <li>
            To begin, click the <b>“+Add”</b> button on the interface. This action initiates the query-building process
          </li>
          <li>
            Creating AND Queries
            <ul>
              <li>
                The <b>“AND”</b> query links multiple conditions in a sequence, focusing on specific node types and
                their properties
              </li>
              <li>
                To create an <b>“AND”</b> query, follow these steps:
                <ul>
                  <li>
                    Select a Type, then a Connection, followed by another Type. Alternatively, you can select a Type,
                    its property, a Connection, and another Type
                  </li>
                </ul>
              </li>
            </ul>
            <li>The results will primarily focus on the first Type or its property mentioned in the query sequence</li>
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Queries}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Creating OR Queries
        </Text>
        <Space style={texttStyle}>
          The “OR” query is more inclusive, bringing results that match any of the specified conditions
        </Space>
        <Text style={texttStyle}>To create an “OR” query:</Text>
        <ul style={{ color: '#808080' }}>
          <li>Choose a Type, a Connection, or any combination of options that suit your data needs</li>
          <li>The system will display all nodes and connections that match any of the specified criteria</li>
        </ul>
        <Text strong style={texttStyle}>
          Examples:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            AND Query Example: Imagine you want to find employees named John who work in large companies. Your query
            might be: <b>Employee (Name = John) --&#x276F; Employed_by --&#x276F; Company (Size &#x276F; 1000)</b>. This
            query will show employees named John who work in companies with more than 1000 employees
          </li>
          <li>
            OR Query Example: If you are looking for projects related to healthcare or started in 2020, your query could
            be: Project (Field = Healthcare) OR Project (Start Year = 2020). This will display all healthcare projects
            and projects that started in 2020.
          </li>
        </ul>
        <Text strong style={texttStyle}>
          Executing and Resetting Queries:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>After setting up your query, click the “Run” button to see the results</li>
          <li>If you need to adjust or start over, use the “Reset” button to clear the current query settings</li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Queries}`} />
        </ImageWrapper>
      </Space>
    ),
  },
  'sub5-5': {
    title: 'Styling',
    content: (
      <>
        <Space style={texttStyle}>
          The styling feature in Araks is designed to enhance the user&#39;s understanding of the graph by allowing
          customization of visual elements. Users can change the appearance of the graph based on node and connection
          properties and types, making it easier to distinguish and analyze different data points
        </Space>
        <Text strong style={texttStyle}>
          How to Apply Styling:
        </Text>
        <ul style={{ color: '#808080' }}>
          <li>To start styling, click the “+Add” button on the interface. This will open the styling options</li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Styling}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Customizing Styles:
        </Text>
        <ul style={{ color: '#808080', marginRight: '0' }}>
          <li>
            You can apply styles to Types, Type properties, or connections. For instance, you can choose to enlarge
            nodes where the Type is “Person”, or change the color of nodes where the Type is “Country” and the name
            contains “Armenia”
          </li>
          <li>
            This flexibility allows you to visually differentiate and highlight specific parts of the graph based on
            your criteria
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Styling}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Executing and Viewing Styles:
        </Text>
        <ul style={{ color: '#808080', marginRight: '0' }}>
          <li>
            After selecting your styling preferences, click the “Run” button. The system will then display the graph
            with the applied styles, allowing you to see the immediate impact of your changes.
          </li>
        </ul>
        <Text strong style={texttStyle}>
          Modifying or Removing Styles:
        </Text>
        <ul style={{ color: '#808080', marginRight: '0' }}>
          <li>
            If you wish to remove a specific style, click on the “Delete” icon (x) next to the style you want to remove
          </li>
          <li>To Clear all applied styles and start fresh, click the “Clean all” button</li>
          <li>Use the “Reset” button to return to the graph&#39;s original state before any styling was applied</li>
        </ul>
        <Space style={texttStyle}>
          Enhanced Visualization: By using the styling feature, users can create more insightful and visually appealing
          graphs. This tool is particularly useful for identifying patterns, relationships, and key data points in a
          complex dataset
        </Space>
      </>
    ),
  },
  'sub5-6': {
    title: 'Advanced Graph Analysis: Focus, Expand, and Shortest Path Features',
    content: (
      <Space direction="vertical">
        <Space style={texttStyle}>
          In the Araks, advanced graph algorithms are integral to providing dynamic and interactive data visualization
          capabilities. These algorithms enable users to focus on specific nodes, expand their connections, and
          calculate the shortest paths between nodes, thereby enhancing the analytical process
        </Space>
        <Text strong style={texttStyle}>
          Interactive Features Using Context Menu:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            Focus on a Node:
            <ul>
              <li>
                By right-clicking on a node and selecting “Functions” from the “Context menu”, users can access the
                “Focus on node” option.
              </li>
              <li>
                This feature temporarily hides all other nodes, spotlighting the selected node and its primary
                connections. It&#39;s particularly useful for in-depth examination of specific elements within the graph
              </li>
            </ul>
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Focus}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Expanding Node Connections:
        </Text>
        <Space style={texttStyle}>
          The “Expand” function reveals all direct connections of a selected node. This allows users to understand the
          immediate network and relationships linked to a particular node, providing a clearer view of its role within
          the larger graph
        </Space>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Expand}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Calculating the Shortest Path:
        </Text>
        <ul style={{ color: '#808080', margin: '0' }}>
          <li>
            The “Shortest path” tool is a practical application of graph algorithms. It identifies the most direct route
            between two nodes
          </li>
          <li>
            Upon selecting “Shortest path” from the context menu, users can set a source (the initially selected node)
            and choose a target node. Clicking the “Show path” button will then display the most efficient connection
            pathway between these nodes
          </li>
        </ul>
        <ImageWrapper>
          <Image rootClassName="help-image" src={`${helpUrl}${Paths.Expand}`} />
        </ImageWrapper>
        <Text strong style={texttStyle}>
          Benefits of Graph Algorithms in Visualization:
        </Text>
        <Space style={texttStyle}>
          These features, powered by graph algorithms, are not only essential for in-depth data analysis but also for
          enhancing user interaction with the graph. They simplify complex data structures and relationships, making it
          easier for users to navigate and understand their data in a more meaningful way.
        </Space>
      </Space>
    ),
  },
};

interface VisualizationSectionProps {
  activeMenuItem: string;
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ activeMenuItem }) => {
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
