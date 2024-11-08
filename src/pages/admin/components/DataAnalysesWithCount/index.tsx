import { useGetAdminAnalysesDashboard } from 'api/admin/use-get-analyses-dashboard';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { Card, Select, Space } from 'antd';
import { Column, ColumnConfig } from '@ant-design/plots';
import { useState } from 'react';
import { getYearsArrFrom } from 'helpers/utils';
import { CustomAnimateButton, CustomSelect } from '../Styled';
interface TextProps {
  active: boolean;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 800px;
  color: '#F6976D';
  background-color: ${COLORS.PRIMARY.WHITE};
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;
const CustomText = styled.text<TextProps>`
  font-family: 'Rajdhani';
  font-weight: 700;
  font-size: 24px;
  color: ${({ active }) => (active ? '#E0E0E0' : '#80808099')};
`;

export const AdminDataAnalyseCount = () => {
  const yearArray = getYearsArrFrom({ from: 2023, to: undefined });
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<'projects' | 'nodes' | 'edges' | 'files'>('projects');
  const [activeColor, setActiveColor] = useState<string>('#232F6A80');
  const { data, isSuccess } = useGetAdminAnalysesDashboard({ type: selectedType, year: selectedYear });

  const chartData = isSuccess
    ? data.data.length > 0
      ? data.data.map((item) => ({
          month: `${item.year},${item.month}`,
          count: +item.count,
        }))
      : [{ month: '', count: 0 }]
    : [{ month: '', count: 0 }];
  const config: ColumnConfig = {
    data: chartData,
    xField: 'month',
    yField: 'count',
    height: 500,
    colorField: activeColor,
    columnWidthRatio: 0.1,
    color: '#F5B452DE',
    xAxis: {
      label: {
        formatter: (text: string) => text,
        autoRotate: false,
      },
      title: {
        text: 'Month of the Year',
        style: {
          fontSize: 14,
          fill: '#333',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Count of Users',
        style: {
          fontSize: 14,
          fill: '#333',
        },
      },
    },
  };

  const handleYearChange = (year: number) => {
    if (year === 0) {
      setSelectedYear(undefined);
    } else setSelectedYear(year);
  };
  const handleChangeType = (type: 'projects' | 'nodes' | 'edges' | 'files') => {
    switch (type) {
      case 'projects':
        setSelectedType('projects');
        setActiveColor('#232F6A80');
        break;
      case 'nodes':
        setSelectedType('nodes');
        setActiveColor('#F5B452DE');
        break;
      case 'edges':
        setSelectedType('edges');
        setActiveColor('#68C4D0D6');
        break;
      case 'files':
        setSelectedType('files');
        setActiveColor('#469DDCB0');
        break;
    }
  };

  return (
    <Container>
      <Card
        style={{ maxWidth: '90%', minWidth: '80%' }}
        title=""
        extra={
          <CustomSelect onChange={(e)=>handleYearChange(e as number)} defaultValue={0} >
            <Select.Option value={0}>All Years</Select.Option>
            {yearArray.map((item, index) => {
              return (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </CustomSelect>
        }
      >
        <Space
          style={{
            width: '100%',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          <CustomAnimateButton
            onClick={() => handleChangeType('projects')}
            active={selectedType === 'projects'}
            backgroundColor={activeColor}
          >
            <CustomText active={selectedType === 'projects'}>Projects</CustomText>
          </CustomAnimateButton>

          <CustomAnimateButton
            onClick={() => handleChangeType('nodes')}
            active={selectedType === 'nodes'}
            backgroundColor={activeColor}
          >
            <CustomText active={selectedType === 'nodes'}>Nodes</CustomText>
          </CustomAnimateButton>

          <CustomAnimateButton
            onClick={() => handleChangeType('edges')}
            active={selectedType === 'edges'}
            backgroundColor={activeColor}
          >
            <CustomText active={selectedType === 'edges'}>Connections</CustomText>
          </CustomAnimateButton>

          <CustomAnimateButton
            onClick={() => handleChangeType('files')}
            active={selectedType === 'files'}
            backgroundColor={activeColor}
          >
            <CustomText active={selectedType === 'files'}>Uploaded Files</CustomText>
          </CustomAnimateButton>
        </Space>
        <Column {...config} />
      </Card>
    </Container>
  );
};
