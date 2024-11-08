import { useDocument } from 'components/layouts/components/document/wrapper';
import { useEffect, useState } from 'react';

type TDocumentSimulation<T> = {
  data: T[];
};

export const useDocumentSimulation = <T,>({ data = [] }: TDocumentSimulation<T>) => {
  const { similarDocument } = useDocument();
  const [simulationData, setSimulationData] = useState<T[]>([]);
  const [index, setIsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!similarDocument) {
      return;
    }
    if (!data.length) return;
    setIsLoading(true);
    const intervalId = setInterval(() => {
      if (index >= data?.length) {
        clearInterval(intervalId);
        setIsLoading(false);
        return;
      }
      setSimulationData((prev) => [...prev, data[index]]);
      setIsIndex((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(intervalId);
  }, [data, simulationData, similarDocument, index]);

  useEffect(() => {
    setSimulationData([]);
    setIsIndex(0);
    setIsLoading(false);
  }, [data, similarDocument]);

  const temp = similarDocument ? simulationData : data;

  return { temp, isLoading } as const;
};
