import { Col, Flex } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText } from 'components/typography';
import dayjs from 'dayjs';
import { COLORS } from 'helpers/constants';

type OwnerInfoProps = {
  title: string;
  value: string;
};

const OwnerInfo = ({ title, value }: OwnerInfoProps) => (
  <Flex justify="space-between" wrap='wrap'>
    <Col>
      <SecondaryText color={COLORS.PRIMARY.BLUE}>{title}</SecondaryText>
    </Col>
    <Col>
      <SecondaryText style={{ fontWeight: '400' }}>{value}</SecondaryText>
    </Col>
  </Flex>
);

type Props = {
  createdAt?: string;
  updatedAt?: string;
  userFullName: string;
};

export const ProjectUserInfo = ({ createdAt, updatedAt, userFullName }: Props) => {
  return (
    <VerticalSpace size={14}>
      <OwnerInfo title="Owner" value={userFullName} />
      <OwnerInfo title="Created" value={createdAt ? dayjs(createdAt).format('DD-MM-YYYY') : ''} />
      <OwnerInfo title="Last modified" value={updatedAt ? dayjs(updatedAt).format('DD-MM-YYYY HH:mm') : ''} />
    </VerticalSpace>
  );
};
