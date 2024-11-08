import { Badge, Typography, Flex } from 'antd';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { StyledAvatar } from './styles';
import { Icon } from '../../icon';

const { Paragraph } = Typography;

export const renderProjects = (id: string, title: string, color: string, icon: string, privacy: string) => {
  return {
    key: `project${id}`,
    id,
    mode: 'projectType',
    value: id,
    privacy,
    title,
    label: (
      <Flex align="center" gap={20}>
        <Badge>
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
        </Badge>
        <Paragraph strong ellipsis={{ rows: 1 }} style={{ fontSize: '16px', marginBottom: 0 }}>
          {title}
        </Paragraph>
      </Flex>
    ),
  };
};
