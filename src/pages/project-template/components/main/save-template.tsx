import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from 'components/form/form-item';
import { Input, TextArea } from 'components/input';
import { Divider } from 'antd';
import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { ProjectType } from 'pages/project-overview/components/project-type';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: fixed;
  right: 0;
  width: 600px;
  height: 100%;
  padding: 24px;
  border: 1px solid ${COLORS.PRIMARY.WHITE};
  z-index: 1;

  background: #f2f2f2;

  box-shadow: -10px 10px 10px 0 rgba(111, 111, 111, 0.1) inset;

  .ant-radio-group {
    flex-direction: row !important;

    label {
      width: 100%;
    }
  }
`;

export const SaveTemplate = () => {
  return (
    <Wrapper>
      <VerticalSpace>
        <FormItem
          rules={[
            { required: true, message: 'Title is required' },
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 30, message: 'The maximum length for this field is 30 characters' },
          ]}
          name="name"
          label="Title"
        >
          <Input />
        </FormItem>
        <FormItem
          rules={[
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 250, message: 'The maximum length for this field is 250 characters' },
          ]}
          name="description"
          label="Description"
        >
          <TextArea rows={4} />
        </FormItem>
      </VerticalSpace>
      <Divider style={{ margin: '10px' }} />
      <Text>Privacy</Text>
      <ProjectType />
    </Wrapper>
  );
};
