import { Flex, Typography } from 'antd';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { Icon } from '../../icon';
import { TypeItem, StyledAvatar } from './styles';

const { Paragraph } = Typography;

export const renderTypes = (
  id: string,
  node_type_id: string,
  title: string,
  color: string,
  name: string,
  privacy: string,
  icon: string,
  project_id: string
) => {
  const flexStyle = { gap: '10px', alignItems: 'center' };
  return {
    key: `node-type${id}${node_type_id}`,
    id,
    mode: 'nodeType',
    value: id,
    title: name,
    privacy,
    project_id,
    label: (
      <TypeItem>
        <Flex style={{ width: '70%', ...flexStyle }}>
          <StyledAvatar
            color={color}
            shape="circle"
            size="small"
            icon={
              (
                <Icon
                  color="#414141"
                  icon={icon}
                  size={14}
                  style={{ display: 'flex', height: '100%', margin: '0 auto' }}
                />
              ) || <Araks />
            }
          />
          <Paragraph strong ellipsis={{ rows: 1 }} style={{ fontSize: '14px', marginBottom: 0 }}>
            {name}
          </Paragraph>
        </Flex>
        <Flex style={{ width: '30%', justifyContent: 'flex-end', ...flexStyle }}>
          <Flex style={{ width: '24px' }}>
            <StyledAvatar
              color={color}
              shape="square"
              size="small"
              icon={
                (
                  <Icon
                    color="#414141"
                    icon={icon}
                    size={14}
                    style={{ display: 'flex', height: '100%', margin: '0 auto' }}
                  />
                ) || <Araks />
              }
            />
          </Flex>
          <Paragraph strong ellipsis={{ rows: 1 }} style={{ fontSize: '16px', marginBottom: 0 }}>
            {title}
          </Paragraph>
        </Flex>
      </TypeItem>
    ),
  };
};
